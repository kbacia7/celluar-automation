import { Color } from "core/Color"
import { IWorldPosition } from "core/World/IWorldPosition"
import { IWorldSetting } from "core/World/IWorldSetting"
import { IWorldPositionFactory } from "core/WorldPositionFactory/IWorldPositionFactory"
import { Cell } from "./Cell"
import { CellType } from "./CellType"

export class NormalCell extends Cell {
   constructor(worldPositionFactory: IWorldPositionFactory,
               position: IWorldPosition,
               color: Color,
               worldSetting: IWorldSetting) {
      super(worldPositionFactory, position, color, worldSetting)
      this._type = CellType.NORMAL
   }

   public reproduce(): IWorldPosition {
      return super.reproduce()
   }
}
