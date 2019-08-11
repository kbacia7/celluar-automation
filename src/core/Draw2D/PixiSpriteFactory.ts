import * as PIXI from "pixi.js"
import { IPixiSpriteFactory } from "./IPixiSpriteFactory"

export class PixiSpriteFactory implements IPixiSpriteFactory {
   public create(texture: PIXI.Texture) {
      return new PIXI.Sprite(texture)
   }
}
