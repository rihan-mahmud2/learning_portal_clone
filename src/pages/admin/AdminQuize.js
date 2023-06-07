import React from "react";
import QuizeRow from "../../components/admin/QuizeRow";

function AdminQuize() {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <button className="btn ml-auto">Add Quiz</button>
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

              <tbody className="divide-y divide-slate-600/50">
                <QuizeRow />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminQuize;
