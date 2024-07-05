import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button title={'Get Latitude and Longitude'} onPress={()=>{navigation.navigate("LatAndLong")}} />
      <Button title={'Step Counter'} onPress={()=>{navigation.navigate("StepCounter")}} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50
    }
})