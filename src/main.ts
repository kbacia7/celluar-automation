import "App.less"
import { NormalCellFactory } from "core/CellFactory/CellFactory"
import { Color } from "core/Color"
import { Draw2D } from "core/Draw2D/Draw2D"
import { PixiContainerFactory } from "core/Draw2D/PixiContainerFactory"
import { PixiSpriteFactory } from "core/Draw2D/PixiSpriteFactory"
import { XMLFileRequest } from "core/FileRequest/XMLFileRequest"
import { I18nTranslate } from "core/i18n/I18nTranslate"
import { InternationalizationSettings } from "core/i18n/InternationalizationSettings"
import { PromiseFactory } from "core/PromiseFactory/PromiseFactory"
import { Statistics } from "core/Statistics/Statistics"
import { StatisticsDataFactory } from "core/Statistics/StatisticsDataFactory"
import { World } from "core/World/World"
import { WorldSetting } from "core/World/WorldSetting"
import { WorldPositionFactory } from "core/WorldPositionFactory/WorldPositionFactory"
import $ from "jquery"

const pixiContainerFactory = new PixiContainerFactory()
const pixiSpriteFactory = new PixiSpriteFactory()
const worldSetting = new WorldSetting()
const promiseVoidFactory = new PromiseFactory<void>()
const promiseStringFactory = new PromiseFactory<string>()

worldSetting.initializeCells = 5
worldSetting.mapBackgroundColor = 0x212121
worldSetting.mainDiv = ".main"
worldSetting.worldHeight = $("body").height()
worldSetting.worldWidth = $(worldSetting.mainDiv).width()
worldSetting.cellSize = 5
worldSetting.allCellsColors = [Color.BROWN, Color.GRAY, Color.GREEN, Color.ORANGE, Color.PINK]

const draw2d = new Draw2D(pixiContainerFactory, pixiSpriteFactory, promiseVoidFactory, worldSetting)
const xmlFileRequest = new XMLFileRequest(promiseStringFactory)
const internationalizationSettings = new InternationalizationSettings("en_US")
const i18nTranslate = new I18nTranslate(internationalizationSettings, xmlFileRequest)

const statisticsDataFactory = new StatisticsDataFactory()
const statisticsData = statisticsDataFactory.create()
const statistics = new Statistics(i18nTranslate)
const worldPositionFactory = new WorldPositionFactory(worldSetting)
const normalCellFactory = new NormalCellFactory(worldPositionFactory, worldSetting)
const allCellFactories = [normalCellFactory]
const world = new World(worldSetting, worldPositionFactory, allCellFactories, draw2d, statistics, statisticsData)
statistics.initialize(worldSetting)
draw2d.prepare()
world.start()
