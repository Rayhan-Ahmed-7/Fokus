import type { SearchState } from "../util/constant";

export interface StickData {
  value: number;
  id: number;
  position: number;
}
export type ISearchState = (typeof SearchState)[keyof typeof SearchState];
