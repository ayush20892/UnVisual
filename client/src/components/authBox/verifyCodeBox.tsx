import "./authBox.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verifyCode } from "../../utils/networkCall/userCalls";
import { useAuth } from "../../context/authContext";
import { Loader } from "../loader/loader";

export function VerifyCodeBox() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { networkLoader, setNetworkLoader } = useAuth();

  async function verifyCodeHandler() {
    setNetworkLoader(true);
    const data = await verifyCode(code);
    setNetworkLoader(false);
    if (data.success) navigate("/user/passwordReset", { replace: true });
    setError(data.message);
    setCode("");
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
          <h3>Verify Code</h3>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Code"
          />
          <h6>Check your mail inbox for the code.</h6>
          {error !== "" && <h4>{error}</h4>}
          <button onClick={verifyCodeHandler}>Continue</button>
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
