export const initialState = {
  counterState: {
    count: 0,
  }
}

export enum PublishTopics {
  BLINDS = '$aws/things/BlindsActuator/shadow/update',
  LAMP = '$aws/things/LampActuator/shadow/update'
}

export enum SubscribeTopics {
  BLINDS = '$aws/things/BlindsActuator/shadow/update/accepted',
  LAMP = '$aws/things/LampActuator/shadow/update/accepted',
  LIGHT = '$aws/things/LightSensor/shadow/update/accepted'
}