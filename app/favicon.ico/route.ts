export const dynamic = "force-static";

export function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="#f5ac13"/><path d="M39.5 18.5a9 9 0 0 0-11.2 11.2L17.9 40.1a4.3 4.3 0 0 0 0 6.1 4.3 4.3 0 0 0 6.1 0l10.4-10.4a9 9 0 0 0 11.1-11.2l-6 6-6-6 6-6Z" fill="#10161b"/></svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
