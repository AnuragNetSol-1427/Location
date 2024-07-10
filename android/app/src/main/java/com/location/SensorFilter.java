package com.location;

public class SensorFilter {

    private SensorFilter() {
    }

    public static float sum(float[] array) {
        float resultValue = 0;
        for (float v : array) {
            resultValue += v;
        }
        return resultValue;
    }

    public static float[] cross(float[] arrayA, float[] arrayB) {
        float[] retArray = new float[3];
        retArray[0] = arrayA[1] * arrayB[2] - arrayA[2] * arrayB[1];
        retArray[1] = arrayA[2] * arrayB[0] - arrayA[0] * arrayB[2];
        retArray[2] = arrayA[0] * arrayB[1] - arrayA[1] * arrayB[0];
        return retArray;
    }

    public static float norm(float[] array) {
        float result = 0;
        for (float v : array) {
            result += v * v;
        }
        return (float) Math.sqrt(result);
    }


    public static float dot(float[] a, float[] b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }

    public static float[] normalize(float[] a) {
        float[] arr = new float[a.length];
        float norm = norm(a);
        for (int i = 0; i < a.length; i++) {
            arr[i] = a[i] / norm;
        }
        return arr;
    }

}
