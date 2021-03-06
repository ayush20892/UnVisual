import axios from "axios";
axios.defaults.withCredentials = true;

const { REACT_APP_BACKEND_URL } = process.env;

export const getAllVideos = async () => {
  try {
    const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/getAllVideos`, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addToComment = async (comment: string, videoId: string) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/video/comment`,
      data: {
        comment: comment,
        videoId: videoId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteFromComment = async (commentId: string, videoId: string) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${REACT_APP_BACKEND_URL}/video/comment`,
      data: {
        commentId: commentId,
        videoId: videoId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const increaseViewCount = async (videoId: string) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/increaseLike`,
      data: {
        videoId: videoId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
