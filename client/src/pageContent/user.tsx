import React from "react";
import { useParams } from "react-router-dom";
import { ForgotPasswordBox } from "../components/authBox/forgotPasswordBox";
import { LoginBox } from "../components/authBox/loginBox";
import { PasswordResetBox } from "../components/authBox/passwordReset";
import { SignupBox } from "../components/authBox/signupBox";
import { UserBox } from "../components/authBox/userBox";
import { VerifyCodeBox } from "../components/authBox/verifyCodeBox";

function User() {
  const { action } = useParams();
  return (
    <>
      {action === "login" && <LoginBox />}

      {action === "signup" && <SignupBox />}

      {action === "forgotPassword" && <ForgotPasswordBox />}

      {action === "verifyCode" && <VerifyCodeBox />}

      {action === "passwordReset" && <PasswordResetBox />}

      {!action && <UserBox />}
    </>
  );
}

export default User;
