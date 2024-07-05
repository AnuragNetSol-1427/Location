package com.location;

import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class MyGeolocationModule extends ReactContextBaseJavaModule implements LocationListener {
    private LocationManager locationManager;
    private ReactApplicationContext reactContext;
    private Promise locationPromise;

    MyGeolocationModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        locationManager = (LocationManager) reactContext.getSystemService(reactContext.LOCATION_SERVICE);
    }

    @Override
    public String getName() {
        return "MyGeolocation";
    }

    @ReactMethod
    public void getCurrentLocation(Promise promise) {
        this.locationPromise = promise;
        try {
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, this);
        } catch (SecurityException e) {
            promise.reject("Permission denied", e);
        }
    }

    @Override
    public void onLocationChanged(Location location) {
        if (locationPromise != null) {
            WritableMap map = Arguments.createMap();
            map.putDouble("latitude", location.getLatitude());
            map.putDouble("longitude", location.getLongitude());
            locationPromise.resolve(map);
            locationPromise = null;
            locationManager.removeUpdates(this);
        }
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {}

    @Override
    public void onProviderEnabled(String provider) {}

    @Override
    public void onProviderDisabled(String provider) {
        if (locationPromise != null) {
            locationPromise.reject("Provider disabled");
            locationPromise = null;
        }
    }
}



