const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { spawn } = require('node:child_process');

async function main() {
  const fromNext = createRequire(require.resolve('next/package.json'));
  const sharp = fromNext('sharp');
  const png = await sharp({
    create: { width: 2, height: 2, channels: 3, background: { r: 255, g: 0, b: 0 } },
  }).png().toBuffer();
  const metadata = await sharp(png).metadata();
  assert.equal(metadata.format, 'png');
  assert.equal(metadata.width, 2);
  assert.equal(metadata.height, 2);
  console.log('sharp: PNG の生成・読取り成功');

  const server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '-p', '3107'], {
    stdio: 'inherit',
  });
  try {
    const deadline = Date.now() + 30000;
    let response;
    while (Date.now() < deadline) {
      if (server.exitCode !== null) throw new Error('production server exited before readiness');
      try {
        response = await fetch('http://127.0.0.1:3107', { signal: AbortSignal.timeout(3000) });
        break;
      } catch {
        await new Promise(resolve => setTimeout(resolve, 250));
      }
    }
    assert.ok(response, 'production server did not start');
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(html.includes('Composer'), 'composer UI missing');
    assert.ok(html.includes('data-styled'), 'styled-components SSR missing');
    console.log('UI: HTTP 200、Composer 表示、SSR スタイル出力成功');
  } finally {
    server.kill('SIGTERM');
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
