import { InitObj } from "../../models/InitObj";

export interface InitRepository {
  getInitState(): Promise<InitObj>,
}