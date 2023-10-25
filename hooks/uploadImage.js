import * as ImagePicker from "expo-image-picker";
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import React from "react";
import uuid from "uuid";
import { app, db } from "../firebaseConfig";
// import storage from "@react-native-firebase/storage";
import { getAuth } from "firebase/auth";

// This will upload an image to Firebase Storage and return the URL
const uploadImage = async (uri) => {
  // const blob = await new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.onload = function () {
  //     resolve(xhr.response);
  //   };
  //   xhr.onerror = function (e) {
  //     console.log(e);
  //     reject(new TypeError("Network request failed"));
  //   };
  //   xhr.responseType = "blob";
  //   xhr.open("GET", uri, true);
  //   xhr.send(null);
  // });

  // const fileRef = ref(getStorage(), uuid.v4());
  // const result = await uploadBytes(fileRef, blob);

  // // We're done with the blob, close and release it
  // blob.close();

  // return await getDownloadURL(fileRef);

  const auth = getAuth(app);
  const user = auth.currentUser;

  const imageRef = ref(storage, `images/${user + uuid.v4()}`);
  uploadBytes(imageRef, uri);
};

export default uploadImage;
