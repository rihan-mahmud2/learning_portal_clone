import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditAssignmentMutation,
  useGetAssignmentQuery,
} from "../../features/admin/assignment/assignmentApi";

function EditAssignment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: assignment, isLoading: isLoading1 } = useGetAssignmentQuery(id);
  const [title, setTitle] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [videoId, setVideoId] = useState("");
  useEffect(() => {
    const { title, video_title, totalMark, video_id } = assignment || {};
    setTitle(title);
    setVideoTitle(video_title);
    setTotalMark(totalMark);
    setVideoId(video_id);
  }, [assignment]);

  console.log(title, videoTitle);
  const [editAssignment, { isError, isLoading, isSuccess }] =
    useEditAssignmentMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    editAssignment({
      id,
      data: {
        id: id,
        title,
        video_id: videoId,
        video_title: videoTitle,
        totalMark,
      },
    });
  };

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
            Edit Assignment
          </h2>
        </div>
        {isLoading1 ? (
          <p>"Data is loading"</p>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="mb-1">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  name="title"
                  type="name"
                  required
                  className="add-input rounded-t-md"
                  placeholder="Title"
                />
              </div>

              <div>
                <label className="mb-1">video_title</label>
                <input
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  id="name"
                  name="name"
                  type="name"
                  required
                  className="add-input rounded-t-md"
                  placeholder="Video-Title"
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
            </div>

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Edit Assignment
              </button>
            </div>
            {isError && <p>There was an error adding the video</p>}
          </form>
        )}
      </div>
    </section>
  );
}

export default EditAssignment;
