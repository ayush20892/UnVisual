import axios from "axios";
axios.defaults.withCredentials = true;

const { REACT_APP_BACKEND_URL } = process.env;

export const getAllPlaylist = async () => {
  try {
    const {
      data: { success, playlist },
    } = await axios.get(`${REACT_APP_BACKEND_URL}/user/playlist`, {
      withCredentials: true,
    });
    return { success, playlist };
  } catch (err) {
    console.log(err);
  }
};

export const createPlaylist = async (playlistName: string) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/user/playlist`,
      data: {
        playlistName: playlistName,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deletePlaylist = async (playlistId: string) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${REACT_APP_BACKEND_URL}/user/playlist`,
      data: {
        playlistId: playlistId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
