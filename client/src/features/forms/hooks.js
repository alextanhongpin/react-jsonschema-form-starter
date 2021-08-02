import useSwr from "swr";
import { baseUrl } from "ports/api";

export function useFetchForms(queryParams) {
  return useSwr(() => baseUrl("/api/v1/forms", queryParams));
}

export function useFetchUserForm({ formName, entityId }) {
  return useSwr(() => baseUrl(`/api/v1/dynamic-forms/${formName}/${entityId}`));
}
