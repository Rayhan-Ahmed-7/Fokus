export interface StickData {
  value: number;
  id: number;
  position: number;
}

export enum SortState {
  Idle = "IDLE",
  Sorting = "SORTING",
  Paused = "PAUSED",
  Completed = "COMPLETED",
}
