import { AWSError, AWSResponse, publish, subscribe, UnsubscribeHolder } from "../../aws/aws_setup";
import { PublishTopics, SubscribeTopics } from "../../constants";
import { BlindsObj } from "../../models/BlindsObj";
import { BlindsListener, BlindsRepository } from "./blindsRepository";

type ListenerStorage = Record<string, BlindsListener>;

export class BlindsRepositoryImpl implements BlindsRepository {
  private listeners: ListenerStorage;
  private nextID = 0;
  private unsubscribeHolder: UnsubscribeHolder;

  constructor() {
    this.addListener = this.addListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
    this.send = this.send.bind(this);
    this.notifyListeners = this.notifyListeners.bind(this);
    this.subscribeToRepo = this.subscribeToRepo.bind(this);

    this.listeners = {};
    this.unsubscribeHolder = this.subscribeToRepo()
  }

  private subscribeToRepo(): UnsubscribeHolder {
    const holder = subscribe(SubscribeTopics.BLINDS, {
      next: (data: AWSResponse) => {
        if(!data.value.state.reported) return
        if(data.value.state.reported.blinds === undefined) return

        this.notifyListeners(data.value.state.reported as BlindsObj)
      },
      error: (error: AWSError) => {
        console.log(error);

        holder.unsubscribe = this.subscribeToRepo().unsubscribe;
      }
    });

    return holder;
  }

  private notifyListeners(blindsObj: BlindsObj) {

    Object.values(this.listeners).forEach(listener => listener(blindsObj))
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
    return publish(PublishTopics.BLINDS, blindsObj);
  }
}