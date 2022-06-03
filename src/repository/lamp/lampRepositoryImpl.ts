import { AWSError, AWSResponse, publish, subscribe, UnsubscribeHolder } from "../../aws/aws_setup";
import { PublishTopics, SubscribeTopics } from "../../constants";
import { LampObj } from "../../models/LampObj";
import { LampListener, LampRepository } from "./lampRepository";

type ListenerStorage = Record<string, LampListener>;

export class LampRepositoryImpl implements LampRepository {
  private listeners: ListenerStorage;
  private nextID = 0;
  private unsubscribeHolder: UnsubscribeHolder;

  constructor() {
    this.addListener = this.addListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
    this.send = this.send.bind(this);
    this.notifyListeners = this.notifyListeners.bind(this);

    this.listeners = {};
    this.unsubscribeHolder = subscribe(SubscribeTopics.LAMP, {
      next: (data: AWSResponse) => {
        if(!data.value.state.reported) return
        if(!data.value.state.reported.lamp) return

        this.notifyListeners(data.value.state.reported as LampObj)
      },
      error: (error: AWSError) => console.log(error)
    });
  }

  private notifyListeners(lampObj: LampObj) {
    Object.values(this.listeners).forEach(listener => listener(lampObj))
  }

  addListener(listener: LampListener): string {
    const id = `listener${this.nextID++}`;
    this.listeners[id] = listener;

    return id;
  }

  removeListener(id: string): boolean {
    if(!this.listeners[id]) return false;

    delete this.listeners[id];
    return true;
  }

  async send(lampObj: LampObj) {
    return publish(PublishTopics.LAMP, lampObj);
  }
}