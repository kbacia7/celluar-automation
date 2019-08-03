import "App.less"
import { NormalCellFactory } from "core/CellFactory/CellFactory"
import { Draw2D } from "core/Draw2D/Draw2D"
import { World } from "core/World/World"
import { WorldSetting } from "core/World/WorldSetting"
import { WorldPositionFactory } from "core/WorldPositionFactory/WorldPositionFactory"
const draw2d = new Draw2D()
const worldSetting = new WorldSetting()
worldSetting.initializeCells = 5
worldSetting.worldHeight = 600
worldSetting.worldWidth = 600
worldSetting.cellSize = 3

const worldPositionFactory = new WorldPositionFactory(worldSetting)
const normalCellFactory = new NormalCellFactory(worldPositionFactory, worldSetting)
const allCellFactories = [normalCellFactory]
const world = new World(worldSetting, allCellFactories, draw2d)
draw2d.prepare(worldSetting)
world.start()
