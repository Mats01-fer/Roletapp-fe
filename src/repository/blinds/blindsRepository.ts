import { BlindsObj } from "../../models/BlindsObj";

export type BlindsListener = (blindsObj: BlindsObj) => void


export interface BlindsRepository {
  // return id that you need to use to remove listener
  addListener(listener: BlindsListener): string,

  // return true if the listener was removed, false if it was not
  removeListener(id: string): boolean,

  // sends new object and waits for the returned confirmed state
  send(blindsObj: BlindsObj): Promise<BlindsObj>,
}

