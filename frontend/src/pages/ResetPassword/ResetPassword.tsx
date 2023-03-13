import NormalLayout from "@/layouts/NormalLayout";
import { useState } from "react";
import MainForm from "./MainForm";
import ConfirmForm from "./ConfirmForm";
import CodeForm from "./CodeForm";
import ChangePassword from "./ChangePassword";

type Props = {};

const ResetPassword = (props: Props) => {
  const [menu, setMenu] = useState("search");
  const [userInfo, setUserInfo] = useState<{
    picture: string;
    email: string;
    username: string;
  } | null>(null);
  // search, confirm, code
  const [sendBy, setSendBy] = useState<string>("email");
  return (
    <NormalLayout>
      <div className="flex justify-center mt-[52px] pt-[140px] pb-[250px]">
        {menu === "search" && (
          <MainForm setMenu={setMenu} setUserInfo={setUserInfo} />
        )}
        {menu === "confirm" && (
          <ConfirmForm
            setMenu={setMenu}
            userInfo={userInfo}
            setSendBy={setSendBy}
            sendBy={sendBy}
          />
        )}
        {menu === "code" && (
          <CodeForm setMenu={setMenu} email={userInfo?.email || ""} />
        )}
        {menu === "resetPassword" && (
          <ChangePassword setMenu={setMenu} email={userInfo?.email || ""} />
        )}
      </div>
    </NormalLayout>
  );
};

export default ResetPassword;
