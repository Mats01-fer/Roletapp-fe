import { BlindsObj } from "../../models/BlindsObj";
import { wait } from "../../util";
import { BlindsListener, BlindsRepository } from "./blindsRepository";

type ListenerStorage = Record<string, BlindsListener>;

export class BlindsRepositoryMock implements BlindsRepository {
  private listeners: ListenerStorage;
  private nextID = 0;

  constructor() {
    this.addListener = this.addListener.bind(this);
    this.removeListener = this.removeListener.bind(this);

    this.listeners = {};
  }

  addListener(listener: BlindsListener): string {
    const id = `listener${this.nextID++}`;
    this.listeners[id] = listener;

    return id;
  }

  removeListener(id: string): boolean {
    if(!this.listeners[id]) return false;

    delete this.listeners[id];
    return true;
  }

  async send(blindsObj: BlindsObj) {
    await wait(1000);
    for(const listener of Object.values(this.listeners)) {
      listener(blindsObj)
    }
  }
}