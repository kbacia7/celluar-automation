import { Cell } from "core/Cell/Cell"
import { ICellFactory } from "core/CellFactory/ICellFactory"
import { Color } from "core/Color"
import { Draw2D } from "core/Draw2D/Draw2D"
import { IWorldPosition } from "./IWorldPosition"
import { IWorldSetting } from "./IWorldSetting"
import { WorldPosition } from "./WorldPosition"

export class World {
   private _worldSetting: IWorldSetting
   private _cellFactories: ICellFactory[]
   private _allCells: { [position: string]: Cell } = {}
   private _draw2d: Draw2D

   constructor(worldSetting: IWorldSetting, cellFactories: ICellFactory[], draw2d: Draw2D) {
      this._worldSetting = worldSetting
      this._cellFactories = cellFactories
      this._draw2d = draw2d
   }

   public start() {
      const cellSize = this._worldSetting.cellSize
      const xMax = this._worldSetting.worldWidth / cellSize
      const yMax = this._worldSetting.worldHeight / cellSize
      const startCells = this._worldSetting.initializeCells
      const availableColors = [Color.BROWN, Color.GRAY, Color.GREEN, Color.ORANGE, Color.PINK]
      for (let i: number = 0; i < startCells; i++) {
         const xPos = Math.floor(Math.random() * xMax) + 1
         const yPos = Math.floor(Math.random() * yMax) + 1
         const randomPosition = new WorldPosition(xPos * cellSize, yPos * cellSize)
         const createdCell = this._cellFactories[0].create(randomPosition, availableColors[i])
         this._allCells[randomPosition.toString()] = createdCell
      }
      this.step()
   }

   public step() {
      setTimeout(() => {
         for (const cellPosition in this._allCells) {
            if (this._allCells.hasOwnProperty(cellPosition)) {
               const cell = this._allCells[cellPosition]
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
         this._draw2d.draw(Object.values(this._allCells)).then(() => {
            this.step()
         })
      }, 10)
   }
}
