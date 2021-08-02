import useSwr from "swr";
import { baseUrl } from "ports/api";

export function useFetchBooks() {
  return useSwr(() => baseUrl("/api/v1/books"));
}
