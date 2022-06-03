import { BlindsRepository } from "../repository/blinds/blindsRepository"
import { BlindsRepositoryMock } from "../repository/blinds/blindsRepositoryMock"
import { LampRepository } from "../repository/lamp/lampRepository"
import { LampRepositoryMock } from "../repository/lamp/lampRepositoryMock"
import { LightRepository } from "../repository/light/lightRepository"
import { LightRepositoryMock } from "../repository/light/lightRepositoryMock"

export type DI = {
  blindsRepository: BlindsRepository,
  lightRepository: LightRepository,
  lampRepository: LampRepository
}

const di: DI = {
  blindsRepository: new BlindsRepositoryMock(),
  lightRepository: new LightRepositoryMock(),
  lampRepository: new LampRepositoryMock()
}

export default di;