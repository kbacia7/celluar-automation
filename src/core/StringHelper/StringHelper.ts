export class StringHelper {
   public readStringUntil(text: string, untilChar: string) {
      return text.substring(0, text.indexOf(untilChar))
   }
}
