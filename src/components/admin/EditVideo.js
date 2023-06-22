import React, { useEffect, useState } from "react";
import {
  useEditVideoMutation,
  useGetVideoQuery,
} from "../../features/admin/video/videoApi";
import { useNavigate, useParams } from "react-router-dom";

function EditVideo() {
  const { id } = useParams();
  const { data: video } = useGetVideoQuery(id);

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [editVideo, { isError, isLoading, isSuccess }] = useEditVideoMutation();

  useEffect(() => {
    const { title, url, views, duration, description, createdAt } = video || {};
    setTitle(title);
    setUrl(url);
    setViews(views);
    setDuration(duration);
    setDescription(description);
    setDate(createdAt);
  }, [video]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editVideo({
      id,
      data: {
        title,
        views,
        duration,
        description,
        createdAt: date,
        url,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/video");
    }
  }, [isSuccess, navigate]);

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Add a brand new Video for learning
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
              <label className="mb-1">Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="name"
                name="name"
                type="name"
                required
                className="add-input rounded-t-md"
                placeholder="Description"
              />
            </div>
            <div>
              <label className="mb-1">Duration</label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                id="name"
                name="name"
                type="name"
                required
                className="add-input rounded-t-md"
                placeholder="Duration"
              />
            </div>
            <div>
              <label className="mb-1">Url</label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                id="name"
                name="name"
                type="name"
                required
                className="add-input rounded-t-md"
                placeholder="Video-Url"
              />
            </div>
            <div>
              <label className="mb-1">Views</label>
              <input
                value={views}
                onChange={(e) => setViews(e.target.value)}
                id="name"
                name="name"
                type="name"
                required
                className="add-input rounded-t-md"
                placeholder="Views"
              />
            </div>
            <div>
              <label className="mb-1">Created Date</label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                id="name"
                name="name"
                type="date"
                required
                className="add-input rounded-t-md"
                placeholder="Duration"
              />
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Add Video
            </button>
          </div>
          {isError && <p>There was an error adding the video</p>}
        </form>
      </div>
    </section>
  );
}

export default EditVideo;
