import type { SortState } from "../util/constant";

export interface StickData {
  value: number;
  id: number;
  position: number;
}
export type ISortState = (typeof SortState)[keyof typeof SortState];
