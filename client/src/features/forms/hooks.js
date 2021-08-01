import useSwr from "swr";
import { baseUrl } from "ports/api";

export function useFetchForms(queryParams) {
  return useSwr(() => baseUrl("/api/v1/forms", queryParams));
}
