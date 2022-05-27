import "./authBox.css";
import icon64 from "../../icon/Utility-UI-64.png";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { login } from "../../utils/networkCall/userCalls";
import Loader from "../loader/loader";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  let previousPath = "/";
  const { authDispatch, networkLoader, setNetworkLoader } = useAuth();

  async function loginHandler() {
    setNetworkLoader(true);
    const data = await login(email, password);
    setNetworkLoader(false);
    if (data!.success) {
      authDispatch({ type: "CREATE_SESSION", payload: data!.user });
      navigate(previousPath, { replace: true });
    }
    setError(data!.message);
    setEmail("");
    setPassword("");
  }

  async function guestLoginHandler() {
    setNetworkLoader(true);
    const data = await login("ayush20892@gmail.com", "123456");
    setNetworkLoader(false);
    if (data!.success) {
      authDispatch({ type: "CREATE_SESSION", payload: data!.user });
      navigate(previousPath, { replace: true });
    }
    setError(data!.message);
    setEmail("");
    setPassword("");
  }

  return (
    <div className="login-main">
      {networkLoader && (
        <div className="network-loader">
          <Loader />
        </div>
      )}
      <div className="login-box">
        <img src={icon64} alt=".." />
        <div className="login-form">
          <h3>Login</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div className="password-input">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={!showPassword ? "password" : "text"}
              value={password}
              placeholder="Password"
            />
            <div
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>

          {error !== "" && <h4>{error}</h4>}
          <div className="forgotPass-btn">
            <Link to="/user/forgotPassword">Forgot Password ?</Link>
          </div>
          <button onClick={loginHandler}>Continue</button>
          <h5>Or</h5>
          <button onClick={guestLoginHandler} className="guest-login-btn">
            Guest Login
          </button>
          <h5>
            New to Website?{" "}
            <Link to="/user/signup" style={{ textDecoration: "none" }}>
              SIGN UP
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}
