import { ScheduleObj } from "../../models/ScheduleObj";
import { wait } from "../../util";
import { ScheduleRepository } from "./scheduleRepository";

export class ScheduleRepositoryMock implements ScheduleRepository {
  constructor() {
    this.schedule = this.schedule.bind(this);
  }

  async schedule(scheduleObj: ScheduleObj): Promise<ScheduleObj> {
    await wait(1000);

    return {...scheduleObj};
  }

}