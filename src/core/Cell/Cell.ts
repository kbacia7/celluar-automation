import { Color } from "core/Color"
import { IWorldPosition } from "core/World/IWorldPosition"
import { IWorldSetting } from "core/World/IWorldSetting"
import { IWorldPositionFactory } from "core/WorldPositionFactory/IWorldPositionFactory"
import jQuery from "jquery"
import { CellMoveDirection } from "./CellMoveDirection"
import { CellType } from "./CellType"

export class Cell  {
   protected _worldPositionFactory: IWorldPositionFactory
   protected _position: IWorldPosition
   protected _color: Color
   protected _type: CellType
   protected _health: number
   protected _strength: number
   protected _isAlive: boolean
   protected _wastedMoves: number
   protected _worldSetting: IWorldSetting

   get health(): number {
      return this._health
   }

   get strength(): number {
      return this._strength
   }

   get isAlive(): boolean {
      return this._isAlive
   }

   get position(): IWorldPosition {
      return this._position
   }

   get color(): Color {
      return this._color
   }

   get wastedMoves(): number {
      return this._wastedMoves
   }

   set wastedMoves(value) {
      this._wastedMoves = value
   }

   constructor(worldPositionFactory: IWorldPositionFactory,
               position: IWorldPosition,
               color: Color,
               worldSetting: IWorldSetting) {
      this._worldPositionFactory = worldPositionFactory
      this._position = position
      this._color = color
      this._health = 0
      this._isAlive = true
      this._worldSetting = worldSetting
   }

   public reproduce(): IWorldPosition {
      const direction = Math.floor(Math.random() * 4) + 1
      let x = this._position.x
      let y = this._position.y

      switch (direction) {
         case CellMoveDirection.UP: {
            y -= this._worldSetting.cellSize
            break
         }
         case CellMoveDirection.DOWN: {
            y += this._worldSetting.cellSize
            break
         }
         case CellMoveDirection.RIGHT: {
            x += this._worldSetting.cellSize
            break
         }
         case CellMoveDirection.LEFT: {
            x -= this._worldSetting.cellSize
            break
         }
      }
      this._health++
      try {
         return this._worldPositionFactory.create(x, y)
      } catch (e) {
         return null
      }
   }

   public giveStrength(strength: number) {
      this._strength += strength
   }

   public kill() {
      this._strength = 0
      this._isAlive = false
   }
}
