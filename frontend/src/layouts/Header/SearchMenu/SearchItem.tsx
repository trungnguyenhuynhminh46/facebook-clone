import React from "react";
import {
  useSaveSearchedUserToHistoryMutation,
  useDeleteSearchedUserFromHistoryMutation,
} from "@/store/api/usersApi";
import { useDispatch } from "react-redux";
import { updateSearch } from "@/store/slices/user";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type Props = {
  item: {
    _id: string;
    email: string;
    username: string;
    picture: string;
  };
  currentUser: any;
  history: {
    user: {
      _id: string;
      email: string;
      username: string;
      picture: string;
    };
    savedAt: Date;
  }[];
  setHistory: React.Dispatch<
    React.SetStateAction<
      {
        user: {
          _id: string;
          email: string;
          username: string;
          picture: string;
        };
        savedAt: Date;
      }[]
    >
  >;
  isHistory: boolean;
  setHideMenu: () => void;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchItem: React.FC<Props> = ({
  item,
  currentUser,
  history,
  setHistory,
  isHistory,
  setHideMenu,
  setInputText,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saveSearch, { isLoading: isSavingSearch }] =
    useSaveSearchedUserToHistoryMutation();
  const [deleteSearch, { isLoading: isDeletingSeach }] =
    useDeleteSearchedUserFromHistoryMutation();
  // Handlers
  const handleSaveSearch = async () => {
    navigate(`/profile/${item.email}`);
    setHideMenu();
    setInputText("");
    if (!isHistory) {
      if (isSavingSearch || isDeletingSeach) {
        return;
      }
      try {
        const { newSearch } = await saveSearch({ userId: item._id }).unwrap();
        Cookies.set(
          "user",
          JSON.stringify({
            ...currentUser,
            search: newSearch,
          })
        );
        dispatch(updateSearch({ newSearch }));
        setHistory(newSearch);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDeleteSearch = async () => {
    if (isHistory) {
      if (isSavingSearch || isDeletingSeach) {
        return;
      }
      try {
        const { newSearch } = await deleteSearch({ userId: item._id }).unwrap();
        Cookies.set(
          "user",
          JSON.stringify({
            ...currentUser,
            search: newSearch,
          })
        );
        dispatch(updateSearch({ newSearch }));
        setHistory(newSearch);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div
      className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
      onClick={handleSaveSearch}
    >
      <img src={item.picture} alt="" className="w-10 h-10 rounded-full" />
      <span>{item.username}</span>
      {isHistory && (
        <button
          className="flex justify-center items-center ml-auto z-[1] p-2 rounded-full"
          onClick={async (e) => {
            e.stopPropagation();
            await handleDeleteSearch();
          }}
        >
          <i className="exit_icon scale-75"></i>
        </button>
      )}
    </div>
  );
};

export default SearchItem;
