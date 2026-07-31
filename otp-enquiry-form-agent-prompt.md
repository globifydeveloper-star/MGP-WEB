# Build Prompt: OTP Enquiry Form (Shared Sidebar Widget) — MGP-WEB

## Context
Next.js 16 (App Router) + TypeScript, vanilla CSS. Strapi backend (`mgp-strapi`, running at `http://localhost:1337`) now has a working, tested OTP module:

- `POST /api/otp/send` — body `{ phone: string }` — `{ success: true, message: 'OTP sent' }` on success, or an error object with a `message` field on failure
- `POST /api/otp/verify` — body `{ phone: string, otp: string }` — `{ success: true, verified: true }` on success, or an error object with a `message` field on failure

This form is a **lightweight sidebar widget**, not the full Sell Gold hero form. Per the S01 spec: "OTP Enquiry form — fixed default sidebar widget on every post, same as elsewhere on the site; not client-configurable."

Verified against the current codebase before building:
- Backend routes, response shapes, `PHONE_REGEX` (10-digit), 60s resend cooldown, and error messages all match this spec exactly (`mgp-strapi/src/api/otp-request/controllers/otp-request.ts`).
- `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337` is already set in `.env.local`.
- No sticky-sidebar CSS pattern (`position: sticky`) exists anywhere in `src/` yet — Step 5 below is writing this from scratch, not matching an existing pattern.
- The blog post page (`src/app/blog/[slug]/page.tsx`) is currently single-column with no sidebar at all — Step 7 below adds that layout as part of this task, since without it the component would have nowhere to render.

## Step 0 — Check before building
Do NOT touch or refactor `SellGoldHero.tsx`, `SellGoldModal.tsx`, or `appoinment.tsx` — those still use simulated OTP logic and are out of scope for this task (separate follow-up work once each is individually wired to the real backend).

## Step 1 — Component location
Create under `src/components/common/` (shared across pages, not blog-specific):
```
src/components/common/OTPEnquiryForm/
  OTPEnquiryForm.tsx
  OTPEnquiryForm.css
```

## Step 2 — Fields (kept minimal per sidebar widget scope)
- Name (text, required)
- Phone (tel, required, 10-digit validation matching backend's `PHONE_REGEX`)
- Get OTP button (disabled during cooldown, matching backend's 60s rate limit)
- OTP input (disabled until OTP is sent, required)
- Submit button

No email, state, city, or consent checkbox — those belong to the full Sell Gold form, not this lightweight widget.

## Step 3 — State & flow

```typescript
'use client';

import { useState, useEffect } from 'react';
import './OTPEnquiryForm.css';

export default function OTPEnquiryForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // countdown timer, same pattern as SellGoldHero
  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setTimeout(() => setOtpCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  const handleGetOtp = async () => {
    setErrorMessage(null);
    if (!/^\d{10}$/.test(phone)) {
      setErrorMessage('Please enter a valid 10-digit phone number');
      return;
    }
    setIsSendingOtp(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.message || data.error?.message || 'Failed to send OTP. Please try again.');
        return;
      }
      setOtpSent(true);
      setOtpCountdown(60); // matches backend's resend cooldown
    } catch {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!name || !phone || !otp) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    setIsVerifying(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (!res.ok || !data.verified) {
        setErrorMessage(data.message || data.error?.message || 'Incorrect or expired OTP.');
        return;
      }
      // OTP verified — this is where a future enquiry-lead content type write would go
      // (out of scope for this task; just show success state for now)
      setIsSubmitted(true);
    } catch {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  // ...render below
}
```

## Step 4 — Render logic
- If `isSubmitted`: show a compact success state ("Thank you, we'll be in touch shortly") — reuse the visual language of `SellGoldHero`'s success checkmark for consistency (`sg-success-checkmark-circle` / `sg-success-checkmark` in `SellGoldHero.css`), but sized for a sidebar
- Else: render the form with Name, Phone + Get OTP button (shows countdown when active, disabled state), OTP input (disabled until `otpSent`), error message area (if `errorMessage` is set), Submit button (disabled while `isVerifying`)

## Step 5 — Styling
- Vanilla CSS, no Tailwind
- Fonts: Gilroy primary, Outfit fallback (use existing global font tokens)
- Gold `#E29D24` for primary button/active states, dark navy `#10182B` for text
- Sized for a sidebar column — narrower/more compact than the full-width Sell Gold hero form, no state/city dropdowns to worry about
- Sticky positioning on desktop (stays visible while scrolling the blog post body). Confirmed: no `position: sticky` pattern exists anywhere else in the codebase, so write this from scratch — `position: sticky; top: <navbar height + gap>;` on the sidebar wrapper (not the form itself), with a media query to drop sticky behavior below desktop breakpoint (match the breakpoint used elsewhere in `blog-post-page.css`)

## Step 6 — Error handling requirements
- Never show raw error objects to the user — always the human-readable `message` field
- Rate limit (429) response should show something like "Please wait a moment before requesting another OTP" — not a generic error
- Expired OTP (400) should show "This OTP has expired, please request a new one" and ideally reset `otpSent` to false so they can request again

## Step 7 — Wire it into the blog post page
`src/app/blog/[slug]/page.tsx` is currently single-column (`<article className="blog-post-container">` with no sidebar). To make the widget actually render somewhere:
- Restructure the page's main content area into a two-column layout: the existing `<article>` (post body) plus a new `<aside className="blog-post-sidebar">` containing `<OTPEnquiryForm />`, both inside a wrapping grid/flex container
- Import `OTPEnquiryForm` from `@/components/common/OTPEnquiryForm/OTPEnquiryForm`
- Add the new layout rules to `blog-post-page.css` (existing file — extending it is in scope; do not touch `globals.css`)
- Collapse to a single column (sidebar below or hidden per design call) below the desktop breakpoint, consistent with Step 5's sticky media query
- Keep this to layout wiring only — do not change the blog post data fetching, `generateMetadata`, or any other page logic

## Do NOT
- Do not fabricate copy — use plain, functional labels ("Name*", "Mobile Number*", "GET OTP", "OTP*", "SUBMIT") consistent with the existing `SellGoldHero` form's tone
- Do not touch `globals.css`, `layout.tsx`, `Navbar.tsx`, `Footer.tsx`
- Do not add new npm packages

## Acceptance checklist
- [ ] Name + Phone fields render, phone validates 10-digit format client-side before calling the API
- [ ] "GET OTP" calls `/api/otp/send`, shows countdown on success, shows real error message on failure (e.g. rate limit)
- [ ] OTP field is disabled until OTP is successfully sent
- [ ] Submit calls `/api/otp/verify`, shows success state on match
- [ ] Wrong OTP shows an inline error, does not silently fail
- [ ] Expired OTP shows a clear message and allows requesting a new one
- [ ] Fully responsive, sticky on desktop sidebar
- [ ] Widget is actually mounted and visible in the sidebar on a real blog post page (`/blog/[slug]`), not just built in isolation
- [ ] No console errors on send/verify round-trip tested against the real running Strapi backend
