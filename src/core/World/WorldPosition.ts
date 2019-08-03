import { IWorldPosition } from "./IWorldPosition"
export class WorldPosition implements IWorldPosition {
   public x: number
   public y: number

   constructor(x?: number, y?: number) {
      this.x = x
      this.y = y
   }

   public toString = () => {
      return this.x + "|" + this.y
   }
}
