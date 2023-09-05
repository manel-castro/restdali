import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { EQueries } from "../EQueries";

export function useGetSectionHeader(): UseQueryResult<unknown> {
  return useQuery([EQueries.HeaderSection], async () => {
    const params = "getAuthorization";
    const response = "await fetchfunction";

    return "response.data";
  });
}
