// Welcome Brief (Email 1) — sent immediately on /api/partner/signup success.
// Editorial tone, plain-text-feel HTML matching the email doc.

interface WelcomeArgs {
  firstName: string;
  arn: string;
}

const KIRAN_ARN = 'ARN-306593';

export function buildDistributorWelcomeEmail({ firstName }: WelcomeArgs): { subject: string; html: string; text: string } {
  const subject = `Welcome to SIFPrime, ${firstName} — your toolkit is below`;

  const text = `Hi ${firstName},

Welcome to the SIFPrime Partner Programme.

You're now part of a growing community of MFDs and RIAs preparing for what may be the most significant mutual fund category innovation in twenty years. SIFs are early — only fourteen funds are live as of April 2026 — but the questions from your HNI clients are about to start, and we want you walking into those conversations as the expert in the room.

Two documents are on the way:

1. The SIF Empanelment Guide — if you haven't yet completed NISM Series XIII or empanelled with SIF AMCs, this is the fastest path. It covers the certification, the AMFI add-on, and the AMC-by-AMC empanelment process with screenshots.
   https://sifprime.com/toolkit/empanelment

2. The SIF Selection Framework — our proprietary 8-pointer evaluation. This is the exact framework we use internally to rank SIFs. Use it on the current universe, and you'll have a defensible recommendation for any client conversation.
   https://sifprime.com/toolkit/selection-framework

Over the next two weeks I'll send you four more emails covering the HNI pitch deck, a real crash-period case study, a common distributor question, and an invite to our first Monthly Masterclass. Reply any time — I read every message personally.

The full toolkit lives at https://sifprime.com/partner

Welcome aboard.

Kiran Dutta
Founder, SIFPrime
${KIRAN_ARN}

P.S. If you have an HNI client asking about SIFs right now and need help framing the conversation, just reply to this email. I'll get back to you within the day.`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#FAF7F0;font-family:'Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0F1419;line-height:1.6;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">

    <!-- Masthead -->
    <div style="border-bottom:1px solid #E5E0D5;padding-bottom:16px;margin-bottom:32px;">
      <div style="font-family:Georgia,'Fraunces',serif;font-size:24px;letter-spacing:-0.5px;color:#0F1419;">SIFPrime <span style="font-size:10px;letter-spacing:3px;color:#5C5C58;text-transform:uppercase;vertical-align:middle;">Partner</span></div>
    </div>

    <p style="margin:0 0 20px;color:#0F1419;font-size:16px;">Hi ${firstName},</p>

    <p style="margin:0 0 20px;color:#3A3A36;font-size:15px;">Welcome to the SIFPrime Partner Programme.</p>

    <p style="margin:0 0 20px;color:#3A3A36;font-size:15px;">You're now part of a growing community of MFDs and RIAs preparing for what may be the most significant mutual fund category innovation in twenty years. SIFs are early — only fourteen funds are live as of April 2026 — but the questions from your HNI clients are about to start, and we want you walking into those conversations as the expert in the room.</p>

    <p style="margin:0 0 12px;color:#3A3A36;font-size:15px;">Two documents to start with:</p>

    <!-- Module 1 -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px;">
      <tr>
        <td style="background:#FAF7F0;border:1px solid #E5E0D5;padding:18px 20px;">
          <div style="font-family:Georgia,'Fraunces',serif;font-size:17px;color:#0F1419;margin-bottom:6px;">1. The SIF Empanelment Guide</div>
          <div style="font-size:14px;color:#3A3A36;margin-bottom:12px;">If you haven't yet completed NISM Series XIII or empanelled with SIF AMCs, this is the fastest path. It covers the certification, the AMFI add-on, and the AMC-by-AMC empanelment process with screenshots.</div>
          <a href="https://sifprime.com/toolkit/empanelment" style="display:inline-block;color:#7B2D26;text-decoration:none;font-size:13px;border-bottom:1px solid #7B2D26;padding-bottom:1px;">Open the guide →</a>
        </td>
      </tr>
    </table>

    <!-- Module 2 -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="background:#FAF7F0;border:1px solid #E5E0D5;padding:18px 20px;">
          <div style="font-family:Georgia,'Fraunces',serif;font-size:17px;color:#0F1419;margin-bottom:6px;">2. The SIF Selection Framework</div>
          <div style="font-size:14px;color:#3A3A36;margin-bottom:12px;">Our proprietary 8-pointer evaluation. The exact framework we use internally to rank SIFs. Use it on the current universe, and you'll have a defensible recommendation for any client conversation.</div>
          <a href="https://sifprime.com/toolkit/selection-framework" style="display:inline-block;color:#7B2D26;text-decoration:none;font-size:13px;border-bottom:1px solid #7B2D26;padding-bottom:1px;">Open the framework →</a>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 20px;color:#3A3A36;font-size:15px;">Over the next two weeks I'll send you four more emails covering the HNI pitch deck, a real crash-period case study, a common distributor question, and an invite to our first Monthly Masterclass. Reply any time — I read every message personally.</p>

    <p style="margin:0 0 28px;color:#3A3A36;font-size:15px;">The full toolkit lives at <a href="https://sifprime.com/partner" style="color:#7B2D26;">sifprime.com/partner</a>.</p>

    <p style="margin:0 0 8px;color:#0F1419;font-size:15px;">Welcome aboard.</p>

    <!-- Signature -->
    <div style="border-top:1px solid #E5E0D5;padding-top:20px;margin-top:32px;">
      <div style="font-family:Georgia,'Fraunces',serif;font-size:16px;color:#0F1419;">Kiran Dutta</div>
      <div style="font-size:13px;color:#5C5C58;margin-top:2px;">Founder, SIFPrime · ${KIRAN_ARN}</div>
    </div>

    <!-- P.S. -->
    <div style="margin-top:24px;padding:16px 18px;background:#F1ECDF;border-left:3px solid #7B2D26;font-size:14px;color:#3A3A36;line-height:1.55;">
      <strong style="color:#0F1419;">P.S.</strong> If you have an HNI client asking about SIFs <em>right now</em> and need help framing the conversation, just reply to this email. I'll get back to you within the day.
    </div>

    <!-- Footer -->
    <div style="margin-top:40px;padding-top:20px;border-top:1px solid #E5E0D5;font-size:11px;color:#5C5C58;line-height:1.6;">
      SIFPrime is an AMFI-registered Mutual Fund Distributor. We do not provide investment advice. Investments in SIFs are subject to market risk. Past performance is not indicative of future returns.<br><br>
      You're receiving this because you signed up for the SIFPrime Partner Toolkit at <a href="https://sifprime.com/partner" style="color:#5C5C58;">sifprime.com/partner</a>.
    </div>

  </div>
</body>
</html>`;

  return { subject, html, text };
}

// Priority Partner email — for ₹100 Cr+ AUM signups (replaces Welcome Brief).
export function buildPriorityPartnerEmail({ firstName }: WelcomeArgs): { subject: string; html: string; text: string } {
  const subject = `${firstName} — let's talk SIFs`;
  const whatsappUrl = 'https://wa.me/919032999466?text=' + encodeURIComponent(`Hi Kiran, I'm interested in the SIFPrime Priority Partner programme. My name is ${firstName}.`);

  const text = `Hi ${firstName},

I noticed your signup just came in with a ₹100 Cr+ AUM band — which puts you firmly in the segment where SIFs make the biggest portfolio impact.

I'd like to skip the standard onboarding sequence and offer you a 30-minute call instead. We can cover:

- The current SIF universe and which managers I'd actually recommend
- How distributors at your AUM scale are structuring SIF allocations across their HNI book
- The advanced platform features — co-branded reports, lead routing — that we typically reserve for active partners

WhatsApp me directly: ${whatsappUrl}

Or just reply to this email with two or three questions and I'll send you a detailed answer with the relevant toolkit modules.

Welcome aboard.

Kiran Dutta
Founder, SIFPrime
${KIRAN_ARN}
+91 90329 99466`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#FAF7F0;font-family:'Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0F1419;line-height:1.6;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="border-bottom:1px solid #E5E0D5;padding-bottom:16px;margin-bottom:32px;">
      <div style="font-family:Georgia,'Fraunces',serif;font-size:24px;color:#0F1419;">SIFPrime <span style="font-size:10px;letter-spacing:3px;color:#5C5C58;text-transform:uppercase;vertical-align:middle;">Priority Partner</span></div>
    </div>
    <p style="margin:0 0 20px;font-size:16px;">Hi ${firstName},</p>
    <p style="margin:0 0 20px;color:#3A3A36;font-size:15px;">I noticed your signup just came in with a <strong>₹100 Cr+ AUM band</strong> — which puts you firmly in the segment where SIFs make the biggest portfolio impact.</p>
    <p style="margin:0 0 20px;color:#3A3A36;font-size:15px;">I'd like to skip the standard onboarding sequence and offer you a <strong>30-minute call</strong> instead. We can cover:</p>
    <ul style="margin:0 0 24px;padding-left:20px;color:#3A3A36;font-size:15px;">
      <li style="margin-bottom:8px;">The current SIF universe and which managers I'd actually recommend</li>
      <li style="margin-bottom:8px;">How distributors at your AUM scale are structuring SIF allocations across their HNI book</li>
      <li style="margin-bottom:0;">The advanced platform features — co-branded reports, lead routing — that we typically reserve for active partners</li>
    </ul>
    <a href="${whatsappUrl}" style="display:inline-block;background:#0F1419;color:#FAF7F0;padding:14px 28px;text-decoration:none;font-size:14px;font-weight:500;margin-bottom:24px;">WhatsApp me directly →</a>
    <p style="margin:0 0 28px;color:#3A3A36;font-size:15px;">If a call doesn't work, just reply with two or three questions and I'll send you a detailed answer with the relevant toolkit modules.</p>
    <p style="margin:0 0 8px;font-size:15px;">Welcome aboard.</p>
    <div style="border-top:1px solid #E5E0D5;padding-top:20px;margin-top:24px;">
      <div style="font-family:Georgia,'Fraunces',serif;font-size:16px;">Kiran Dutta</div>
      <div style="font-size:13px;color:#5C5C58;margin-top:2px;">Founder, SIFPrime · ${KIRAN_ARN}</div>
      <div style="font-size:13px;color:#5C5C58;">+91 90329 99466</div>
    </div>
  </div>
</body>
</html>`;

  return { subject, html, text };
}
