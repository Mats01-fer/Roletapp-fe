import { ScheduleObj } from "../../models/ScheduleObj";

export interface ScheduleRepository {
  schedule(scheduleObj: ScheduleObj): Promise<ScheduleObj>,
}