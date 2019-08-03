import $ from "jquery"
import { IFileRequest } from "./IFileRequest"
export class XMLFileRequest implements IFileRequest {

   public loadFileAsync(filePath: string) {
      return new Promise((resolve) => {
         $.ajax({
            async: true,
            success: (data) => {
               resolve(data)
            },
            type: "GET",
            url: filePath,
        })
      })
   }
   public loadFileSync(filePath: string) {
      return $.ajax({
         async: false,
         type: "GET",
         url: filePath,
     }).responseText
   }
}
