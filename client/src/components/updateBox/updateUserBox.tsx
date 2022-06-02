import "./updateBox.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateUserData } from "../../utils/networkCall/userCalls";
import { useAuth } from "../../context/authContext";
import Loader from "../loader/loader";

export function UpdateUserBox({ type }: { type: string }) {
  const { authState, authDispatch, networkLoader, setNetworkLoader } =
    useAuth();
  const [value, setValue] = useState(
    type === "name" ? authState.userName : authState.email
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function userUpdateHandler() {
    setNetworkLoader(true);
    if (type === "name") {
      authDispatch({ type: "UPDATE_NAME", payload: value });
      const data = await updateUserData({ name: value });
      setNetworkLoader(false);
      if (data.success) navigate("/user", { replace: true });
      setError(data.message);
      setValue("");
    } else if (type === "email") {
      authDispatch({ type: "UPDATE_EMAIL", payload: value });
      const data = await updateUserData({ email: value });
      setNetworkLoader(false);
      if (data.success) navigate("/user", { replace: true });
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
