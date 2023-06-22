import React from "react";
import Video from "./Video";
import { useGetVideosQuery } from "../../../features/admin/video/videoApi";
function Videos() {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <p>Videos are loading....</p>;
  }

  if (!isLoading && isError) {
    content = <p>There was an error loading the videos</p>;
  }
  if (!isLoading && !isError && videos?.length === 0) {
    content = <p>There is no video found</p>;
  }
  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => <Video key={video?.id} video={video} />);
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
}

export default Videos;
