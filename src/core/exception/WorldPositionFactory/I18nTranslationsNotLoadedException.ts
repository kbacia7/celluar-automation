import {CoreException} from "core/exception/CoreException"

export class WorldPositionIncorrectCoordsException extends CoreException {
   constructor() {
      super()

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, WorldPositionIncorrectCoordsException)
      }
    }
}
