import React, { useEffect } from "react";
import { useGetQuizeByVideoIdQuery } from "../../features/admin/quize/quizeApi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/admin/video/videoApi";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddQuizeMarkMutation,
  useGetQuizeMarkQuery,
} from "../../features/student/quizMark/quizMarkApi";
import { isEqual, size } from "lodash";
import {
  changedAnswer,
  getQuestions,
} from "../../features/student/quizMark/quizMarkSlice";

function Quize() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: videoId } = useParams();
  const { quizeAndAnswer } = useSelector((state) => state);
  const { user } = useSelector((state) => state.auth);

  const { data: quizMark } = useGetQuizeMarkQuery(
    { sid: user?.id, vid: videoId },
    {
      skip: !videoId,
    }
  );

  const [addMark, { isLoading: isQuizMakAdding }] = useAddQuizeMarkMutation();
  const { data: video } = useGetVideoQuery(videoId);
  const {
    data: quizzes,
    isLoading,
    isError,
  } = useGetQuizeByVideoIdQuery(videoId);

  useEffect(() => {
    if (size(quizMark)) {
      navigate("/leader", {
        replace: true,
      });
    }
  }, [quizMark, navigate]);

  useEffect(() => {
    if (size(quizzes)) {
      dispatch(getQuestions(quizzes));
    }
  }, [quizzes, dispatch]);

  //let decide what to render

  const calculateTotalMark = () => {
    let mark = 0;
    let totalMark = 0;
    let totalCorrect = 0;
    let totalWrong = 0;

    quizeAndAnswer.forEach((question) => {
      const correctIndexs = [];
      const checkedIndexs = [];

      question.options.map((option, optionIndex) => {
        if (option?.isCorrect) correctIndexs.push(optionIndex);
        if (option?.checked) checkedIndexs.push(optionIndex);
      });

      if (isEqual(correctIndexs, checkedIndexs)) {
        mark += 5;
        totalCorrect++;
      } else {
        totalWrong++;
      }
      totalMark += 5;
    });
    return { mark, totalCorrect, totalWrong, totalMark };
  };

  const handleSubmit = () => {
    const { video_id, video_title } = quizeAndAnswer[0];

    const updatedData = {
      student_name: user?.name,
      student_id: user?.id,
      video_id,
      video_title,
      totalQuiz: size(quizeAndAnswer),
      ...calculateTotalMark(),
    };

    if (size(updatedData)) {
      addMark(updatedData)
        .unwrap()
        .then((res) => {
          navigate("/leader", { replace: true });
        });
    }
  };

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Quizzes for {video?.title}</h1>
          <p className="text-sm text-slate-200">
            Each question contains 5 Mark
          </p>
        </div>
        <div className="space-y-8 ">
          {quizeAndAnswer?.map((quize, questionIndex) => {
            const { question, options } = quize;
            return (
              <div className="quiz">
                <h4 className="question">
                  Quiz - {questionIndex + 1} {question}
                </h4>
                <form className="quizOptions">
                  {options?.map((option, optionIndex) => {
                    const { option: questionOption, id, checked } = option;
                    return (
                      <label>
                        <input
                          checked={checked}
                          onChange={(e) => {
                            dispatch(
                              changedAnswer({
                                questionIndex,
                                optionIndex,
                                value: e.target.value,
                              })
                            );
                          }}
                          type="checkbox"
                          id={id}
                        />
                        {questionOption}
                      </label>
                    );
                  })}
                </form>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
        >
          Submit
        </button>
      </div>
    </section>
  );
}

export default Quize;
