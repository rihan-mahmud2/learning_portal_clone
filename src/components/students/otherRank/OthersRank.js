import React from "react";
import Tbody from "./Tbody";

function OthersRank() {
  return (
    <div class="my-8">
      <h3 class="text-lg font-bold">Top 20 Result</h3>
      <table class="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr class="border-b border-slate-600/50">
            <th class="table-th !text-center">Rank</th>
            <th class="table-th !text-center">Name</th>
            <th class="table-th !text-center">Quiz Mark</th>
            <th class="table-th !text-center">Assignment Mark</th>
            <th class="table-th !text-center">Total</th>
          </tr>
        </thead>

        <Tbody />
      </table>
    </div>
  );
}

export default OthersRank;
