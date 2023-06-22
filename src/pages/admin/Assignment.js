import React from "react";
import { useGetAssignmentsQuery } from "../../features/admin/assignment/assignmentApi";
import AssignmentMarkTrow from "../../components/admin/AssignmentMarkTrow";
import { Link } from "react-router-dom";

function Assignment() {
  const { data: assignments, isLoading, isError } = useGetAssignmentsQuery();

  let content = null;

  if (isLoading) {
    content = <p>The content is Loading......</p>;
  }

  if (!isLoading && isError) {
    content = <p>There was an error loading the videos</p>;
  }

  if (!isError && !isLoading && assignments?.length === 0) {
    content = <p>There was no video found</p>;
  }
  if (!isError && !isLoading && assignments?.length > 0) {
    content = assignments?.map((assignment) => (
      <AssignmentMarkTrow key={assignment.id} assignment={assignment} />
    ));
  }

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <Link to={"/admin/addAssignment"} className="btn ml-auto">
              Add Assignment
            </Link>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Title</th>
                  <th className="table-th">Video Title</th>
                  <th className="table-th">Mark</th>
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

export default Assignment;
