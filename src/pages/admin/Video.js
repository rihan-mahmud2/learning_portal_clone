import React from "react";
import TableRow from "../../components/admin/TableRow";
import { Link } from "react-router-dom";
import { useGetVideosQuery } from "../../features/admin/video/videoApi";

function Video() {
  const { data: videos, isError, isLoading } = useGetVideosQuery();

  //decide what to render

  let content = null;

  if (isLoading) {
    content = <p>The content is Loading......</p>;
  }

  if (!isLoading && isError) {
    content = <p>There was an error loading the videos</p>;
  }

  if (!isError && !isLoading && videos?.length === 0) {
    content = <p>There was no video found</p>;
  }
  if (!isError && !isLoading && videos?.length > 0) {
    content = videos?.map((video) => <TableRow key={video.id} video={video} />);
  }

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <Link to="/admin/addVideo" className="btn ml-auto">
              Add Video
            </Link>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Video Title</th>
                  <th className="table-th">Description</th>
                  <th className="table-th">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-600/50">{content}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Video;
