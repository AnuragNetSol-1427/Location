package com.location;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;

public class StepCounterModule extends ReactContextBaseJavaModule implements SensorEventListener {
    private final SensorManager sensorManager;
    private final Sensor accelerometerSensor;
    private float[] gravity = new float[3];
    private float[] linearAcceleration = new float[3];
    private int stepCount = 0;

    public StepCounterModule(ReactApplicationContext reactContext) {
        super(reactContext);
        sensorManager = (SensorManager) reactContext.getSystemService(Context.SENSOR_SERVICE);
        accelerometerSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
    }

    @Override
    public String getName() {
        return "StepCounter";
    }

    @ReactMethod
    public void startStepCountingUpdates(Promise promise) {
        if (accelerometerSensor != null) {
            sensorManager.registerListener(this, accelerometerSensor, SensorManager.SENSOR_DELAY_UI);
            promise.resolve(null);
        } else {
            promise.reject("ACCELEROMETER_NOT_AVAILABLE", "Accelerometer is not available");
        }
    }

    @ReactMethod
    public void stopStepCountingUpdates() {
        sensorManager.unregisterListener(this, accelerometerSensor);
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
            final float alpha = 0.8f;

            gravity[0] = alpha * gravity[0] + (1 - alpha) * event.values[0];
            gravity[1] = alpha * gravity[1] + (1 - alpha) * event.values[1];
            gravity[2] = alpha * gravity[2] + (1 - alpha) * event.values[2];

            linearAcceleration[0] = event.values[0] - gravity[0];
            linearAcceleration[1] = event.values[1] - gravity[1];
            linearAcceleration[2] = event.values[2] - gravity[2];

            double magnitude = Math.sqrt(linearAcceleration[0] * linearAcceleration[0]
                    + linearAcceleration[1] * linearAcceleration[1]
                    + linearAcceleration[2] * linearAcceleration[2]);

            if (magnitude > 2) {
                stepCount++;
                sendStepCountToJS(stepCount);
            }
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // No need to implement this method for step counting
    }

    private void sendStepCountToJS(int stepCount) {
        WritableMap params = Arguments.createMap();
        params.putInt("stepCount", stepCount);
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("StepCountUpdated", params);
    }
}



