import { Cell } from "core/Cell/Cell"
import { IPromiseFactory } from "core/PromiseFactory/IPromiseFactory"
import { IWorldSetting } from "core/World/IWorldSetting"
import $ from "jquery"
import * as PIXI from "pixi.js"
import { IPixiContainerFactory } from "./IPixiContainerFactory"
import { IPixiSpriteFactory } from "./IPixiSpriteFactory"

export class Draw2D {
   private _renderer: PIXI.Renderer = null
   private _container: PIXI.Container = null
   private _renderedSprites: { [position: string]: PIXI.Sprite } = {}
   private _availablesPositions: string[] = []
   private _pixiContainerFactory: IPixiContainerFactory = null
   private _pixiSpriteFactory: IPixiSpriteFactory = null
   private _worldSettings: IWorldSetting = null
   private _promiseFactory: IPromiseFactory<void> = null

   get renderer(): PIXI.Renderer {
      return this._renderer
   }

   constructor(
   pixiContainerFactory: IPixiContainerFactory,
   pixiSpriteFactory: IPixiSpriteFactory,
   promiseFactory: IPromiseFactory<void>,
   worldSettings: IWorldSetting) {
      this._pixiContainerFactory = pixiContainerFactory
      this._worldSettings = worldSettings
      this._pixiSpriteFactory = pixiSpriteFactory
      this._promiseFactory = promiseFactory
   }

   public prepare() {
      const cellSize = this._worldSettings.cellSize
      this._renderer = PIXI.autoDetectRenderer({
         backgroundColor: this._worldSettings.mapBackgroundColor,
         height: this._worldSettings.worldHeight,
         resolution: window.devicePixelRatio || 1,
         width: this._worldSettings.worldWidth,
      })

      this._container = this._pixiContainerFactory.create()
      for (let x: number = 0; x < this._worldSettings.worldWidth; x += cellSize) {
         for (let y: number = 0; y < this._worldSettings.worldHeight; y += cellSize) {
            const sprite = this._pixiSpriteFactory.create(PIXI.Texture.WHITE)
            const position = `${x}|${y}`
            sprite.width = cellSize
            sprite.tint = this._worldSettings.mapBackgroundColor
            sprite.height = cellSize
            sprite.position.x = x
            sprite.position.y = y
            this._renderedSprites[position] = sprite
            this._availablesPositions.push(position)
            this._container.addChild(sprite)
         }
      }
      $(this._worldSettings.mainDiv).append(this._renderer.view)
   }

   public draw(cells: Cell[]): Promise<void> {
      return this._promiseFactory.create((resolve) => {
         for (const cell of cells) {
            if (this._renderedSprites[cell.position.toString()] !== undefined) {
               this._renderedSprites[cell.position.toString()].tint = cell.color
            } else {
               cell.kill()
            }
         }
         this._renderer.render(this._container)
         resolve()
      })

   }
}
