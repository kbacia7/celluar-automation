import { assert } from "chai"
import { FileSystemRequest } from "core/FileRequest/FileSystemRequest"
import { I18nTranslate } from "core/i18n/I18nTranslate"
import { InternationalizationSettings } from "core/i18n/InternationalizationSettings"
import { StringHelper } from "core/StringHelper/StringHelper"
import { I18nFileNotFoundException } from "exceptions/i18n/I18nFileNotFoundException"
import { I18nLabelNotFoundException } from "exceptions/i18n/I18nLabelNotFoundException"
import { I18nTranslationsNotLoadedException } from "exceptions/i18n/I18nTranslationsNotLoadedException"

import { describe, it } from "mocha"
// tslint:disable: max-line-length
describe("I18nTranslate", () => {
   describe("#translate()", () => {
      it("should return translated i18n string from pl_PL", () => {
         const fileSystemRequest = new FileSystemRequest()
         const internationalizationSettings = new InternationalizationSettings("pl_PL")
         const i18nTranslator = new I18nTranslate(internationalizationSettings, fileSystemRequest)
         i18nTranslator.loadTranslations("../test/i18n/translations")
         assert.equal(i18nTranslator.translate("L__TEST_MESSAGE"), "Hello test_PL")
      })
      it("should return translated i18n string from en_US", () => {
         const fileSystemRequest = new FileSystemRequest()
         const internationalizationSettings = new InternationalizationSettings("en_US")
         const i18nTranslator = new I18nTranslate(internationalizationSettings, fileSystemRequest)
         i18nTranslator.loadTranslations("../test/i18n/translations")
         assert.equal(i18nTranslator.translate("L__TEST_MESSAGE"), "Hello test_EN")
      })
      it("should return translated i18n string from en_US when use IInternationalizationSettings", () => {
         const fileSystemRequest = new FileSystemRequest()
         const internationalizationSettings = new InternationalizationSettings("en_US")
         const i18nTranslator = new I18nTranslate(internationalizationSettings, fileSystemRequest)
         i18nTranslator.loadTranslations("../test/i18n/translations")
         assert.equal(i18nTranslator.translate("L__TEST_MESSAGE"), "Hello test_EN")
      })
      it("should throw I18nTranslationsNotLoadedException when method is used before loadTranslations", () => {
         const fileSystemRequest = new FileSystemRequest()
         const internationalizationSettings = new InternationalizationSettings("en_US")
         const i18nTranslator = new I18nTranslate(internationalizationSettings, fileSystemRequest)
         assert.throw(() => {
            i18nTranslator.translate("L__TEST_MESSAGE")
         }, I18nTranslationsNotLoadedException)
      })
      it("should throw I18nLabelNotFoundException when label to translate doesn't exists", () => {
         const fileSystemRequest = new FileSystemRequest()
         const internationalizationSettings = new InternationalizationSettings("en_US")
         const i18nTranslator = new I18nTranslate(internationalizationSettings, fileSystemRequest)
         i18nTranslator.loadTranslations("../test/i18n/translations")
         assert.throw(() => {
            i18nTranslator.translate("L__TEST_MESSAGE_DOESNT_EXISTS")
         }, I18nLabelNotFoundException)
      })
      it("should throw I18nFileNotFoundException when IInternationalizationSettings passed in constructor point to language which doesn't exists", () => {
         const fileSystemRequest = new FileSystemRequest()
         const internationalizationSettings = new InternationalizationSettings("jp_JP")
         const i18nTranslator = new I18nTranslate(internationalizationSettings, fileSystemRequest)
         assert.throw(() => {
            i18nTranslator.translate("L__TEST_MESSAGE")
         }, I18nFileNotFoundException)
      })
   })
})
