import React, { useEffect, useState } from "react";

// Components
import LoginForm from "@components/login/LoginForm";
import RegisterForm from "@components/login/RegisterForm";
import Footer from "@components/login/Footer";

type Props = {};

const Login: React.FC<Props> = (props: Props) => {
  const [registerIsShown, setRegisterIsShown] = useState(false);
  return (
    <div>
      <LoginForm setRegisterIsShown={setRegisterIsShown} />
      <RegisterForm
        setRegisterIsShown={setRegisterIsShown}
        className={`${registerIsShown ? "fade-in" : "fade-out"}`}
      />

      <Footer />
    </div>
  );
};

export default Login;
