import { NormalCell } from "core/Cell/NormalCell"
import { Color } from "core/Color"
import { IWorldPosition } from "core/World/IWorldPosition"
import { IWorldSetting } from "core/World/IWorldSetting"
import { IWorldPositionFactory } from "core/WorldPositionFactory/IWorldPositionFactory"
import { ICellFactory } from "./ICellFactory"

export class NormalCellFactory implements ICellFactory {
   private _worldPositionFactory: IWorldPositionFactory
   private _worldSetting: IWorldSetting

   constructor(worldPositionFactory: IWorldPositionFactory, worldSetting: IWorldSetting) {
      this._worldPositionFactory = worldPositionFactory
      this._worldSetting = worldSetting
   }

   public create(position: IWorldPosition, color: Color) {
      return new NormalCell(this._worldPositionFactory, position, color, this._worldSetting)
   }
}
