import "./authBox.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../../utils/networkCall/userCalls";
import { useAuth } from "../../context/authContext";
import { Loader } from "../loader/loader";

export function ForgotPasswordBox() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { networkLoader, setNetworkLoader } = useAuth();

  async function forgotPasswordHandler() {
    setNetworkLoader(true);
    const data = await forgotPassword(email);
    setNetworkLoader(false);
    if (data.success) navigate("/user/verifyCode", { replace: true });
    setError(data.message);
    setEmail("");
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
          <h3>Forgot Password</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter registered Email"
          />
          <h6>NOTE: A mail containing the code will be sent.</h6>
          {error !== "" && <h4>{error}</h4>}
          <button onClick={forgotPasswordHandler}>Continue</button>

          <h5>
            New User?{" "}
            <Link to="/user/signup" style={{ textDecoration: "none" }}>
              SIGN UP
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}
