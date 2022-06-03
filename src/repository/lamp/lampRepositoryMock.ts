import { LampObj } from "../../models/LampObj";
import { wait } from "../../util";
import { LampListener, LampRepository } from "./lampRepository";


type ListenerStorage = Record<string, LampListener>;

export class LampRepositoryMock implements LampRepository {
  private listeners: ListenerStorage;
  private nextID = 0;

  constructor() {
    this.addListener = this.addListener.bind(this);
    this.removeListener = this.removeListener.bind(this);

    this.listeners = {};
  }
  async send(lampObj: LampObj) {
    await wait(1000);
    for (const listener of Object.values(this.listeners)) {
      listener(lampObj)
    }
  }

  addListener(listener: LampListener): string {
    const id = `listener${this.nextID++}`;
    this.listeners[id] = listener;

    return id;
  }

  removeListener(id: string): boolean {
    if (!this.listeners[id]) return false;

    delete this.listeners[id];
    return true;
  }
}