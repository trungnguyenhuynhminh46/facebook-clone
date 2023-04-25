import { useGetImagesQuery } from "@/store/api/usersApi";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

type Props = {
  folder: string;
};

const ManageImagesMenu: React.FC<Props> = ({ folder }) => {
  const { email } = useParams();
  const { data, isLoading, isFetching, isError, error } = useGetImagesQuery(
    { folder, sort: "desc", max: 30 },
    { skip: !folder }
  );
  const isSpinning = isLoading || isFetching;
  const thereIsNoImage = !data || data?.imagesUrl?.length === 0;
  return (
    <div className="rounded-lg bg-white dark:bg-[#242526] w-full p-4 flex flex-col items-stretch gap-5">
      <div className="flex justify-between items-center -mt-2 -mr-2">
        {/* <Link to={`/profile/${email}/photos`}>Photos</Link> */}
        <Link
          to={`#`}
          className="text-2xl font-bold hover:underline transition-all duration-100 dark:text-[#E4E6EB]"
        >
          Photos
        </Link>
        <Link
          to="#"
          className="p-2 text-blue-500 hover:bg-gray-100 rounded-md transition-all duration-200"
        >
          See all photos
        </Link>
      </div>
      {(isLoading || isFetching) && (
        <div className="flex justify-center py-2">
          <ClipLoader
            color={"gray"}
            loading={isLoading || isFetching}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {!isSpinning && thereIsNoImage && (
        <div className="flex justify-center py-2 text-xl font-bold text-gray-500">
          No images available yet
        </div>
      )}
      {!thereIsNoImage && !isError && (
        <div className="grid grid-cols-3 gap-1">
          {data.imagesUrl.slice(0, 9).map((imageUrl) => {
            return (
              <div
                key={imageUrl}
                className="w-full aspect-square relative group cursor-pointer rounded-md dark:bg-white"
              >
                <div className="hidden absolute inset-0 bg-gray-800 opacity-10 group-hover:block"></div>
                <img
                  src={imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      )}
      {isError && (
        <span className="text-rose-500">
          Something went wrong please try again!
        </span>
      )}
    </div>
  );
};

export default ManageImagesMenu;
