import axios from "axios";
axios.defaults.withCredentials = true;

const { REACT_APP_BACKEND_URL } = process.env;

export const addToWatchLater = async (videoId: string) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/user/watchLater`,
      data: {
        videoId: videoId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteFromWatchLater = async (videoId: string) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${REACT_APP_BACKEND_URL}/user/watchLater`,
      data: {
        videoId: videoId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
