import { AWSError, AWSResponse, subscribe, UnsubscribeHolder } from "../../aws/aws_setup";
import { SubscribeTopics } from "../../constants";
import { LightObj } from "../../models/LightObj";
import { LightListener, LightRepository } from "./lightRepository";

type ListenerStorage = Record<string, LightListener>;

export class LightRepositoryImpl implements LightRepository {
  private listeners: ListenerStorage;
  private nextID = 0;
  private unsubscribeHolder: UnsubscribeHolder;

  constructor() {
    this.addListener = this.addListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
    this.notifyListeners = this.notifyListeners.bind(this);
    this.subscribeToRepo = this.subscribeToRepo.bind(this);

    this.listeners = {};
    this.unsubscribeHolder = this.subscribeToRepo()
  }

  private subscribeToRepo(): UnsubscribeHolder {
    const holder = subscribe(SubscribeTopics.LIGHT, {
      next: (data: AWSResponse) => {
        if(!data.value.state.reported) return
        if(data.value.state.reported.light === undefined) return

        this.notifyListeners(data.value.state.reported as LightObj)
      },
      error: (error: AWSError) => {
        console.log(error);

        holder.unsubscribe = this.subscribeToRepo().unsubscribe;
      }
    });

    return holder;
  }

  private notifyListeners(lightObj: LightObj) {
    Object.values(this.listeners).forEach(listener => listener(lightObj))
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
}