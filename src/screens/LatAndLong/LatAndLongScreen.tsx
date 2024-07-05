import React from 'react'
import ByRNPackage from './ByRNPackage';
import ByNativeModule from './ByNativeModule';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LatAndLongScreen = () => {
    const navigation = useNavigation();
    return (
        <>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
            <Text style={{ paddingBottom: 50, textAlign: 'center', marginTop: 50, fontSize: 20 }}>Welcome!</Text>
            <View style={{ width: '90%', alignSelf: 'center', gap: 100 }}>
                <ByRNPackage />
                <ByNativeModule />
            </View>
        </>
    )
}

export default LatAndLongScreen




{/* Through react-native-geolocation-service
      For Latitude: {location ? `Latitude: ${location?.coords?.latitude}`: ``}
      For Longitude: {location ? `Longitude: ${location?.coords?.longitude}`: ``} */}

{/* Through native modules
      For Latitude: {location ? `Latitude: ${location.latitude}`: ``}
      For Longitude: {location ? `Longitude: ${location.longitude}`: ``} */}
