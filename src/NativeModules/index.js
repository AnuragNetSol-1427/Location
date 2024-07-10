import { NativeModules, NativeEventEmitter } from 'react-native';

const { MyGeolocation, StepCounter } = NativeModules;
const stepCounterEmitter = new NativeEventEmitter(StepCounter);

const getCurrentLocation = () => {
  return MyGeolocation.getCurrentLocation();
};


// const startStepCountingUpdates = () => {
//   return StepCounter.startStepCountingUpdates();
// };

// const stopStepCountingUpdates = () => {
//   StepCounter.stopStepCountingUpdates();
// };

// const addStepCountListener = (callback) => {
//   return stepCounterEmitter.addListener('StepCountUpdated', callback);
// };

// const removeStepCountListener = (listener) => {
//   listener.remove();
// };

const startStepCounting = (config) => {
  const default_threshold = config.default_threshold || 15.0;
  const default_delay = config.default_delay || 150000000;
  const cheatInterval = config.cheatInterval || 3000;
  const onStepCountChange = config.onStepCountChange;
  // const onCheat = config.onCheat;
  let prevSteps = 0, currSteps = 0, currTime = 0;
  
  subscription = stepCounterEmitter.addListener('onStepRunning', (event) => {
      if (currTime + cheatInterval < new Date().getTime()) {
          currSteps = Number(event.steps);
          if (onStepCountChange) {
              onStepCountChange(currSteps + prevSteps);
          }
      }
  });

  // subscription2 = RNShake.addListener(() => {
  //     if (currTime + cheatInterval < new Date().getTime()) {
  //         RNWalkCounter.stopCounter();
  //         prevSteps = prevSteps + currSteps;
  //         currSteps = 0;
  //         currTime = new Date().getTime();
  //         if (onCheat) {
  //             onCheat();
  //         }
  //         setTimeout(() => {
  //             RNWalkCounter.startCounter(default_threshold, default_delay);
  //         }, cheatInterval)
  //     }
  // });

  StepCounter.startCounter(default_threshold, default_delay)
}

const stopStepCounting = () => {
  StepCounter.stopCounter();
  if (subscription) {
      subscription.remove();
  }
  // if(subscription2){
  //     subscription2.remove();
  // }
}

// const addStepCountListener = (callback) => {
//   const subscription = stepCounterEmitter.addListener('StepCount', callback);
//   return () => subscription.remove();
// };

export {
  getCurrentLocation,
  // startStepCountingUpdates,
  // stopStepCountingUpdates,
  // addStepCountListener,
  // removeStepCountListener,
  startStepCounting,
  stopStepCounting,
  // addStepCountListener,
};

