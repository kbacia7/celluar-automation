import { IPromiseFactory } from "./IPromiseFactory"

export class PromiseFactory<T> implements IPromiseFactory<T> {
   public create(resolveFunction: (resolve) => void) {
      return new Promise<T>(resolveFunction)
   }
}
