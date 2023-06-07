import React from "react";

function SelfRank() {
  return (
    <div>
      <h3 class="text-lg font-bold">Your Position in Leaderboard</h3>
      <table class="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr>
            <th class="table-th !text-center">Rank</th>
            <th class="table-th !text-center">Name</th>
            <th class="table-th !text-center">Quiz Mark</th>
            <th class="table-th !text-center">Assignment Mark</th>
            <th class="table-th !text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          <tr class="border-2 border-cyan">
            <td class="table-td text-center font-bold">4</td>
            <td class="table-td text-center font-bold">Saad Hasan</td>
            <td class="table-td text-center font-bold">50</td>
            <td class="table-td text-center font-bold">50</td>
            <td class="table-td text-center font-bold">100</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SelfRank;
