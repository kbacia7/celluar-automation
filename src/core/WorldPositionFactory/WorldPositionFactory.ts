import {
   WorldPositionIncorrectCoordsException,
} from "core/exception/WorldPositionFactory/I18nTranslationsNotLoadedException"
import { IWorldSetting } from "core/World/IWorldSetting"
import { WorldPosition } from "core/World/WorldPosition"
import { IWorldPositionFactory } from "./IWorldPositionFactory"

export class WorldPositionFactory implements IWorldPositionFactory {
   private _worldSetting: IWorldSetting
   constructor(worldSetting: IWorldSetting) {
      this._worldSetting = worldSetting
   }

   public create(x: number, y: number) {
      const worldSetting = this._worldSetting
      if (x < 0 || y < 0 || x > worldSetting.worldWidth || y > worldSetting.worldHeight) {
         throw new WorldPositionIncorrectCoordsException()
      }
      return new WorldPosition(x, y)
   }
}
