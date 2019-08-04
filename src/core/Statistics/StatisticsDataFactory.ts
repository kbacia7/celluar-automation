import { IStatisticsDataFactory } from "./IStatisticsDataFactory"
import { StatisticsData } from "./StatisticsData"

export class StatisticsDataFactory implements IStatisticsDataFactory {
   public create() {
      return new StatisticsData()
   }
}
