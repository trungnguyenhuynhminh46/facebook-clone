import axios from "axios";
const uploadImages = async (
  imagesList: string[],
  path: string,
  token: string
) => {
  try {
    let formData = new FormData();
    for (let image of imagesList) {
      const blob = await fetch(image).then((response) => response.blob());
      blob && formData.append("images", blob);
    }
    formData.append("path", path);
    const {
      data: { imagesUrl },
    } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/upload/uploadImages`,
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
