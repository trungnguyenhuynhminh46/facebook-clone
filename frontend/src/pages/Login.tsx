import React from "react";

// Components
import LoginForm from "./modules/login/LoginForm";
import RegisterForm from "./modules/login/RegisterForm";
import Footer from "./modules/login/Footer";

type Props = {};

const Login: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <LoginForm />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default Login;
