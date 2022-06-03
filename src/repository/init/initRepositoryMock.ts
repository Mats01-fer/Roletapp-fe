import { InitObj } from "../../models/InitObj";
import { wait } from "../../util";
import { InitRepository } from "./initRepository";

export class InitRepositoryMock implements InitRepository {
  constructor() {
    this.getInitState = this.getInitState.bind(this);
  }

  async getInitState(): Promise<InitObj> {
    await wait(1000);

    return {
      lamp: true,
      blinds: 60,
      light: 50
    }
  }

}