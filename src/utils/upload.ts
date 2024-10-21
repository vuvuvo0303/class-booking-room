import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadFile = async (file: File) => {
  console.log(file);

  const storageRef = ref(storage, file.name);
  const response = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(response.ref);
  console.log("Uploaded image URL:", downloadURL); 
  return downloadURL;
};
export default uploadFile;

