import React from "react";

function VideoPlayer() {
  return (
    <iframe
      width="100%"
      class="aspect-video"
      src="https://www.youtube.com/embed/56zUkaXJnUA"
      title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  );
}

export default VideoPlayer;
