import { IWorldSetting } from "core/World/IWorldSetting"
import { WorldPosition } from "core/World/WorldPosition"
import { IWorldPositionFactory } from "./IWorldPositionFactory"

export class WorldPositionFactory implements IWorldPositionFactory {
   private _worldSetting: IWorldSetting
   constructor(worldSetting: IWorldSetting) {
      this._worldSetting = worldSetting
   }

   public create(x: number, y: number) {
      if (x < 0 || y < 0 || x > this._worldSetting.worldWidth || y > this._worldSetting.worldHeight) {
         return null
      }
      return new WorldPosition(x, y)
   }
}
