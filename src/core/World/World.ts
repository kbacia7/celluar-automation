import { Cell } from "core/Cell/Cell"
import { ICellFactory } from "core/CellFactory/ICellFactory"
import { Color } from "core/Color"
import { Draw2D } from "core/Draw2D/Draw2D"
import { IStatisticsData } from "core/Statistics/IStatisticsData"
import { Statistics } from "core/Statistics/Statistics"
import { StatisticsData } from "core/Statistics/StatisticsData"
import { IWorldPositionFactory } from "core/WorldPositionFactory/IWorldPositionFactory"
import { IWorldPosition } from "./IWorldPosition"
import { IWorldSetting } from "./IWorldSetting"

export class World {
   private _worldSetting: IWorldSetting
   private _cellFactories: ICellFactory[]
   private _allCells: { [position: string]: Cell } = {}
   private _draw2d: Draw2D
   private _statistics: Statistics
   private _statisticsData: StatisticsData
   private _worldPositionFactory: IWorldPositionFactory
   private _cellsByColors: { [color: number]: number } = {}

   constructor(worldSetting: IWorldSetting,
               worldPositionFactory: IWorldPositionFactory,
               cellFactories: ICellFactory[],
               draw2d: Draw2D,
               statistics: Statistics,
               statisticsData: IStatisticsData) {
      this._worldSetting = worldSetting
      this._cellFactories = cellFactories
      this._draw2d = draw2d
      this._statistics = statistics
      this._worldPositionFactory = worldPositionFactory
      this._statisticsData = statisticsData
   }

   public start() {
      const cellSize = this._worldSetting.cellSize
      const xMax = this._worldSetting.worldWidth / cellSize
      const yMax = this._worldSetting.worldHeight / cellSize
      const startCells = this._worldSetting.initializeCells
      const availableColors = this._worldSetting.allCellsColors
      for (let i: number = 0; i < startCells; i++) {
         const xPos = Math.floor(Math.random() * xMax) + 1
         const yPos = Math.floor(Math.random() * yMax) + 1
         const randomPosition = this._worldPositionFactory.create(xPos * cellSize, yPos * cellSize)
         const createdCell = this._cellFactories[0].create(randomPosition, availableColors[i])
         this._allCells[randomPosition.toString()] = createdCell
         this._cellsByColors[availableColors[i]] = 0
      }
      this.step()
   }

   public step() {
      setTimeout(() => {
         const t0 = performance.now()
         let amount = 0
         const cellsInColors: { [color: number]: number } = this._cellsByColors
         for (const color in cellsInColors) {
            if (cellsInColors.hasOwnProperty(color)) {
               cellsInColors[color] = 0
            }
         }
         for (const cellPosition in this._allCells) {
            if (this._allCells.hasOwnProperty(cellPosition)) {
               const cell = this._allCells[cellPosition]
               cellsInColors[cell.color]++
               amount++
               if (!cell.isAlive) {
                  delete this._allCells[cellPosition]
                  continue
               } else {
                  if (cell.health > cell.strength) {
                     cell.kill()
                     continue
                  } else {
                     let newPosition: IWorldPosition = cell.reproduce()
                     if (newPosition === null) {
                        cell.wastedMoves++
                        continue
                     }
                     let indexAsString = newPosition.toString()
                     const targetCell: Cell = this._allCells[indexAsString]
                     let createdCell: Cell = null
                     if (targetCell === undefined) {
                        createdCell = this._cellFactories[0].create(newPosition, cell.color)
                        cell.giveStrength(Math.floor(Math.random() * (15 - -15 + 1)) + -15)
                        cell.wastedMoves = 0
                     } else {
                        if (targetCell.color === cell.color) {
                           createdCell = null
                           if (cell.wastedMoves >= 5) {
                              cell.kill()
                           } else {
                              cell.wastedMoves++
                           }
                        } else {
                           cell.wastedMoves = 0
                           targetCell.wastedMoves = 0
                           if (cell.strength > targetCell.strength) {
                              targetCell.kill()
                              createdCell = this._cellFactories[0].create(newPosition, cell.color)
                           } else {
                              cell.kill()
                              createdCell = this._cellFactories[0].create(cell.position, targetCell.color)
                              newPosition = cell.position
                              indexAsString = newPosition.toString()

                           }
                        }
                     }
                     if (createdCell !== null) {
                        this._allCells[indexAsString] = createdCell
                     }
                  }
               }
            }
         }
         const t1 = performance.now()
         this._statisticsData.lastUpdateMs = t1 - t0
         this._statisticsData.allCells = amount
         this._statisticsData.amountCellsByColors =  cellsInColors
         this._statistics.update(this._statisticsData)
         this._draw2d.draw(Object.values(this._allCells)).then(() => {
            this.step()
         })
      }, 10)
   }
}
