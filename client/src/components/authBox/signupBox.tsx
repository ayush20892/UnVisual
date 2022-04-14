import "./authBox.css";
import { useState } from "react";
import icon64 from "../../icon/Utility-UI-64.png";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { signup } from "../../utils/networkCall/userCalls";
import { Loader } from "../loader/loader";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export function SignupBox() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const previousPath = "/";
  const { authDispatch, networkLoader, setNetworkLoader } = useAuth();

  async function signupHandler() {
    setNetworkLoader(true);
    const data = await signup({ name, email, password });
    setNetworkLoader(false);
    if (data!.success) {
      authDispatch({ type: "CREATE_SESSION", payload: data!.user });
      navigate(previousPath, { replace: true });
    }
    setError(data!.message);
    setName("");
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
          <h3>Sign Up</h3>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
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
          <h6>Note: Passwords are encrypted.</h6>
          {error !== "" && <h4>{error}</h4>}
          <button onClick={signupHandler}>Continue</button>
          <h5>
            Already a user?{" "}
            <Link to="/user/login" style={{ textDecoration: "none" }}>
              LOGIN
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}
