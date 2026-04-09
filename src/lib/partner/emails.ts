import type { Partner, PartnerLead } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://sifprime.com';

export function buildWelcomeEmail(partner: Partner): { subject: string; html: string } {
  const subject = 'Welcome to SIFPrime Partner Platform 🎉';

  const empanelmentSection = partner.distributor_status === 'need_help'
    ? `<div style="background:#FEF3C7;border-left:4px solid #F59E0B;padding:16px;border-radius:8px;margin:24px 0">
        <h3 style="margin:0 0 8px;color:#92400E;font-size:16px">SIF EMPANELMENT HELP</h3>
        <p style="margin:0;color:#78350F;font-size:14px">You indicated you need help getting SIF-empanelled. Our team will reach out within 24 hours with the step-by-step process.</p>
      </div>`
    : '';

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0A1628;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:40px 20px">
  <div style="background:#fff;border-radius:16px;padding:40px;box-shadow:0 4px 24px rgba(0,0,0,0.3)">
    <div style="text-align:center;margin-bottom:32px">
      <h1 style="color:#0A1628;font-size:24px;margin:0">Welcome to SIFPrime 🎉</h1>
      <p style="color:#64748B;margin:8px 0 0">Your partner account is ready</p>
    </div>

    <p style="color:#334155;font-size:15px;line-height:1.6">Hi ${partner.full_name},</p>
    <p style="color:#334155;font-size:15px;line-height:1.6">Your SIFPrime partner account is set up and ready to use.</p>

    <div style="background:#F1F5F9;border-radius:12px;padding:20px;margin:24px 0">
      <h3 style="margin:0 0 12px;color:#0A1628;font-size:14px;text-transform:uppercase;letter-spacing:1px">YOUR DETAILS</h3>
      <table style="width:100%;font-size:14px;color:#334155">
        <tr><td style="padding:4px 0;color:#64748B">Firm:</td><td style="padding:4px 0;font-weight:600">${partner.firm_name || '—'}</td></tr>
        <tr><td style="padding:4px 0;color:#64748B">ARN:</td><td style="padding:4px 0;font-weight:600">${partner.arn_number}</td></tr>
        <tr><td style="padding:4px 0;color:#64748B">Plan:</td><td style="padding:4px 0;font-weight:600">${partner.plan.charAt(0).toUpperCase() + partner.plan.slice(1)}</td></tr>
        <tr><td style="padding:4px 0;color:#64748B">SIF Status:</td><td style="padding:4px 0;font-weight:600">${partner.distributor_status}</td></tr>
      </table>
    </div>

    <div style="text-align:center;margin:32px 0">
      <a href="${BASE_URL}/partner/dashboard?key=${partner.widget_key}" style="display:inline-block;background:#10B981;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px">Go to Your Dashboard →</a>
    </div>

    <div style="background:#ECFDF5;border-radius:12px;padding:20px;margin:24px 0">
      <h3 style="margin:0 0 8px;color:#065F46;font-size:14px;text-transform:uppercase;letter-spacing:1px">YOUR PROSPECT LINK</h3>
      <p style="margin:0;font-size:13px;color:#047857">Share this with any HNI contact:</p>
      <p style="margin:8px 0 0;font-size:15px;font-weight:600;color:#065F46;word-break:break-all">${BASE_URL}/invest/${partner.widget_key}</p>
    </div>

    ${empanelmentSection}

    <div style="background:#F8FAFC;border-radius:12px;padding:20px;margin:24px 0">
      <h3 style="margin:0 0 16px;color:#0A1628;font-size:14px;text-transform:uppercase;letter-spacing:1px">GETTING STARTED</h3>
      <ol style="margin:0;padding:0 0 0 20px;font-size:14px;color:#334155;line-height:2">
        <li>Complete your brand profile (logo, photo, colours)</li>
        <li>Add your HNI prospects</li>
        <li>Send SIF recommendation reports</li>
        <li>Book consultations and close SIF investments</li>
      </ol>
    </div>

    <div style="text-align:center;margin-top:32px;padding-top:24px;border-top:1px solid #E2E8F0">
      <p style="color:#94A3B8;font-size:12px;margin:0">The SIFPrime Team</p>
      <p style="color:#94A3B8;font-size:11px;margin:4px 0 0">India's SIF Intelligence Platform — sifprime.com</p>
    </div>
  </div>
</div>
</body>
</html>`;

  return { subject, html };
}

export function buildReportEmail(partner: Partner, lead: PartnerLead): { subject: string; html: string } {
  const monthYear = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  const subject = `${partner.firm_name || partner.full_name} | Your Personalised SIF Analysis — ${monthYear}`;

  const topFund = lead.top_fund_recommendations?.[0];
  const topFundName = topFund?.fundName || 'Top SIF Fund';
  const topFundReturn = topFund?.marchReturn !== null && topFund?.marchReturn !== undefined
    ? `${topFund.marchReturn > 0 ? '+' : ''}${topFund.marchReturn.toFixed(2)}%`
    : 'N/A';
  const topFundScore = topFund?.alphaShieldScore?.toFixed(1) || 'N/A';

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:40px 20px">
  <div style="background:#fff;border-radius:16px;padding:40px;box-shadow:0 2px 12px rgba(0,0,0,0.08)">

    <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px">
      ${partner.logo_url ? `<img src="${partner.logo_url}" alt="${partner.firm_name}" style="height:40px;max-width:160px">` : ''}
      <div>
        <p style="margin:0;font-size:16px;font-weight:700;color:#0A1628">${partner.firm_name || partner.full_name}</p>
        ${partner.tagline ? `<p style="margin:2px 0 0;font-size:12px;color:#64748B">${partner.tagline}</p>` : ''}
      </div>
    </div>

    <p style="color:#334155;font-size:15px;line-height:1.6">Dear ${lead.client_name},</p>
    <p style="color:#334155;font-size:15px;line-height:1.6">${partner.full_name} from ${partner.firm_name || 'our firm'} has prepared a personalised SIF analysis for you.</p>

    <div style="background:#EFF6FF;border-radius:12px;padding:20px;margin:24px 0">
      <h3 style="margin:0 0 8px;color:#1E40AF;font-size:14px;text-transform:uppercase;letter-spacing:1px">WHAT IS A SIF?</h3>
      <p style="margin:0;font-size:14px;color:#1E3A5F;line-height:1.6">Specialised Investment Funds are SEBI's newest category — ₹10L minimum, long-short strategies, hedge fund-style protection.</p>
    </div>

    <div style="background:${partner.brand_color || '#1B4B8A'};border-radius:12px;padding:20px;margin:24px 0;color:#fff">
      <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;opacity:0.8">YOUR SIF MATCH</p>
      <p style="margin:8px 0 0;font-size:20px;font-weight:700">${lead.sif_category_match || 'Hybrid Long-Short SIF'}</p>
      <p style="margin:8px 0 0;font-size:14px;opacity:0.9">Top recommendation: ${topFundName} — Alpha Shield Score ${topFundScore}/10</p>
    </div>

    <div style="background:#FEF2F2;border-radius:12px;padding:16px;margin:24px 0">
      <p style="margin:0;font-size:13px;color:#991B1B">In the March 2026 crash: Nifty fell -11.30%. ${topFundName} delivered ${topFundReturn}.</p>
    </div>

    <div style="text-align:center;margin:32px 0">
      <a href="${BASE_URL}/report/${lead.report_id}" style="display:inline-block;background:${partner.brand_color || '#1B4B8A'};color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px">View Your Full Report →</a>
    </div>

    <div style="text-align:center;margin:24px 0">
      <p style="color:#64748B;font-size:14px;margin:0">To discuss: 📞 ${partner.phone || ''} | 📧 ${partner.email}</p>
      ${partner.cta_url ? `<a href="${partner.cta_url}" style="display:inline-block;margin-top:12px;background:#10B981;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:600;font-size:13px">${partner.cta_text || 'Schedule a Consultation'}</a>` : ''}
    </div>

    <div style="border-top:1px solid #E2E8F0;margin-top:32px;padding-top:20px;text-align:center">
      <p style="color:#334155;font-size:13px;font-weight:600;margin:0">${partner.full_name} | ${partner.firm_name || ''} | ARN: ${partner.arn_number}</p>
      <p style="color:#94A3B8;font-size:11px;margin:8px 0 0">${partner.custom_disclaimer || 'This report is for educational purposes only. SIFs are subject to market risk. Please read all scheme-related documents carefully before investing.'}</p>
      <p style="color:#94A3B8;font-size:11px;margin:8px 0 0">Research powered by SIFPrime</p>
    </div>
  </div>
</div>
</body>
</html>`;

  return { subject, html };
}

