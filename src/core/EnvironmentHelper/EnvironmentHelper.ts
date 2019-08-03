export class EnvironmentHelper {
   public isNode() {
      const isNode = new Function("try {return this===global;}catch(e){return false;}")
      return isNode()
   }
}
