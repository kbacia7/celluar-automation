import { FileSystemRequest } from "core/FileRequest/FileSystemRequest"
import { StringHelper } from "core/StringHelper/StringHelper"
import { I18nCantLoadTranslationsException } from "exceptions/i18n/I18nCantLoadTranslationsException"
import { I18nFileNotFoundException } from "exceptions/i18n/I18nFileNotFoundException"
import { I18nLabelNotFoundException } from "exceptions/i18n/I18nLabelNotFoundException"
import { I18nSettingsNotLoadedException } from "exceptions/i18n/I18nSettingsNotLoadedException"
import { I18nTranslationsNotLoadedException } from "exceptions/i18n/I18nTranslationsNotLoadedException"
import path from "path"
import { IFileRequest } from "../FileRequest/IFileRequest"
import { IInternationalizationLanguageGroup } from "./IInternationalizationLanguageGroup"
import { IInternationalizationSettings } from "./IInternationalizationSettings"

export class I18nTranslate {
   private i18nObject: IInternationalizationLanguageGroup = {}
   private i18nSettings: IInternationalizationSettings
   private fileRequest: IFileRequest

   constructor(i18nSettings: IInternationalizationSettings, fileRequest: IFileRequest) {
      this.i18nSettings = i18nSettings
      this.fileRequest = fileRequest
   }

   public translate(label: string) {
      const toLanguage: string = this.i18nSettings.toLanguage
      if (!this.i18nObject || Object.keys(this.i18nObject).length === 0) {
         throw new I18nTranslationsNotLoadedException()
      }
      if (!this.i18nObject[toLanguage]) {
         throw new I18nFileNotFoundException()
      }
      if (!this.i18nObject[toLanguage][label]) {
         throw new I18nLabelNotFoundException()
      }
      return this.i18nObject[toLanguage][label]

   }

   public loadTranslations(directoryPath: string) {
      const fr = this.fileRequest
      const language = this.i18nSettings.toLanguage
      const obj = JSON.parse(fr.loadFileSync(path.join(directoryPath, "/", language + ".json")))
      if (!obj) {
         throw new I18nCantLoadTranslationsException()
      }
      this.i18nObject[language] = obj

   }
}
