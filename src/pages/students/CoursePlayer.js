import React from "react";
import VideoPlayer from "../../components/students/video/VideoPlayer";
import VideoDescription from "../../components/students/video/VideoDescription";
import Videos from "../../components/students/videos/Videos";
import { useSelector } from "react-redux";

function CoursePlayer() {
  const { video } = useSelector((state) => state.video);
  const { title, url } = video || {};
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            <VideoPlayer title={title} url={url} />

            <VideoDescription video={video} />
          </div>
          <Videos />
        </div>
      </div>
    </section>
  );
}

export default CoursePlayer;
