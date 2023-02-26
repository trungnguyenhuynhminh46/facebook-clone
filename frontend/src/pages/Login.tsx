import React, { useEffect, useState } from "react";

// Components
import LoginForm from "./modules/login/LoginForm";
import RegisterForm from "./modules/login/RegisterForm";
import Footer from "./modules/login/Footer";

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
