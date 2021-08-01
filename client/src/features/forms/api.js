import { baseUrl, fetcher } from "ports/api";

export function createUser(formName, data) {
  return fetcher(baseUrl(`/api/v1/user-forms/${formName}`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function updateUser({ userId, formName }, data) {
  return fetcher(baseUrl(`/api/v1/user-forms/${formName}/${userId}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
