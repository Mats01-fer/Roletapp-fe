import { BlindsRepository } from "../repository/blinds/blindsRepository"
import { InitRepository } from "../repository/init/initRepository"
import { LightRepository } from "../repository/light/lightRepository"

export type DI = {
  bindsRepository: BlindsRepository,
  lightRepository: LightRepository,
  initRepository: InitRepository
}