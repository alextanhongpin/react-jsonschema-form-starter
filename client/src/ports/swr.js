import { SWRConfig } from "swr";
import { fetcher } from "ports/api";

export const SWRProvider = ({ children }) => (
  <SWRConfig
    value={{
      fetcher,
    }}
  >
    {children}
  </SWRConfig>
);
