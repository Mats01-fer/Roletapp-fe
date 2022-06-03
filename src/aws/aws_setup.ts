import { Amplify } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import { PublishTopics, SubscribeTopics } from '../constants';

export interface UnsubscribeHolder {
  unsubscribe(): void
}

export type AWSError = {
  code: number,
  message: string,
  timestamp: Date,
  clientToken?: string
}

export type AWSResponse = {
  provider: AWSIoTProvider,
  value: {
    state: {
      desired?: {
        lamp?: boolean,
        blinds?: number,
        light?: number
      },
      reported?: {
        lamp?: boolean,
        blinds?: number,
        light?: number
      },
    }
  }
}

export interface SupscriptionHandler {
  next(data: AWSResponse): void,
  error(error: AWSError): void,
  close?(): void
}

Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
  }
});

Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: process.env.REACT_APP_REGION,
  aws_pubsub_endpoint: `wss://${process.env.REACT_APP_MQTT_ID}.iot.${process.env.REACT_APP_REGION}.amazonaws.com/mqtt`,
}));

Amplify.PubSub.subscribe(Object.values(SubscribeTopics)).subscribe({
  next: (data: any) => console.log('Message received', data),
  error: (error: any) => console.error(error),
  close: () => console.log('Done'),
});

export function subscribe(topic: SubscribeTopics, listener: SupscriptionHandler): UnsubscribeHolder {
  console.log('subscribe', topic);

  return Amplify.PubSub.subscribe(topic).subscribe(listener);
}

export function publish<T>(topic: PublishTopics, data: T): Promise<void> {
  return Amplify.PubSub.publish(topic, { state: { desired: data } });
}