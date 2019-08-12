import { assert } from "chai"
import { describe, it } from "mocha"
import { WorldSetting } from "core/World/WorldSetting";
import { WorldPositionFactory } from "core/WorldPositionFactory/WorldPositionFactory";
import { WorldPosition } from "core/World/WorldPosition";
import { WorldPositionIncorrectCoordsException } from "core/exception/WorldPositionFactory/I18nTranslationsNotLoadedException";
// tslint:disable: max-line-length
describe("WorldPositionFactory", () => {
   describe("#create()", () => {
      it("should return WorldPosition object with X, Y coords on 10, 15", () => {
         const worldSetting = new WorldSetting()
         const worldPositionFactory = new WorldPositionFactory(worldSetting)
         worldSetting.worldHeight = 100
         worldSetting.worldWidth = 100
         const returnedObj = worldPositionFactory.create(10, 15)
         const simpleObj = new WorldPosition(10, 15)
         assert.equal(returnedObj.x, simpleObj.x)
         assert.equal(returnedObj.y, simpleObj.y)

      })
      it("should throw WorldPositionIncorrectCoordsException when X coord is less than 0", () => {
         const worldSetting = new WorldSetting()
         const worldPositionFactory = new WorldPositionFactory(worldSetting)
         worldSetting.worldHeight = 100
         worldSetting.worldWidth = 100
         assert.throw(() => {
            worldPositionFactory.create(-10, 15)         
         }, WorldPositionIncorrectCoordsException)
      })
      it("should throw WorldPositionIncorrectCoordsException when Y coord is less than 0", () => {
         const worldSetting = new WorldSetting()
         const worldPositionFactory = new WorldPositionFactory(worldSetting)
         worldSetting.worldHeight = 100
         worldSetting.worldWidth = 100
         assert.throw(() => {
            worldPositionFactory.create(10, -15)         
         }, WorldPositionIncorrectCoordsException)
      })
      it("should throw WorldPositionIncorrectCoordsException when X coord is greater than world width", () => {
         const worldSetting = new WorldSetting()
         const worldPositionFactory = new WorldPositionFactory(worldSetting)
         worldSetting.worldHeight = 100
         worldSetting.worldWidth = 100
         assert.throw(() => {
            worldPositionFactory.create(1000, 15)         
         }, WorldPositionIncorrectCoordsException)
      })
      it("should throw WorldPositionIncorrectCoordsException when Y coord is greater than world height", () => {
         const worldSetting = new WorldSetting()
         const worldPositionFactory = new WorldPositionFactory(worldSetting)
         worldSetting.worldHeight = 100
         worldSetting.worldWidth = 100
         assert.throw(() => {
            worldPositionFactory.create(10, 145)         
         }, WorldPositionIncorrectCoordsException)
      })
   })
})
