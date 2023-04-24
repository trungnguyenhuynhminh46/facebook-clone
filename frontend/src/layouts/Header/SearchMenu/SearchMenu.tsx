import React, { useEffect, useState } from "react";
import { Return } from "@svg/index";
import { useSearchUserQuery } from "@/store/api/usersApi";
import SearchItem from "./SearchItem";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash";

type Props = {
  query: string;
  setHideMenu: () => void;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchMenu: React.FC<Props> = ({ query, setHideMenu, setInputText }) => {
  const [deboundedQuery, setDeboundedQuery] = useState<string>(query);
  useEffect(() => {
    const callback = _.debounce(() => {
      setDeboundedQuery(query);
    }, 200);
    callback();
    // Clean up
    return callback.cancel;
  }, [query]);
  const currentUser = useSelector(selectCurrentUser);
  const [history, setHistory] = useState<
    {
      user: {
        _id: string;
        email: string;
        username: string;
        picture: string;
      };
      savedAt: Date;
    }[]
  >(currentUser.search);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data, isLoading, isFetching } = useSearchUserQuery(
    {
      query: deboundedQuery,
      page,
      limit,
    },
    { skip: !deboundedQuery }
  );
  return (
    <div className="fixed top-0 left-0 w-[320px] bg-white z-20 rounded-lg shadow-xl shadow1">
      <div
        className="absolute top-[10px] left-2 cursor-pointer w-9 h-9 rounded-full hover:bg-gray-100 flex justify-center items-center"
        onClick={() => {
          setHideMenu();
        }}
      >
        <Return />
      </div>
      <div className="min-h-[56px]"></div>
      {/* With no query text */}
      {!query && history.length === 0 && (
        <div className="p-3 flex justify-center items-center w-full text-[15px] text-[var(--color-secondary)] font-[300]">
          No recent searches
        </div>
      )}
      {!query && history.length > 0 && (
        <>
          <h1 className="text-lg font-bold ml-4">Recent</h1>
          <div className="p-2 overflow-auto max-h-[320px] custom-scrollbar">
            {history.map((item) => {
              return (
                <SearchItem
                  key={item.user._id}
                  item={item.user}
                  currentUser={currentUser}
                  history={history}
                  setHistory={setHistory}
                  isHistory={true}
                  setHideMenu={setHideMenu}
                  setInputText={setInputText}
                />
              );
            })}
          </div>
        </>
      )}

      {/* With query text */}
      {query && data && data.users.length === 0 && (
        <div className="p-3 flex justify-center items-center w-full text-[15px] text-[var(--color-secondary)] font-[300]">
          No user is founded
        </div>
      )}

      {query && data && data.users.length > 0 && (
        <InfiniteScroll
          dataLength={data?.users.length}
          next={() => {
            setPage(page + 1);
          }}
          hasMore={data?.count > 0}
          loader={"...loading"}
          className="p-2 overflow-auto max-h-[320px] custom-scrollbar"
        >
          {data.users.map((item) => {
            return (
              <SearchItem
                key={item._id}
                item={item}
                currentUser={currentUser}
                history={history}
                setHistory={setHistory}
                isHistory={false}
                setHideMenu={setHideMenu}
                setInputText={setInputText}
              />
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default SearchMenu;
