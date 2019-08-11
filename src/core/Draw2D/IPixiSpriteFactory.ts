import * as PIXI from "pixi.js"

export interface IPixiSpriteFactory {
   create: (texture: PIXI.Texture) => PIXI.Sprite
}
