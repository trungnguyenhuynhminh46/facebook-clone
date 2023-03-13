import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import NormalLayout from "@/layouts/NormalLayout";
import { HashLoader } from "react-spinners";

type Props = {};

const UnVerified = (props: Props) => {
  const currentUser = useSelector(selectCurrentUser);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const handleResentEmail = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/resentEmail`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setSuccess(data.message);
      setError("");
      setIsDisable(true);
      setLoading(false);
    } catch (err: any) {
      setError(err.response.data.message);
      setSuccess("");
      setIsDisable(false);
      setLoading(false);
    }
  };
  return (
    <NormalLayout>
      <div className="flex justify-center mt-[52px] pt-[140px] pb-[250px]">
        <div className="bg-white flex-1 max-w-[400px] rounded-md shadow2">
          <div className="p-3 text-lg font-bold border-b border-solid border-gray-200">
            Please verify your email
          </div>
          <div className="p-3">
            <p className="text-base">
              This email is not verified yet! Please check your email to verify
            </p>
            <div className="py-3">
              <button
                className="bg-[var(--blue-color)] text-sm text-white font-medium py-2 px-3 rounded-md disabled:opacity-40 min-w-[100px] flex justify-center items-center"
                onClick={handleResentEmail}
                disabled={isDisable}
              >
                {loading && (
                  <HashLoader
                    color="white"
                    loading={loading}
                    size={12}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
                {!loading && "Send Email Again"}
              </button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}
          </div>
        </div>
      </div>
    </NormalLayout>
  );
};

export default UnVerified;
