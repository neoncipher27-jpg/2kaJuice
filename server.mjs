import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public');
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.svg': 'image/svg+xml'
};

const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname);
    const requested = pathname === '/' ? '/index.html' : pathname;
    const target = path.resolve(root, `.${requested}`);
    if (target !== root && !target.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' }).end('Forbidden');
      return;
    }
    const info = await stat(target);
    const file = info.isDirectory() ? path.join(target, 'index.html') : target;
    const body = await readFile(file);
    response.writeHead(200, {
      'content-type': contentTypes[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'cache-control': 'no-cache',
      'x-content-type-options': 'nosniff'
    });
    response.end(body);
  } catch (error) {
    const status = error?.code === 'ENOENT' || error instanceof URIError ? 404 : 500;
    response.writeHead(status, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' });
    response.end(status === 404 ? 'Not found' : 'Internal server error');
  }
});

const port = Number(process.env.PORT || 3000);
server.listen(port, '0.0.0.0', () => console.log(`2KA Juice listening on 0.0.0.0:${port}`));
