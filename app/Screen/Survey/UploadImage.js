import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import * as ImagePicker from 'expo-image-picker';

export default function UploadImage({ callbackImage }) {
  const [FotoBersama, SetFotoBersama] = useState(null);
  const [PreviewImage, SetPreviewImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
  
    if (!result.canceled) {
      SetPreviewImage(result.assets[0].uri);
      callbackImage(result);
    }
  };
  
  const openCamera = async () => {
    // Minta izin kamera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("Kamu harus izinkan kamera!");
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      SetPreviewImage(result.assets[0].uri);
      callbackImage(result);
    }
  };

  return (
    <>
      <View className="bg-white p-3 ">
        {PreviewImage ? (
          <View className="flex-row justify-center ">
            <TouchableOpacity className="" onPress={pickImage}>
              <Image
                source={{ uri: PreviewImage }}
                resizeMode={"contain"}
                style={{ width: 200, height: 300 }}
                className=""
              />
              <Text className="text-center text-gray-500">
                Klik untuk ganti foto
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity
              onPress={openCamera}
              className="justify-center items-center"
            >
              <View className="bg-green-600 h-24 w-24 justify-center items-center rounded-full">
                <Icon name="camera" size={40} color={"#fff"} />
              </View>
              <Text className="text-lg font-medium mt-3 text-center">
                Upload Foto
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
