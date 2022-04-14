import axios from "axios";
axios.defaults.withCredentials = true;

const { REACT_APP_BACKEND_URL } = process.env;

export const getAllLikedVideos = async () => {
  try {
    const {
      data: { success, likedVideos },
    } = await axios.get(`${REACT_APP_BACKEND_URL}/user/likedVideos`, {
      withCredentials: true,
    });
    return { success, likedVideos };
  } catch (err) {
    console.log(err);
  }
};

export const addToLikedVideos = async (videoId: string) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/user/likedVideos`,
      data: {
        videoId: videoId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteFromLikedVideos = async (videoId: string) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${REACT_APP_BACKEND_URL}/user/likedVideos`,
      data: {
        videoId: videoId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
