import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage } from "firebase/storage";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';


// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUO8LxM7hqIzhF9a83odybHL_0crIQhhA",
  authDomain: "uploadproject-2d954.firebaseapp.com",
  projectId: "uploadproject-2d954",
  storageBucket: "uploadproject-2d954.appspot.com",
  messagingSenderId: "2325491804",
  appId: "1:2325491804:web:6cbb751fc6934785387699",
  measurementId: "G-T5ZSG1GY9Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes }; // Export the storage for use in other components

export const uploadImgToFireBase=async (images)=>{
  let urls=[]
  for (let index = 0; index < images.length; index++) {
    let img = images[index];
    try {
      const imageRef = ref(storage, `images/${v4()}_image`);
      await uploadBytes(imageRef, img);
      const imageDownloadURL = await getDownloadURL(imageRef);
      urls.push(imageDownloadURL)
    } catch (error) {
      console.log(error.message);
    }
  }
  return urls
}