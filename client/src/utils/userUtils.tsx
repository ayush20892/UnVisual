import { AuthInitialStateType, videoType } from "./types";

export const CheckInList = (list: videoType[], value: string) => {
  if (list.length === 0) return false;
  const videoPresent = list.find((item: videoType) => item._id === value);
  return videoPresent ? true : false;
};

export const GetList = (authState: AuthInitialStateType, value: string) => {
  const { watchLater, likedVideos, history } = authState;
  if (value === "watchLater") return watchLater;
  else if (value === "likedVideos") return likedVideos;
  else return history;
};

export const categoryFilter = (videos: videoType[], categoryState: string) => {
  if (categoryState === "All") return videos;
  return videos.filter((vid) => vid.category === categoryState);
};

export const searchFilter = (videos: videoType[], searchInput: string) => {
  if (searchInput === "") return videos;
  return videos.filter((vid) =>
    vid.title.toLowerCase().includes(searchInput.toLowerCase())
  );
};

export function utilHeader(isMobile: boolean, pathName: string) {
  if (!isMobile) return false;
  else if (pathName.includes("/likedVideos")) return true;
  else if (pathName.includes("/history")) return true;
  else if (pathName.includes("/video/")) return true;
  else if (pathName.includes("/playlist/")) return true;
  else return false;
}

export function shuffleArray(videos: videoType[]) {
  for (var i = videos.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = videos[i];
    videos[i] = videos[j];
    videos[j] = temp;
  }

  return videos;
}

function copyLink(pathName: string) {
  navigator.clipboard.writeText(`https://enwise.netlify.app${pathName}`);
  // toast("Link Copied", {
  //     position: "bottom-right",
  //     autoClose: 2000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  // });
  // setIsLinkCopied(true);
  // setTimeout(() => {
  //     setIsLinkCopied(false);
  // }, 400);
}
