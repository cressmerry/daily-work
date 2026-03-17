package com.tek.ArrayExercise;

import java.util.Arrays;

public class RotateArrayExercise {
    public static void main(String[] args) {
        int[] array0 = {1, 2, 3, 4, 5};
        System.out.println("Array before left shift: " + Arrays.toString(array0));
        leftRotateArray(array0, 3);
        System.out.println("Array after left shift: " + Arrays.toString(array0));
        
        int[] array1 = {1, 2, 3, 4, 5};
        System.out.println("Array before right shift: " + Arrays.toString(array1));
        rightRotateArray(array1, 3);
        System.out.println("Array after right shift: " + Arrays.toString(array1));
    }
    
    public static void rightRotateArray(int[] array, int shift) {
        shift = shift % array.length;
        reverse(array, 0, array.length - 1);
        reverse(array, 0, shift - 1);
        reverse(array, shift, array.length - 1);
    }
    
    public static void leftRotateArray(int[] array, int shift) {
        shift = shift % array.length;
        reverse(array, 0, array.length - 1);
        reverse(array, 0, array.length - shift - 1);
        reverse(array, array.length - shift, array.length - 1);
    }
    
    private static void reverse(int[] arr, int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
}
