import React from "react";
import TableRow from "../../components/admin/TableRow";

function Video() {
  return (
    <section class="py-6 bg-primary">
      <div class="mx-auto max-w-full px-5 lg:px-20">
        <div class="px-3 py-20 bg-opacity-10">
          <div class="w-full flex">
            <button class="btn ml-auto">Add Video</button>
          </div>
          <div class="overflow-x-auto mt-4">
            <table class="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th class="table-th">Video Title</th>
                  <th class="table-th">Description</th>
                  <th class="table-th">Action</th>
                </tr>
              </thead>

              <tbody class="divide-y divide-slate-600/50">
                <TableRow />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Video;
