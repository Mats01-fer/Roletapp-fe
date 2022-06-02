import { BlindsRepository } from "../repository/blinds/blindsRepository"
import { LampRepository } from "../repository/lamp/lampRepository"
import { LightRepository } from "../repository/light/lightRepository"
import { LightRepositoryImpl } from "../repository/light/lightRepositoryImpl"

export type DI = {
  bindsRepository?: BlindsRepository,
  lightRepository: LightRepository,
  lampRepository?: LampRepository
}

const di: DI = {
  bindsRepository: undefined, // new BlindsRepositoryImpl(),
  lightRepository: new LightRepositoryImpl(),
  lampRepository: undefined // new LampRepositoryImpl()
}

export default di;