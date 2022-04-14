import axios from "axios";
axios.defaults.withCredentials = true;

const { REACT_APP_BACKEND_URL } = process.env;

export const getAllSinglePlaylist = async () => {
  try {
    const {
      data: { success, singlePlaylist },
    } = await axios.get(`${REACT_APP_BACKEND_URL}/user/singlePlaylist`, {
      withCredentials: true,
    });
    return { success, singlePlaylist };
  } catch (err) {
    console.log(err);
  }
};

export const addToSinglePlaylist = async (
  playlistId: string,
  videoId: string
) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/user/singlePlaylist`,
      data: {
        playlistId: playlistId,
        videoId: videoId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteFromSinglePlaylist = async (
  playlistId: string,
  videoId: string
) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${REACT_APP_BACKEND_URL}/user/singlePlaylist`,
      data: {
        playlistId: playlistId,
        videoId: videoId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
