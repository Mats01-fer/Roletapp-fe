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
      svjetlo: true,
      roleta: 60,
      zakazno: {
        vrijeme: "Wed, 14 Jun 2022 07:00:00 GMT",
        akcija: {
          roleta: 100,
          svjetlo: false,
        }
      }
    }
  }

}