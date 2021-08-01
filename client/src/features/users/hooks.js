import useSwr from "swr";
import { baseUrl } from "ports/api";

export function useFetchUsers() {
  return useSwr(() => baseUrl("/api/v1/users"));
}
