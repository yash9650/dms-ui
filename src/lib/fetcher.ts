const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function api(path: string, options?: RequestInit) {
  return fetch(`http://localhost:4000/api${path}`, options).then((r) =>
    r.json()
  );
}
