export async function api(path: string, options?: RequestInit) {
  return fetch(`http://localhost:4000/api${path}`, options).then((r) =>
    r.json()
  );
}
