import * as PIXI from "pixi.js"
import { IPixiContainerFactory } from "./IPixiContainerFactory"

export class PixiContainerFactory implements IPixiContainerFactory {
   public create() {
      return new PIXI.Container()
   }
}
