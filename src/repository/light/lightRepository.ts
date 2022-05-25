import { LightObj } from "../../models/LightObj";

export type LightListener = (lightObj: LightObj) => void


export interface LightRepository {
  // return id that you need to use to remove listener
  addListener(listener: LightListener): string,

  // return true if the listener was removed, false if it was not
  removeListener(id: string): boolean,

  // sends new object and waits for the returned confirmed state
  send(lightObj: LightObj): Promise<LightObj>,
}

