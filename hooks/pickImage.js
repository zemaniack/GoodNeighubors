import React from "react";
import * as ImagePicker from "expo-image-picker";

// This will open the image picker and return the URI (path to the image)
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  } else {
    return null;
  }
};

export default pickImage;
