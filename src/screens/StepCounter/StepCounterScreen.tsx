import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { startStepCounting, stopStepCounting } from '../../NativeModules/index';

const StepCounterScreen = () => {
    const navigation = useNavigation();
    const [stepCount, setStepCount] = useState(0);

   
    const startCounting = () => {
        const config = {
            default_threshold: 15.0,
            default_delay: 150000000,
            cheatInterval: 3000,
            onStepCountChange: (stepCount:any) => { setStepCount(stepCount) },
            // onCheat: () => { console.log("User is Cheating") }
          }
          startStepCounting(config);
    };

    const stopCounting = () => {
        stopStepCounting();
    };

    return (
        <>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
            {/* <View style={styles.container}>
                <Button title="Start" onPress={() => startStepCounter()} />
                <Text>{steps}</Text>
                <Button title="Stop" onPress={() => stopStepCounter()} />
            </View> */}
            <View>
                <Button title="Start" onPress={startCounting} />
                <Text>Steps: {stepCount}</Text>
                <Button title="Stop" onPress={stopCounting} />
            </View>
        </>
    )
}

export default StepCounterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
})