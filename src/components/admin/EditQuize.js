import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "@mantine/core";
import {
  useAddQuizeMutation,
  useGetQuizeQuery,
} from "../../features/admin/quize/quizeApi";

import { useGetVideosQuery } from "../../features/admin/video/videoApi";
import { size } from "lodash";

function EditQuize() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: videos } = useGetVideosQuery();
  const { data: video } = useGetQuizeQuery(id, {
    skip: !id,
  });

  const [quizeOptions, setQuizeOptions] = useState();
  const [mutationData, setMutationData] = useState({});
  const [addQuize, { isError, isLoading, isSuccess }] = useAddQuizeMutation();
  useEffect(() => {
    const { options } = video || {};
    if (size(video)) {
      setQuizeOptions(options);
      setMutationData(video);
    }
  }, [video, setQuizeOptions, setMutationData]);

  const prepareVideos = videos?.map(({ id, title }) => ({
    id,
    value: id,
    label: title,
  }));

  const selectedRightAns = quizeOptions?.some((item) => {
    return item.isCorrect === true;
  });

  const handleChange = (type, value) => {
    setMutationData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleSelectVideo = (value) => {
    const video = videos?.find((v) => v.id === value);

    if (video) {
      setMutationData((prevState) => ({
        ...prevState,
        video_title: video.title,
        video_id: video?.id,
      }));
    }
  };

  const handleSelectOption = (type, value, id) => {
    setQuizeOptions((prev) =>
      prev?.map((item) => {
        if (type === "option" && item?.id === id) {
          return { ...item, option: value };
        }
        if (item?.id === id) {
          return { ...item, isCorrect: value };
        }
        return item;
      })
    );
  };

  const updatedMutation = { ...mutationData, options: quizeOptions };

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuize({
      ...updatedMutation,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/quizes");
    }
  }, [isSuccess, navigate]);
  return (
    <section className="">
      <div className="mx-auto max-w-lg px-5 lg:px-0">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Add A Quize
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="mb-1">Question</label>
              <input
                value={mutationData?.question}
                onChange={(e) => handleChange("question", e.target.value)}
                id="question"
                name="question"
                type="name"
                required
                className="add-input rounded-t-md"
                placeholder="question"
              />
            </div>

            <Select
              label="Video"
              value={mutationData?.video_title}
              data={prepareVideos || []}
              onChange={handleSelectVideo}
              searchable
              clearable
              nothingFound="No options"
              required
            />

            <div className="quize-options">
              {quizeOptions?.map((option) => {
                const { id, option: value, isCorrect } = option;

                return (
                  <div className="option">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                      required={!selectedRightAns}
                      checked={isCorrect}
                      onChange={(e) =>
                        handleSelectOption("", e.target.checked, id)
                      }
                    />
                    <input
                      type="text"
                      name="option"
                      value={value}
                      required
                      onChange={(e) =>
                        handleSelectOption("option", e.target.value, id)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Add Quize
            </button>
          </div>
          {isError && <p>There was an error adding the Quizes</p>}
        </form>
      </div>
    </section>
  );
}

export default EditQuize;
