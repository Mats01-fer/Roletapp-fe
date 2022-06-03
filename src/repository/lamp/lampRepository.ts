import { LampObj } from "../../models/LampObj";

export type LampListener = (LampObj: LampObj) => void

export interface LampRepository {
    // return id that you need to use to remove listener
    addListener(listener: LampListener): string,

    // return true if the listener was removed, false if it was not
    removeListener(id: string): boolean,

    // sends new object and waits for the returned confirmed state
    send(blindsObj: LampObj): void,
}