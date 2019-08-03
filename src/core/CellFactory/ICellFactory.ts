import { Cell } from "core/Cell/Cell"
import { Color } from "core/Color"
import { IWorldPosition } from "core/World/IWorldPosition"

export interface ICellFactory {
   create: (position: IWorldPosition, color: Color) => Cell
}
