import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";

// Components
import LoginForm from "@components/login/LoginForm";
import RegisterForm from "@components/login/RegisterForm";
import Footer from "@components/login/Footer";
import { Navigate } from "react-router-dom";

type Props = {};

const Login: React.FC<Props> = (props: Props) => {
  const user = useSelector(selectCurrentUser);
  // if (user) return <Navigate to="/"></Navigate>;
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
