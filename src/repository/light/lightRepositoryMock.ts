import { LightObj } from "../../models/LightObj";
import { wait } from "../../util";
import { LightListener, LightRepository } from "./lightRepository";

type ListenerStorage = Record<string, LightListener>;

export class LightRepositoryMock implements LightRepository {
  private listeners: ListenerStorage;
  private nextID = 0;

  constructor() {
    this.addListener = this.addListener.bind(this);
    this.removeListener = this.removeListener.bind(this);

    this.listeners = {};
  }

  addListener(listener: LightListener): string {
    const id = `listener${this.nextID++}`;
    this.listeners[id] = listener;

    return id;
  }

  removeListener(id: string): boolean {
    if(!this.listeners[id]) return false;

    delete this.listeners[id];
    return true;
  }

  async send(lightObj: LightObj) {
    await wait(1000);
    for(const listener of Object.values(this.listeners)) {
      listener(lightObj)
    }
  }
}