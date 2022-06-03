import { BlindsRepository } from "../repository/blinds/blindsRepository"
import { BlindsRepositoryImpl } from "../repository/blinds/blindsRepositoryImpl"
import { LampRepository } from "../repository/lamp/lampRepository"
import { LampRepositoryImpl } from "../repository/lamp/lampRepositoryImpl"
import { LightRepository } from "../repository/light/lightRepository"
import { LightRepositoryImpl } from "../repository/light/lightRepositoryImpl"

export type DI = {
  blindsRepository: BlindsRepository,
  lightRepository: LightRepository,
  lampRepository: LampRepository
}

const di: DI = {
  blindsRepository:  new BlindsRepositoryImpl(),
  lightRepository: new LightRepositoryImpl(),
  lampRepository: new LampRepositoryImpl()
}

export default di;