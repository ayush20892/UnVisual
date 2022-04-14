const shuffleArray = (videos) => {
  for (var i = videos.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = videos[i];
    videos[i] = videos[j];
    videos[j] = temp;
  }

  return videos;
};

module.exports = shuffleArray;
