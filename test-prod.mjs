// Test payment flow against production
import { chromium } from 'playwright';

const BASE = 'https://rebuild-learning.vercel.app';
const EMAIL = 'pranathi@demo.com';
const PASS = 'Student@123';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
  });
  
  // Capture network failures
  page.on('requestfailed', req => {
    console.log(`[NETWORK FAIL] ${req.method()} ${req.url()} - ${req.failure().errorText}`);
  });

  try {
    // 1. Login
    console.log('--- STEP 1: Login on production ---');
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Login page URL:', page.url());
    
    // Check if redirected somewhere
    if (!page.url().includes('/login')) {
      console.log('Redirected to:', page.url());
      // Navigate to login
      await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
    }
    
    await page.fill('input[type="email"]', EMAIL);
    await page.fill('input[type="password"]', PASS);
    
    // Intercept auth response
    const [authRes] = await Promise.all([
      page.waitForResponse(r => r.url().includes('/api/auth'), { timeout: 15000 }),
      page.click('button[type="submit"]')
    ]);
    console.log('Auth status:', authRes.status());
    
    await page.waitForURL('**/dashboard**', { timeout: 15000 }).catch(() => {
      console.log('Did not redirect to dashboard. Current URL:', page.url());
    });
    console.log('After login URL:', page.url());

    // 2. Find an unpurchased assessment
    console.log('\n--- STEP 2: Find unpurchased module ---');
    const modules = ['medicine-healthcare', 'science-research', 'commerce-finance', 'law-judiciary', 'civil-services'];
    
    let paymentUrl = null;
    for (const mod of modules) {
      await page.goto(`${BASE}/assessments/${mod}`, { waitUntil: 'networkidle' });
      const unlockLink = await page.$('a[href*="/payment/"]');
      if (unlockLink) {
        paymentUrl = await unlockLink.getAttribute('href');
        console.log(`Found unpurchased: ${mod}`);
        console.log(`Payment URL: ${paymentUrl}`);
        break;
      }
      console.log(`${mod}: already purchased/accessible`);
    }

    if (!paymentUrl) {
      console.log('All assessments accessible. Trying subscribe...');
      await page.goto(`${BASE}/subscribe`, { waitUntil: 'networkidle' });
    } else {
      await page.goto(`${BASE}${paymentUrl}`, { waitUntil: 'networkidle' });
    }

    console.log('\n--- STEP 3: Payment Page ---');
    console.log('URL:', page.url());
    
    const payBtn = await page.$('button:has-text("Pay")');
    if (!payBtn) {
      console.log('No pay button found!');
      const text = await page.textContent('body');
      console.log('Body text:', text.substring(0, 500));
      await browser.close();
      return;
    }
    
    const btnText = await payBtn.textContent();
    console.log('Found button:', btnText.trim());

    // 4. Click pay and capture the API response
    console.log('\n--- STEP 4: Click Pay ---');
    const [apiResponse] = await Promise.all([
      page.waitForResponse(r => r.url().includes('/api/payments/create'), { timeout: 30000 }),
      payBtn.click()
    ]);

    const status = apiResponse.status();
    const headers = apiResponse.headers();
    let body;
    try {
      body = await apiResponse.json();
    } catch {
      body = await apiResponse.text();
    }
    
    console.log('API Status:', status);
    console.log('API Response:', JSON.stringify(body, null, 2));
    console.log('Response headers:', JSON.stringify({
      'content-type': headers['content-type'],
      'x-vercel-cache': headers['x-vercel-cache'],
      'x-vercel-id': headers['x-vercel-id'],
    }));

    if (body.mode === 'razorpay') {
      console.log('\n*** SUCCESS: Razorpay is working!');
    } else if (body.error) {
      console.log('\n*** FAILED:', body.error);
    }

    // Wait and check for Razorpay popup
    await page.waitForTimeout(5000);
    const frames = page.frames();
    const razorFrames = frames.filter(f => f.url().includes('razorpay'));
    console.log('Razorpay frames:', razorFrames.length);

  } catch (err) {
    console.error('Test error:', err.message);
    console.log('URL at failure:', page.url());
  } finally {
    if (consoleLogs.length > 0) {
      console.log('\n--- Browser Console ---');
      consoleLogs.filter(l => !l.includes('DevTools') && !l.includes('HMR')).forEach(l => console.log(l));
    }
    await browser.close();
  }
}

main();
