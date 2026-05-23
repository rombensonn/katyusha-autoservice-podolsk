const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function sitePath(path: string) {
  if (!publicBasePath) {
    return path;
  }

  return path.startsWith("/") ? `${publicBasePath}${path}` : `${publicBasePath}/${path}`;
}
