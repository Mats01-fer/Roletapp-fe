export const initialState = {
  counterState: {
    count: 0,
  }
}

export enum PublishTopics {
  BLINDS = '$aws/things/BlindsActuator/shadow/update',
  LAMP = '$aws/things/LampActuator/shadow/update',
  INIT_BLINDS = '$aws/things/BlindsActuator/shadow/get',
  INIT_LAMP = '$aws/things/LampActuator/shadow/get',
  INIT_LIGHT = '$aws/things/LightSensor/shadow/get'
}

export enum SubscribeTopics {
  BLINDS = '$aws/things/BlindsActuator/shadow/update/accepted',
  LAMP = '$aws/things/LampActuator/shadow/update/accepted',
  LIGHT = '$aws/things/LightSensor/shadow/update/accepted',
  INIT_BLINDS = '$aws/things/BlindsActuator/shadow/get/accepted',
  INIT_LAMP = '$aws/things/LampActuator/shadow/get/accepted',
  INIT_LIGHT = '$aws/things/LightSensor/shadow/get/accepted'
}