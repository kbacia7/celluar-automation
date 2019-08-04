import { Cell } from "core/Cell/Cell"
import { IWorldSetting } from "core/World/IWorldSetting"
import $ from "jquery"
import * as PIXI from "pixi.js"

export class Draw2D {
   private _renderer: PIXI.Renderer = null
   private _container: PIXI.Container = null
   private _renderedSprites: { [position: string]: PIXI.Sprite } = {}
   private _availablesPositions: string[] = []

   get renderer(): PIXI.Renderer {
      return this._renderer
   }

   public prepare(worldSettings: IWorldSetting) {
      const cellSize = worldSettings.cellSize
      this._renderer = PIXI.autoDetectRenderer({
         backgroundColor: worldSettings.mapBackgroundColor,
         height: worldSettings.worldHeight,
         resolution: window.devicePixelRatio || 1,
         width: worldSettings.worldWidth,
      })
      this._container = new PIXI.Container()
      for (let x: number = 0; x < worldSettings.worldWidth; x += cellSize) {
         for (let y: number = 0; y < worldSettings.worldHeight; y += cellSize) {
            const sprite = new PIXI.Sprite(PIXI.Texture.WHITE)
            const position = `${x}|${y}`
            sprite.width = cellSize
            sprite.tint = worldSettings.mapBackgroundColor
            sprite.height = cellSize
            sprite.position.x = x
            sprite.position.y = y
            this._renderedSprites[position] = sprite
            this._availablesPositions.push(position)
            this._container.addChild(sprite)
         }
      }
      $(worldSettings.mainDiv).append(this._renderer.view)
   }

   public draw(cells: Cell[]): Promise<boolean> {
      return new Promise((resolve) => {
         for (const cell of cells) {
            if (this._renderedSprites[cell.position.toString()] !== undefined) {
               this._renderedSprites[cell.position.toString()].tint = cell.color
            } else {
               cell.kill()
            }
         }
         this._renderer.render(this._container)
         resolve(true)
      })

   }
}
