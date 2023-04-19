import { useDeletePostMutation } from "@/store/api/postsApi";
import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";

type Props = {
  postId: string;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteConfirmForm: React.FC<Props> = ({ postId, setIsShown }) => {
  const [handleDeletePost] = useDeletePostMutation();
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-20">
      <div className="absolute inset-0 bg-gray-300 opacity-60 z-10" />
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="w-full max-w-[550px] rounded-lg shadow2 bg-white">
          <div className="relative flex justify-center p-4 border-b border-solid border-gray-300">
            <h2 className="text-xl font-bold text-center tracking-wide">
              Move to your trash?
            </h2>
            <button
              className="absolute top-1/2 -translate-y-1/2 right-4 w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center"
              onClick={() => {
                setIsShown(false);
              }}
            >
              <i className="exit_icon scale-75"></i>
            </button>
          </div>
          <p className="tracking-wide text-base leading-5 font-light py-2 px-4">
            Items in your trash will be automatically deleted after 30 days. You
            can delete them from your trash earlier by going to activity log in
            settings.
          </p>
          <div className="flex items-stretch h-[70px] justify-end gap-2 p-4">
            <button
              className="px-3 flex justify-center items-center border-none outline-none rounded-md bg-transparent hover:bg-gray-200 text-[15px] font-medium text-blue-500"
              onClick={() => {
                setIsShown(false);
              }}
            >
              Cancel
            </button>
            <button
              className="relative px-10 flex justify-center items-center bg-blue-600 font-medium text-white rounded-md hover--overlay"
              onClick={async () => {
                await handleDeletePost({ postId });
                setIsShown(false);
                toast("You post is deleted");
              }}
            >
              Move
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("comfirm-portal")!
  );
};

export default DeleteConfirmForm;
