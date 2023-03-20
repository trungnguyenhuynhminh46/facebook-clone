import axios from "axios";

const createPost = async (
  type: "onlyText" | "cover" | "withImages",
  user: string | undefined,
  text: string | undefined,
  coverId: number | undefined,
  imagesList: string[] | undefined,
  isSharedTo: string | undefined,
  isFeeling: string | undefined,
  checkedOutAt: string | undefined,
  tagedFriends: string[] | undefined,
  token: string | undefined
) => {
  try {
    // console.log({
    //   type,
    //   user,
    //   text,
    //   coverId,
    //   imagesList,
    //   isSharedTo,
    //   isFeeling,
    //   checkedOutAt,
    //   tagedFriends,
    // });
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/post/createPost`,
      {
        type,
        user,
        text,
        coverId,
        imagesList,
        isSharedTo,
        isFeeling,
        checkedOutAt,
        tagedFriends,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "OK";
  } catch (err: any) {
    return err.response.data.message;
  }
};
export default createPost;
