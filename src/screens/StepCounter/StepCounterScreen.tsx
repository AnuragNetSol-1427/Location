import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { addStepCountListener, removeStepCountListener, startStepCountingUpdates, stopStepCountingUpdates } from '../../NativeModules/index';

const StepCounterScreen = () => {
    const navigation = useNavigation();
    const [steps, setSteps] = useState(0);

    const startStepCounting = async () => {
        try {
            await startStepCountingUpdates();
        } catch (error) {
            console.error(error);
        }
    };
    const stepCountListener = addStepCountListener((event) => {
        setSteps(event.stepCount);
    });

    // startPedometer();

    const stopPedometer = () => {
        stopStepCountingUpdates();
        removeStepCountListener(stepCountListener);
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
                <Button title="Start" onPress={() => startStepCounting()} />
                <Text>Steps: {steps}</Text>
                <Button title="Stop" onPress={() => stopPedometer()} />
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