import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Geolocation from 'react-native-geolocation-service';
import { requestLocationPermission } from '../../Permissions/Permissions';

const ByRNPackage = () => {
    const [position, setPosition] = useState(0);
    const [loader, setLoader] = useState(false);

    // This getLocation method helps to fetch the latitude and longitude from react-native-geolocation-service.
    const getLocation = () => {
        setLoader(true);
        const result = requestLocationPermission();
        result.then(res => {
            console.log('res is:', res);
            if (res) {
                Geolocation.getCurrentPosition(
                    position => {
                        console.log(position);
                        setLoader(false);
                        setPosition(position);
                    },
                    error => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                        setPosition(0);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        });
    };



    return (
        <View>
            <Button title="Get Location by package" onPress={() => getLocation()} />
            <View style={{ alignSelf: 'center', marginTop: 20 }}>
                {position ?
                    <>
                        <Text>{position ? `Latitude: ${position?.coords?.latitude}` : ``}</Text>
                        <Text>{position ? `Longitude: ${position?.coords?.longitude}` : ``}</Text>
                    </>
                    :
                    loader && <ActivityIndicator />
                }
            </View>
        </View>
    )
}

export default ByRNPackage
