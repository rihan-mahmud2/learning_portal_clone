import React from "react";
import QuizeRow from "../../components/admin/QuizeRow";
import { Link } from "react-router-dom";
import { useGetQuizesQuery } from "../../features/admin/quize/quizeApi";

function AdminQuize() {
  const { data: quizes, isLoading, isError } = useGetQuizesQuery();

  let content = null;

  if (isLoading) {
    content = <p>The content is Loading......</p>;
  }

  if (!isLoading && isError) {
    content = <p>There was an error loading the videos</p>;
  }

  if (!isError && !isLoading && quizes?.length === 0) {
    content = <p>There was no video found</p>;
  }
  if (!isError && !isLoading && quizes?.length > 0) {
    content = quizes?.map((quize) => (
      <QuizeRow key={quizes.id} quize={quize} />
    ));
  }

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <Link to={`/admin/addQuize`} className="btn ml-auto">
              Add Quiz
            </Link>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Question</th>
                  <th className="table-th">Video</th>
                  <th className="table-th justify-center">Action</th>
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

export default AdminQuize;
