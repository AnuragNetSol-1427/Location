import { NativeModules, NativeEventEmitter } from 'react-native';

const { MyGeolocation, StepCounter } = NativeModules;
const stepCounterEmitter = new NativeEventEmitter(StepCounter);

const getCurrentLocation = () => {
  return MyGeolocation.getCurrentLocation();
};


const startStepCountingUpdates = () => {
  return StepCounter.startStepCountingUpdates();
};

const stopStepCountingUpdates = () => {
  StepCounter.stopStepCountingUpdates();
};

const addStepCountListener = (callback) => {
  return stepCounterEmitter.addListener('StepCountUpdated', callback);
};

const removeStepCountListener = (listener) => {
  listener.remove();
};

export {
  getCurrentLocation,
  startStepCountingUpdates,
  stopStepCountingUpdates,
  addStepCountListener,
  removeStepCountListener,
};

