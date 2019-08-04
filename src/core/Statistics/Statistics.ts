import { I18nTranslate } from "core/i18n/I18nTranslate"
import { IWorldSetting } from "core/World/IWorldSetting"
import $ from "jquery"
import { StatisticsData } from "./StatisticsData"

export class Statistics {
   private _i18nTranslate: I18nTranslate
   constructor(i18nTranslate: I18nTranslate) {
      this._i18nTranslate = i18nTranslate
      this._i18nTranslate.loadTranslations("translations")
   }

   public initialize(worldSettings: IWorldSetting) {
      for (let i = 0; i < worldSettings.initializeCells; i++) {
         const listElement = $("<li><b>0 (0%)</b>")
         listElement.css("color", `#${worldSettings.allCellsColors[i].toString(16)}`)
         listElement.attr("id", `stats-color_${ worldSettings.allCellsColors[i].toString()}`)
         $("#stats-cells-by-color").append(listElement)
      }
      $("#stats-panel-header-label").html(this._i18nTranslate.translate("STATS__HEADER_LABEL"))
   }

   public update(statisticsData: StatisticsData) {
      const statsLastUpdateTranslation = this._i18nTranslate.translate("STATS__LAST_UPDATE")
      const statsCellAmountTranslation = this._i18nTranslate.translate("STATS__CELL_AMOUNT")
      $("#stats-last-update").html(`<b>${statsLastUpdateTranslation}</b>: ${statisticsData.lastUpdateMs.toFixed(2)} ms`)
      $("#stats-cells-amount").html(`<b>${statsCellAmountTranslation}</b>: ${statisticsData.allCells}`)
      for (const color in statisticsData.amountCellsByColors) {
         if (statisticsData.amountCellsByColors.hasOwnProperty(color)) {
            const cellsInColor = statisticsData.amountCellsByColors[color]
            $(`#stats-color_${color}`).html(`${cellsInColor} (
               ${((cellsInColor / statisticsData.allCells) * 100).toFixed(2)}%
            )`)
         }
      }
   }
}
