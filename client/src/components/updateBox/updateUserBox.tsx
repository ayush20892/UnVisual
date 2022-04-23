import "./updateBox.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateUserData } from "../../utils/networkCall/userCalls";
import { useAuth } from "../../context/authContext";
import Loader from "../loader/loader";

export function UpdateUserBox({ type }: { type: string }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { networkLoader, setNetworkLoader } = useAuth();

  async function userUpdateHandler() {
    setNetworkLoader(true);
    if (type === "name") {
      const data = await updateUserData({ name: value });
      setNetworkLoader(false);
      if (data.success) navigate("/user", { replace: true });
    } else if (type === "email") {
      const data = await updateUserData({ email: value });
      if (data.success) navigate("/user", { replace: true });
      setNetworkLoader(false);
      setError(data.message);
      setValue("");
    }
  }

  return (
    <div className="update-main">
      {networkLoader && (
        <div className="network-loader">
          <Loader />
        </div>
      )}
      <div className="update-box">
        <div className="update-form">
          <h3>Update {type}</h3>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={type}
          />
          {error !== "" && <h4>{error}</h4>}
          <button onClick={userUpdateHandler}>Update</button>
          <h5>
            Go to user Dashboard --&gt;{" "}
            <Link to="/user" style={{ textDecoration: "none" }}>
              DASHBOARD
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}
