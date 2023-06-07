import React from "react";
import AssignmentMarkTrow from "../../components/admin/AssignmentMarkTrow";

function AssignmentMark() {
  return (
    <section class="py-6 bg-primary">
      <div class="mx-auto max-w-full px-5 lg:px-20">
        <div class="px-3 py-20 bg-opacity-10">
          <ul class="assignment-status">
            <li>
              Total <span>4</span>
            </li>
            <li>
              Pending <span>3</span>
            </li>
            <li>
              Mark Sent <span>1</span>
            </li>
          </ul>
          <div class="overflow-x-auto mt-4">
            <table class="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th class="table-th">Assignment</th>
                  <th class="table-th">Date</th>
                  <th class="table-th">Student Name</th>
                  <th class="table-th">Repo Link</th>
                  <th class="table-th">Mark</th>
                </tr>
              </thead>

              <tbody class="divide-y divide-slate-600/50">
                <AssignmentMarkTrow />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AssignmentMark;
