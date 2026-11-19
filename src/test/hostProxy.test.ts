import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const config = JSON.parse(readFileSync(resolve(process.cwd(), 'vercel.json'), 'utf8'));
const host = 'mao-de-concha.epmdevtech.com.br';

describe('Vercel host proxy', () => {
  it('proxies the Mão de Concha host before the SPA fallback', () => {
    const rules = config.rewrites as Array<Record<string, any>>;
    expect(rules[0]).toMatchObject({
      source: '/:path*',
      has: [{ type: 'host', value: host }],
      destination: 'https://mao-de-concha.elessandrodev.workers.dev/:path*',
    });
    expect(rules.at(-1)).toMatchObject({ source: '/(.*)', destination: '/index.html' });
  });

  it('keeps the global noindex header on every other host', () => {
    const rule = config.headers.find((item: Record<string, any>) =>
      item.headers.some((header: Record<string, string>) => header.key === 'X-Robots-Tag'),
    );
    expect(rule.has).toEqual([{ type: 'host', value: { neq: host } }]);
    expect(rule.headers).toContainEqual({
      key: 'X-Robots-Tag',
      value: 'noindex, nofollow, noarchive, nosnippet',
    });
  });
});
