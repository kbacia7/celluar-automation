import { assert } from "chai"
import { describe, it } from "mocha"
import { PromiseFactory } from "core/PromiseFactory/PromiseFactory";
// tslint:disable: max-line-length
describe("PromiseFactory", () => {
   describe("#create()", () => {
      it("should return Promise object", () => {
         const promiseFactory = new PromiseFactory<void>()
         assert.instanceOf(promiseFactory.create((resolve) => {resolve()}), Promise)
      })
      it("returned Promise object should resolve string", () => {
         const promiseFactory = new PromiseFactory<string>()
         promiseFactory.create((resolve) => {
            resolve("data")
         }).then((value) => {
            assert.equal(value, "data")
         })
      })
      it("returned Promise object should resolve number", () => {
         const promiseFactory = new PromiseFactory<number>()
         promiseFactory.create((resolve) => {
            resolve(991)
         }).then((value) => {
            assert.equal(value, 991)
         })
      })
      it("returned Promise object should resolve boolean", () => {
         const promiseFactory = new PromiseFactory<boolean>()
         promiseFactory.create((resolve) => {
            resolve(true)
         }).then((value) => {
            assert.equal(value, true)
         })
      })
      it("returned Promise object should resolve null", () => {
         const promiseFactory = new PromiseFactory<number>()
         promiseFactory.create((resolve) => {
            resolve(null)
         }).then((value) => {
            assert.equal(value, null)
         })
      })
      it("returned Promise object should resolve undefined", () => {
         const promiseFactory = new PromiseFactory<number>()
         promiseFactory.create((resolve) => {
            resolve(undefined)
         }).then((value) => {
            assert.equal(value, undefined)
         })
      })

      it("returned Promise object should reject string", () => {
         const promiseFactory = new PromiseFactory<string>()
         promiseFactory.create((resolve, reject) => {
            reject("1data")
         }).catch((value) => {
            assert.equal(value, "1data")
         })
      })
      it("returned Promise object should reject number", () => {
         const promiseFactory = new PromiseFactory<number>()
         promiseFactory.create((resolve, reject) => {
            reject(9191)
         }).catch((value) => {
            assert.equal(value, 9191)
         })
      })
      it("returned Promise object should reject boolean", () => {
         const promiseFactory = new PromiseFactory<boolean>()
         promiseFactory.create((resolve, reject) => {
            reject(false)
         }).catch((value) => {
            assert.equal(value, false)
         })
      })
      it("returned Promise object should reject null", () => {
         const promiseFactory = new PromiseFactory<number>()
         promiseFactory.create((resolve, reject) => {
            reject(null)
         }).catch((value) => {
            assert.equal(value, null)
         })
      })
      it("returned Promise object should reject undefined", () => {
         const promiseFactory = new PromiseFactory<number>()
         promiseFactory.create((resolve, reject) => {
            reject(undefined)
         }).catch((value) => {
            assert.equal(value, undefined)
         })
      })
     
   })
})
