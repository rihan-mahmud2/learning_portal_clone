import React, { useEffect, useState } from "react";
import { useGetQuizeMarksQuery } from "../../features/student/quizMark/quizMarkApi";
import { size } from "lodash";
import { useGetAssignmentMarksQuery } from "../../features/student/assignmentMark/assignmentMarkApi";
import { getAssigments, getQuizeMarks } from "../../utils/appHelper";
import { useSelector } from "react-redux";
const currentUserData = {
  assignementMarks: 0,
  quizMarks: 0,
  obtainedMarks: 0,
};

function Leaderboard() {
  const { user } = useSelector((state) => state);
  const { data: quizMarks, isSuccess: isSuccess1 } = useGetQuizeMarksQuery();
  const { data: assignmentMarks, isSuccess: isSuccess2 } =
    useGetAssignmentMarksQuery();

  const [currentUserInfo, setCurrentUserInfo] = useState(currentUserData);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      (isSuccess1 && isSuccess2 && size(quizMarks)) ||
      size(assignmentMarks)
    ) {
      const quizeAssignmentMark = [
        ...getQuizeMarks(quizMarks),
        ...getAssigments(assignmentMarks),
      ];

      if (size(quizeAssignmentMark)) {
        const mergedAssignmentAndQuizeMarks = quizeAssignmentMark?.reduce(
          (accumulate, curr) => {
            const existingStudent = accumulate.some(
              (item) => item.student_id === curr.student_id
            );

            if (!existingStudent) {
              return [...accumulate, curr];
            }

            return accumulate.map((item) => {
              if (item.student_id === curr.student_id) {
                Object.assign(item, curr);
              }
              return item;
            });
          },
          []
        );

        if (size(mergedAssignmentAndQuizeMarks)) {
          let rank = 0;
          const preparedMarks = mergedAssignmentAndQuizeMarks
            ?.map((item) => {
              return {
                ...item,
                obtainedMarks:
                  (item?.assignementMarks || 0) + (item?.quizeMarks || 0),
              };
            })
            ?.sort((a, b) => b.obtainedMarks - a.obtainedMarks)
            ?.reduce((acc, cur) => {
              const sameRankEl = acc.find(
                (item) => item?.obtainedMarks === cur?.obtainedMarks
              );

              if (!size(sameRankEl)) {
                rank++;
                return [...acc, { rank, ...cur }];
              }

              return [...acc, { rank: sameRankEl?.rank, ...cur }];
            }, []);

          if (size(preparedMarks)) {
            const currentUser = preparedMarks?.find(
              (std) => std.id === user?.id
            );

            const others = preparedMarks.filter(
              (ot) => ot.student_id !== currentUser.student_id
            );
            console.log(others);

            if (size(currentUser)) {
              setCurrentUserInfo(currentUser);
              setStudents(others);
            }
          } else {
            const lastStudent = preparedMarks.slice(-1)[0];
            const userRank =
              lastStudent?.obtainedMarks > 0
                ? lastStudent?.rank + 1
                : lastStudent?.rank;
            setCurrentUserInfo((prev) => ({ rank: userRank, ...prev }));
            setStudents([
              ...preparedMarks,
              {
                rank: userRank,
                student_id: user?.id,
                student_name: user?.name,
                ...currentUserData,
              },
            ]);
          }
        }
      }
    }
  }, [isSuccess1, isSuccess2, quizMarks, assignmentMarks]);

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div>
          <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
          <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
            <thead>
              <tr>
                <th className="table-th !text-center">Rank</th>
                <th className="table-th !text-center">Name</th>
                <th className="table-th !text-center">Quiz Mark</th>
                <th className="table-th !text-center">Assignment Mark</th>
                <th className="table-th !text-center">Total</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-2 border-cyan">
                <td className="table-td text-center font-bold">
                  {currentUserInfo?.rank}
                </td>
                <td className="table-td text-center font-bold">
                  {currentUserInfo?.student_name}
                </td>
                <td className="table-td text-center font-bold">
                  {currentUserInfo?.quizeMarks}
                </td>
                <td className="table-td text-center font-bold">
                  {currentUserInfo?.assignementMarks}
                </td>
                <td className="table-td text-center font-bold">
                  {currentUserInfo?.obtainedMarks}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-8">
          <h3 className="text-lg font-bold">Top 20 Result</h3>
          <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
            <thead>
              <tr className="border-b border-slate-600/50">
                <th className="table-th !text-center">Rank</th>
                <th className="table-th !text-center">Name</th>
                <th className="table-th !text-center">Quiz Mark</th>
                <th className="table-th !text-center">Assignment Mark</th>
                <th className="table-th !text-center">Total</th>
              </tr>
            </thead>

            <tbody>
              {students?.slice(0, 20)?.map((std) => {
                const {
                  rank,
                  quizeMarks,
                  assignementMarks,
                  obtainedMarks,
                  student_name,
                } = std || {};

                return (
                  <tr className="border-b border-slate-600/50">
                    <td className="table-td text-center">{rank}</td>
                    <td className="table-td text-center">{student_name}</td>
                    <td className="table-td text-center">{quizeMarks}</td>
                    <td className="table-td text-center">{assignementMarks}</td>
                    <td className="table-td text-center">{obtainedMarks}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;
