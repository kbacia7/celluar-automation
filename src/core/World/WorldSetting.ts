import { IWorldSetting } from "./IWorldSetting"

export class WorldSetting implements IWorldSetting {
   public cellAvailableSteps: number
   public initializeCells: number
   public worldWidth: number
   public worldHeight: number
   public cellSize: number
   public mainDiv: string
   public mapBackgroundColor: number
   public allCellsColors: number[]
}
