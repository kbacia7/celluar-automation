import * as PIXI from "pixi.js"

export interface IPixiContainerFactory {
   create: () => PIXI.Container
}
