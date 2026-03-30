import { NextResponse } from "next/server";

// TEMPORARY diagnostic endpoint — remove after debugging
export async function GET() {
  const keyId = (process.env.RAZORPAY_KEY_ID || "").trim();
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
  const pubKey = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "").trim();
  
  const rawKeyId = process.env.RAZORPAY_KEY_ID || "";
  
  // Test the Razorpay API directly with fetch (bypass SDK) using TRIMMED values
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  
  let apiResult: { status?: number; body?: unknown; error?: string } = {};
  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 100,
        currency: "INR",
        receipt: "diag_test",
      }),
    });
    apiResult = {
      status: res.status,
      body: await res.json(),
    };
  } catch (e) {
    apiResult = { error: e instanceof Error ? e.message : String(e) };
  }

  return NextResponse.json({
    rawKeyId: {
      length: rawKeyId.length,
      firstCharCode: rawKeyId.charCodeAt(0),
      hasTab: rawKeyId.charCodeAt(0) === 9,
    },
    keyId: {
      value: keyId ? `${keyId.substring(0, 8)}...${keyId.substring(keyId.length - 4)}` : "EMPTY",
      length: keyId.length,
      firstCharCode: keyId.charCodeAt(0),
      lastCharCode: keyId.charCodeAt(keyId.length - 1),
      hasQuotes: keyId.includes('"'),
      hasNewline: keyId.includes('\n') || keyId.includes('\r'),
      hex: Buffer.from(keyId).toString("hex"),
    },
    keySecret: {
      length: keySecret.length,
      firstCharCode: keySecret.charCodeAt(0),
      lastCharCode: keySecret.charCodeAt(keySecret.length - 1),
      hasQuotes: keySecret.includes('"'),
      hasNewline: keySecret.includes('\n') || keySecret.includes('\r'),
      hex: Buffer.from(keySecret).toString("hex"),
    },
    pubKey: {
      value: pubKey ? `${pubKey.substring(0, 8)}...` : "EMPTY",
      length: pubKey.length,
    },
    apiResult,
  });
}
