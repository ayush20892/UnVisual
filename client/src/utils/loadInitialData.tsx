import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { userDashboard } from "./networkCall/userCalls";
import { getAllVideos } from "./networkCall/videoCalls";
import { ActionType } from "./types";

type loadInitialDataProp = {
  videoDispatch: Function;
  authDispatch: (action: ActionType) => void;
  navigate: NavigateFunction;
  setIsLoading: Function;
};

export default async function loadInitialData({
  videoDispatch,
  authDispatch,
  navigate,
  setIsLoading,
}: loadInitialDataProp) {
  const session: { userId: string } = JSON.parse(
    localStorage.getItem("session")!
  );
  const data = await getAllVideos();
  console.log(data);
  if (data.success)
    videoDispatch({ type: "LOAD_VIDEOS", payload: data.videoResult });
  else toast("Cannot connect to server.");

  if (session?.userId) {
    const userData = await userDashboard();

    if (userData!.success === false) {
      authDispatch({ type: "END_SESSION" });
      navigate("/user/login", { replace: true });
    } else authDispatch({ type: "START_SESSION", payload: userData!.user });
  }
  setIsLoading(false);
}
