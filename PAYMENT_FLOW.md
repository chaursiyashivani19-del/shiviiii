# ÉLÉVÉ ATELIER — PAYMENT FLOW (RAZORPAY ARCHITECTURE)

## Payment Architecture Overview

Our checkout flow follows strict server-side validation and payment verification standards for the Indian market using Razorpay.

```
[ Customer ]                [ Frontend Client ]              [ Payment Provider ]           [ Database ]
     │                              │                                 │                          │
     ├── 1. Click Place Order ─────►│                                 │                          │
     │                              ├── 2. Reserve Stock (Atomic) ──────────────────────────────►│
     │                              │                                 │                          │
     │                              ├── 3. Initialize Gateway ───────►│                          │
     │                              │   (Demo or Razorpay SDK)        │                          │
     │                              │                                 │                          │
     │◄── 4. Render Payment UI ─────┤                                 │                          │
     │    (Card / UPI / NetBanking) │                                 │                          │
     │                              │                                 │                          │
     ├── 5. Complete Authorization ─┴────────────────────────────────►│                          │
     │                                                                │                          │
     │                              ┌── 6. Verify HMAC Signature ─────┤                          │
     │                              │   (Server-Side SHA-256)         │                          │
     │                              ▼                                 │                          │
     │                              ├── 7. Commit Stock Deduction ──────────────────────────────►│
     │                              ├── 8. Create Order Snapshot ───────────────────────────────►│
     │◄── 9. Render Confetti & Receipt                                                           │
```

---

## Razorpay Server-Side Signature Verification

```typescript
import crypto from 'crypto';

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
}
```

The application ships with a `DemoPaymentProvider` that accurately mimics this authorization lifecycle without requiring active credit card charges during evaluation.
