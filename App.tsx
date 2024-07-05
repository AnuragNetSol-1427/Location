import React from 'react'
import LatAndLongScreen from './src/screens/LatAndLong/LatAndLongScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/HomeScreen/HomeScreen';
import StepCounterScreen from './src/screens/StepCounter/StepCounterScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LatAndLong" component={LatAndLongScreen} />
        <Stack.Screen name="StepCounter" component={StepCounterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App