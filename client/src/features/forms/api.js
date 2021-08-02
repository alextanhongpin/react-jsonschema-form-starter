import { baseUrl, fetcher } from "ports/api";

export function create(formName, data) {
  return fetcher(baseUrl(`/api/v1/dynamic-forms/${formName}`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function update({ entityId, formName }, data) {
  return fetcher(baseUrl(`/api/v1/dynamic-forms/${formName}/${entityId}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
