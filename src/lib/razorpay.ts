import Razorpay from "razorpay";

let razorpayInstance: Razorpay | null = null;

function getKey(name: string): string {
  return (process.env[name] || "").trim();
}

export function getRazorpay(): Razorpay {
  if (!razorpayInstance) {
    const keyId = getKey("RAZORPAY_KEY_ID");
    const keySecret = getKey("RAZORPAY_KEY_SECRET");
    if (!keyId || !keySecret) {
      throw new Error("Razorpay credentials not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env");
    }
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }
  return razorpayInstance;
}

export function isRazorpayConfigured(): boolean {
  return !!(getKey("RAZORPAY_KEY_ID") && getKey("RAZORPAY_KEY_SECRET"));
}