export function buildProspectNotifyEmail(partner: Partner, lead: PartnerLead): { subject: string; html: string } {
  const subject = `🔔 New Prospect: ${lead.client_name} — ${lead.investable_surplus || 'N/A'} | ${lead.sif_category_match || 'SIF'}`;

  const topFund = lead.top_fund_recommendations?.[0];

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0A1628;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:40px 20px">
  <div style="background:#fff;border-radius:16px;padding:40px;box-shadow:0 4px 24px rgba(0,0,0,0.3)">
    <div style="text-align:center;margin-bottom:24px">
      <p style="font-size:32px;margin:0">🔔</p>
      <h1 style="color:#0A1628;font-size:20px;margin:8px 0 0">New Prospect via SIFPrime</h1>
    </div>

    <p style="color:#334155;font-size:15px;line-height:1.6">Hi ${partner.full_name},</p>
    <p style="color:#334155;font-size:15px;line-height:1.6">A prospect just completed their SIF analysis using your SIFPrime link.</p>

    <div style="background:#F1F5F9;border-radius:12px;padding:20px;margin:24px 0">
      <h3 style="margin:0 0 12px;color:#0A1628;font-size:14px;text-transform:uppercase;letter-spacing:1px">PROSPECT DETAILS</h3>
      <table style="width:100%;font-size:14px;color:#334155">
        <tr><td style="padding:4px 0;color:#64748B;width:40%">Name:</td><td style="padding:4px 0;font-weight:600">${lead.client_name}</td></tr>
        <tr><td style="padding:4px 0;color:#64748B">Email:</td><td style="padding:4px 0;font-weight:600">${lead.client_email}</td></tr>
        <tr><td style="padding:4px 0;color:#64748B">Phone:</td><td style="padding:4px 0;font-weight:600">${lead.client_phone || '—'}</td></tr>
        <tr><td style="padding:4px 0;color:#64748B">Investable Surplus:</td><td style="padding:4px 0;font-weight:600">${lead.investable_surplus || '—'}</td></tr>
        <tr><td style="padding:4px 0;color:#64748B">Risk Profile:</td><td style="padding:4px 0;font-weight:600">${lead.risk_profile || '—'}</td></tr>
        <tr><td style="padding:4px 0;color:#64748B">SIF Category Match:</td><td style="padding:4px 0;font-weight:600;color:#059669">${lead.sif_category_match || '—'}</td></tr>
        ${topFund ? `<tr><td style="padding:4px 0;color:#64748B">Top Recommendation:</td><td style="padding:4px 0;font-weight:600">${topFund.fundName} (Alpha Shield ${topFund.alphaShieldScore?.toFixed(1)}/10)</td></tr>` : ''}
        <tr><td style="padding:4px 0;color:#64748B">SIF Familiarity:</td><td style="padding:4px 0;font-weight:600">${lead.sif_familiarity || '—'}</td></tr>
      </table>
    </div>

    <div style="background:#F1F5F9;border-radius:12px;padding:20px;margin:24px 0">
      <p style="margin:0 0 4px;font-size:12px;color:#64748B;text-transform:uppercase;letter-spacing:1px">Priorities</p>
      <p style="margin:0;font-size:14px;color:#334155;font-weight:600">${lead.priorities?.join(', ') || '—'}</p>
      <p style="margin:12px 0 4px;font-size:12px;color:#64748B;text-transform:uppercase;letter-spacing:1px">Currently investing in</p>
      <p style="margin:0;font-size:14px;color:#334155;font-weight:600">${lead.current_investments?.join(', ') || '—'}</p>
    </div>

    <div style="text-align:center;margin:32px 0">
      <a href="${BASE_URL}/report/${lead.report_id}" style="display:inline-block;background:#10B981;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px">View Their Full Report →</a>
    </div>

    <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:12px;padding:16px;margin:24px 0">
      <p style="margin:0;font-size:14px;color:#065F46;line-height:1.6"><strong>They've already been educated on SIFs</strong> through your branded page — they know what a SIF is and why their match was recommended. This is a warm call.</p>
    </div>

    <div style="text-align:center;margin-top:32px;padding-top:24px;border-top:1px solid #E2E8F0">
      <p style="color:#94A3B8;font-size:12px;margin:0">The SIFPrime Team</p>
    </div>
  </div>
</div>
</body>
</html>`;

  return { subject, html };
}
