import React from "react";
import VideoPlayer from "../../components/students/video/VideoPlayer";
import VideoDescription from "../../components/students/video/VideoDescription";
import Videos from "../../components/students/videos/Videos";

function CoursePlayer() {
  return (
    <section class="py-6 bg-primary">
      <div class="mx-auto max-w-7xl px-5 lg:px-0">
        <div class="grid grid-cols-3 gap-2 lg:gap-8">
          <div class="col-span-full w-full space-y-8 lg:col-span-2">
            <VideoPlayer />

            <VideoDescription />
          </div>
          <Videos />
        </div>
      </div>
    </section>
  );
}

export default CoursePlayer;
