import { I18nTranslate } from "core/i18n/I18nTranslate"
import { IStatisticsData } from "./IStatisticsData"

export interface IStatisticsDataFactory {
   create: (i18nTranslate: I18nTranslate) => IStatisticsData
}
