import "./authBox.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { passwordReset } from "../../utils/networkCall/userCalls";
import { useAuth } from "../../context/authContext";
import { Loader } from "../loader/loader";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export function PasswordResetBox() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { authDispatch, networkLoader, setNetworkLoader } = useAuth();

  async function passwordResetHandler() {
    setNetworkLoader(true);
    const data = await passwordReset({ password, confirmPassword });
    setNetworkLoader(false);
    if (data.success) {
      authDispatch({ type: "CREATE_SESSION", payload: data.user });
      navigate("/user", { replace: true });
    }
    setError(data.message);
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="login-main">
      {networkLoader && (
        <div className="network-loader">
          <Loader />
        </div>
      )}
      <div className="login-box">
        <div className="login-form">
          <h3>Password Reset</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="password-input">
            <input
              type={!showPassword ? "password" : "text"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confrim Password"
            />
            <div
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
          {error !== "" && <h4>{error}</h4>}
          <button onClick={passwordResetHandler}>Continue</button>
          <h5>
            Remember Password?{" "}
            <Link to="/user/login" style={{ textDecoration: "none" }}>
              LOGIN
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}
