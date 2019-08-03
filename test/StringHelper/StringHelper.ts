import {assert} from "chai"
import {StringHelper} from "core/StringHelper/StringHelper"
import {describe, it} from "mocha"
describe("StringHelper", () => {
   describe("#readStringUntil()", () => {
     it("should return string from start to character", () => {
       const stringHelper = new StringHelper()
       const readedStr = stringHelper.readStringUntil("HelloWorld_How are you?", "_")
       assert.equal(readedStr, "HelloWorld")
     })
   })
 })
