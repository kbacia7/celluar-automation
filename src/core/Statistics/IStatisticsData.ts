export interface IStatisticsData {
   allCells: number
   amountCellsByColors: { [color: number]: number }
   lastUpdateMs: number
}
