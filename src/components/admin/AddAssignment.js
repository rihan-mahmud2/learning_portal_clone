import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddAssignmentMutation } from "../../features/admin/assignment/assignmentApi";
import { useGetVideosQuery } from "../../features/admin/video/videoApi";

function AddAssignment() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [addAssignment, { isError, isLoading, isSuccess }] =
    useAddAssignmentMutation();
  const { data: videos } = useGetVideosQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    addAssignment({
      title,
      video_id: Number(videoTitle.slice(0, 1)),
      video_title: videoTitle,
      totalMark,
    });
  };

  console.log(videoTitle);

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/assignment");
    }
  }, [isSuccess, navigate]);

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Add An Assignment
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="mb-1">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="name"
                name="name"
                type="name"
                required
                className="add-input rounded-t-md"
                placeholder="Title"
              />
            </div>

            <div>
              <label className="mb-1">Total Mark</label>
              <input
                value={totalMark}
                onChange={(e) => setTotalMark(e.target.value)}
                id="name"
                name="name"
                type="name"
                required
                className="add-input rounded-t-md"
                placeholder="Total Mark"
              />
            </div>
            <div>
              <label className="mb-1">Choose A Video</label>

              <select
                selected={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                required
                className="add-input rounded-t-md"
                name="assignmentVideo"
                id="assignmentVideo"
              >
                <option>Select Video</option>

                {videos?.map((video) => (
                  <option value={video?.title}>{video?.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Add Assignment
            </button>
          </div>
          {isError && <p>There was an error adding the video</p>}
        </form>
      </div>
    </section>
  );
}

export default AddAssignment;
