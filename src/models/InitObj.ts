import { BlindsObj } from "./BlindsObj";
import { LightObj } from "./LightObj";
import { ScheduleObj } from "./ScheduleObj";

export type InitObj = LightObj & BlindsObj & {
  zakazno: ScheduleObj
}