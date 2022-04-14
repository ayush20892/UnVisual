import axios from "axios";
axios.defaults.withCredentials = true;

const { REACT_APP_BACKEND_URL } = process.env;

export const getAllHistory = async () => {
  try {
    const {
      data: { success, history },
    } = await axios.get(`${REACT_APP_BACKEND_URL}/user/history`, {
      withCredentials: true,
    });
    return { success, history };
  } catch (err) {
    console.log(err);
  }
};

export const addToHistory = async (videoId: string) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/user/history`,
      data: {
        videoId: videoId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteFromHistory = async (videoId: string) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${REACT_APP_BACKEND_URL}/user/history`,
      data: {
        videoId: videoId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const clearAllHistory = async () => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${REACT_APP_BACKEND_URL}/user/clearHistory`,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
