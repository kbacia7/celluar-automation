import { assert } from "chai"
import { describe, it } from "mocha"
import { WorldSetting } from "core/World/WorldSetting";
import { WorldPositionFactory } from "core/WorldPositionFactory/WorldPositionFactory";
import { WorldPosition } from "core/World/WorldPosition";
import { WorldPositionIncorrectCoordsException } from "core/exception/WorldPositionFactory/I18nTranslationsNotLoadedException";
// tslint:disable: max-line-length
describe("WorldPosition", () => {
   describe("#toString()", () => {
      it("should return string with WorldPosition object coords 10,15", () => {
         assert.equal(new WorldPosition(10, 15).toString(), "10|15")
      })
   })
})
