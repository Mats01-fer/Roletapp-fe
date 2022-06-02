import { Amplify } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

export interface SupscriptionHandler<T> {
  next(data: T): void,
  error(error: Error): void,
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

Amplify.PubSub.subscribe('$aws/things/LampActuator/shadow/get').subscribe({
  next: (data: any) => console.log('Message received', data),
  error: (error: any) => console.error(error),
  close: () => console.log('Done'),
});

Amplify.PubSub.subscribe('$aws/things/LampActuator/shadow/get/accepted').subscribe({
  next: (data: any) => console.log('Message received', data),
  error: (error: any) => console.error(error),
  close: () => console.log('Done'),
});

Amplify.PubSub.subscribe('$aws/things/LampActuator/shadow/update').subscribe({
  next: (data: any) => console.log('Message received', data),
  error: (error: any) => console.error(error),
  close: () => console.log('Done'),
});

Amplify.PubSub.subscribe('$aws/things/LampActuator/shadow/update/delta').subscribe({
  next: (data: any) => console.log('Message received', data),
  error: (error: any) => console.error(error),
  close: () => console.log('Done'),
});

Amplify.PubSub.subscribe('$aws/things/LampActuator/shadow/update/accepted').subscribe({
  next: (data: any) => console.log('Message received', data),
  error: (error: any) => console.error(error),
  close: () => console.log('Done'),
});

console.log('aws1');

export function a() {
  console.log('aws2');

}

// function subscribe(topic: string, listener: SupscriptionHandler<T>) {
//   Amplify.PubSub.subscribe('real-time-weather').subscribe({
//     next: data => console.log('Message received', data),
//     error: error => console.error(error),
//     close: () => console.log('Done'),
//   });
// }

export default a;