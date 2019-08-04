import { Cell } from "core/Cell/Cell"
import { IStatisticsData } from "./IStatisticsData"

export class StatisticsData implements IStatisticsData {
   public allCells: number
   public amountCellsByColors: { [color: number]: number } = {}
   public lastUpdateMs: number
}
