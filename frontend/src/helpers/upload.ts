import axios from "axios";
import dataURItoBlob from "./dataURLToBlob";
const uploadImages = async (
  imagesList: string[],
  path: string,
  token: string
) => {
  try {
    let formData = new FormData();
    imagesList.forEach((image) => {
      const blob = dataURItoBlob(image);
      blob && formData.append("images", blob);
    });
    formData.append("path", path);
    const {
      data: { imagesUrl },
    } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return imagesUrl;
  } catch (err: any) {
    return err.response.data.message;
  }
};
export default uploadImages;
