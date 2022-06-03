import { AWSResponse, subscribe, UnsubscribeHolder } from "../../aws/aws_setup";
import { SubscribeTopics } from "../../constants";
import { BlindsObj } from "../../models/BlindsObj";
import { InitObj } from "../../models/InitObj";
import { LampObj } from "../../models/LampObj";
import { LightObj } from "../../models/LightObj";
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
  private resolve: (value: InitObj) => void = (v) => {};
  private reject: (reason?: any) => void = (v) => {};
  private timeout: NodeJS.Timeout | null = null;

  constructor() {
    this.getInitState = this.getInitState.bind(this);
    this.updateValue = this.updateValue.bind(this)
  }

  async getInitState(): Promise<InitObj> {
    this.timeout = setTimeout(() => {
      this.reject("Ups! Something went wrong.");
    }, 10000);

    this.unsubscribeHolders.blinds = subscribe(
      SubscribeTopics.INIT_BLINDS,
      createListener((data: AWSResponse) => {
        if(!data.value.state || !data.value.state.reported) return;

        this.updateValue(data.value.state.reported as BlindsObj)
      })
    );

    this.unsubscribeHolders.lamp = subscribe(
      SubscribeTopics.INIT_LAMP,
      createListener((data: AWSResponse) => {
        if(!data.value.state || !data.value.state.reported) return;

        this.updateValue(data.value.state.reported as LampObj)
      })
    );

    this.unsubscribeHolders.light = subscribe(
      SubscribeTopics.INIT_LIGHT,
      createListener((data: AWSResponse) => {
        if(!data.value.state || !data.value.state.reported) return;

        this.updateValue(data.value.state.reported as LightObj)
      })
    );

    const promise = new Promise<InitObj>((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });

    return promise;
  }

  private updateValue(data: any) {
    if(data.light != null) {
      this.unsubscribeHolders.light?.unsubscribe();
      delete this.unsubscribeHolders.light;
    }
    if(data.blinds != null) {
      this.unsubscribeHolders.blinds?.unsubscribe();
      delete this.unsubscribeHolders.blinds;
    }
    if(data.lamp != null) {
      this.unsubscribeHolders.lamp?.unsubscribe();
      delete this.unsubscribeHolders.lamp;
    }

    this.initValue = {
      ...this.initValue,
      ...data
    }

    if(Object.keys(this.unsubscribeHolders).length === 0) {
      this.resolve(this.initValue);
      if(this.timeout != null) clearTimeout(this.timeout);
    }
  }
}