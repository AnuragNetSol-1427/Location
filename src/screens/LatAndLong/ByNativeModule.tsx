import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { getCurrentLocation } from '../../NativeModules/index'
import { requestLocationPermission } from '../../Permissions/Permissions';

const ByNativeModule = () => {
    const [location, setLocation] = useState(0);
    const [loader, setLoader] = useState(false);

    // This fetchLocation method helps to fetch latitude and longitude from bridged module. 
    const fetchLocation = async () => {
        try {
            setLoader(true)
            const permissionResult = await requestLocationPermission();
            if (permissionResult) {
                const location = await getCurrentLocation();
                console.log(location);
                setLoader(false)
                setLocation(location);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <View>
            <Button title="Get Location by native" onPress={() => fetchLocation()} />
            <View style={{ alignSelf: 'center', marginTop: 20 }}>
                {
                    location ?
                        <>
                            <Text>{location ? `Latitude: ${location.latitude}` : ``}</Text>
                            <Text>{location ? `Longitude: ${location.longitude}` : ``}</Text>
                        </>
                        :
                        loader && <ActivityIndicator />
                }
            </View>
        </View>
    )
}

export default ByNativeModule



