export async function fetchGet(api) {
  const response = await fetch(api, { method: "GET" });
  const result = await response.json();
  return result;
}

export async function fetchPut(api) {
  const response = await fetch(api, { method: "PUT" });
  const result = await response.json();
  return result;
}
