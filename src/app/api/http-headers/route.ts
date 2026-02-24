import { NextRequest, NextResponse } from 'next/server';

const SECURITY_HEADERS = [
  { header: 'strict-transport-security', importance: 'critical', weight: 25, desc: 'Forces HTTPS' },
  { header: 'content-security-policy', importance: 'critical', weight: 25, desc: 'Prevents XSS' },
  { header: 'x-frame-options', importance: 'important', weight: 15, desc: 'Prevents Clickjacking' },
  { header: 'x-content-type-options', importance: 'important', weight: 15, desc: 'Prevents MIME Sniffing' },
  { header: 'referrer-policy', importance: 'recommended', weight: 10, desc: 'Controls Referrer Leakage' },
  { header: 'permissions-policy', importance: 'recommended', weight: 10, desc: 'Controls Browser Features' }
];

const INFO_LEAK_HEADERS = ['server', 'x-powered-by', 'x-aspnet-version', 'x-generator'];

export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get('domain');
  if (!domain) return NextResponse.json({ success: false, error: 'Domain required' }, { status: 400 });

  try {
    let response = await fetch(`https://${domain}`, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    });

    if (response.status === 405) {
      response = await fetch(`https://${domain}`, { method: 'GET', redirect: 'follow' });
    }

    const headers = Object.fromEntries(response.headers);
    const headersLower = Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]));

    const present: any[] = [];
    const missing: any[] = [];
    const warnings: string[] = [];
    let score = 100;

    SECURITY_HEADERS.forEach(check => {
      const value = headersLower[check.header];
      if (value) {
        present.push({ name: check.header, value, ...check });
        if (check.header === 'strict-transport-security' && !value.includes('includeSubDomains')) 
          warnings.push('HSTS lacks includeSubDomains');
      } else {
        missing.push({ name: check.header, ...check });
        score -= check.weight;
      }
    });

    const technology = INFO_LEAK_HEADERS.filter(h => headersLower[h]).map(h => `${h}: ${headersLower[h]}`);
    if (technology.length > 0) warnings.push('Information leakage detected in headers');

    return NextResponse.json({
      success: true,
      domain,
      score: Math.max(0, score),
      grade: score >= 90 ? 'A+' : score >= 70 ? 'B' : 'F',
      security: { present, missing, warnings },
      serverInfo: { server: headersLower['server'], technology }
    });

  } catch (error: any) {
    if (error.message.includes('certificate')) {
      return NextResponse.json({ success: false, error: 'SSL certificate is sus 🚩', isSslError: true });
    }
    return NextResponse.json({ success: false, error: 'Target unreachable' });
  }
}