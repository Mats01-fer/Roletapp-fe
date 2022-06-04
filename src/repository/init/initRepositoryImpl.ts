import { subscribe, UnsubscribeHolder } from "../../aws/aws_setup";
import { SubscribeTopics } from "../../constants";
import { BlindsObj } from "../../models/BlindsObj";
import { InitObj } from "../../models/InitObj";
import { LampObj } from "../../models/LampObj";
import { InitRepository } from "./initRepository";

function createListener<T>(callback: (data: T) => void) {
  return {
    next: callback,
    error: (error: any) => console.error(error),
    close: () => console.log('Done'),
  }
}

export class InitRepositoryImpl implements InitRepository {
  private initValue: InitObj = {} as InitObj
  private unsubscribeHolders: Record<string, UnsubscribeHolder> = {};
  private promise: Promise<InitObj>;
  private holder: { resolve: (value: InitObj) => void, reject: (reason?: any) => void } = {} as any
  private timeout: NodeJS.Timeout | null = null;

  constructor() {
    this.getInitState = this.getInitState.bind(this);
    this.updateValue = this.updateValue.bind(this);

    this.promise = new Promise<InitObj>((res, rej) => {
      this.holder.resolve = res;
      this.holder.reject = rej;
    });
  }

  async getInitState(): Promise<InitObj> {
    console.log("initstate");

    if(this.timeout != null) return this.promise;

    console.log("settimeut");

    this.timeout = setTimeout(() => {
      this.holder.reject("Ups! Something went wrong.");
    }, 10000);

    this.unsubscribeHolders.blinds = subscribe(
      SubscribeTopics.INIT_BLINDS,
      createListener((data: any) => {
        if(!data.value.current ||
           !data.value.current.state ||
           !data.value.current.state.reported) return;

        this.updateValue(data.value.current.state.reported as BlindsObj)
      })
    );

    this.unsubscribeHolders.lamp = subscribe(
      SubscribeTopics.INIT_LAMP,
      createListener((data: any) => {
        if(!data.value.current ||
           !data.value.current.state ||
           !data.value.current.state.reported) return;

        this.updateValue(data.value.current.state.reported as LampObj)
      })
    );

    // publish(PublishTopics.INIT_BLINDS, {})
    // publish(PublishTopics.INIT_LAMP, {})

    return this.promise;
  }

  private updateValue(data: any) {
    this.initValue = {
      ...this.initValue,
      ...data
    }

    console.log("init update vlaue", this.initValue);

    if(Object.keys(this.initValue).length !== 2) return;

    this.unsubscribeHolders.blinds?.unsubscribe();
    delete this.unsubscribeHolders.blinds;

    this.unsubscribeHolders.lamp?.unsubscribe();
    delete this.unsubscribeHolders.lamp;

    this.holder.resolve(this.initValue);
    if(this.timeout != null) clearTimeout(this.timeout);
  }
}