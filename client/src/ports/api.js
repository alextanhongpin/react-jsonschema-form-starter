const BASE_URL = process.env.REACT_APP_API_ENDPOINT || "http://localhost:3000";

function trimSlash(url) {
  url = url.startsWith("/") ? url.slice(1, url.length) : url;
  url = url.endsWith("/") ? url.slice(0, url.length - 1) : url;
  return url;
}

export function baseUrl(path, queryParams) {
  const qs = queryString(queryParams).toString();
  const url = [trimSlash(BASE_URL), trimSlash(path)].join("/");
  return [url, qs].filter(Boolean).join("?");
}

function queryString(obj = {}) {
  const params = new URLSearchParams();
  for (let key in obj) {
    const value = obj[key];
    if (Array.isArray(value)) {
      for (let item of value) {
        params.append(key, item);
      }
    } else {
      params.set(key, value);
    }
  }
  return params;
}

// NOTE: qs is just a string, not an object.
// This is to avoid dependency changing and rerendering.
export function fetcher(...args) {
  return fetch(...args).then((res) => res.json());
}
