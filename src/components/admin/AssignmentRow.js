import React from "react";

function AssignmentRow() {
  return (
    <tr>
      <td class="table-td">Assignment 1 - Implement Debounce Function</td>
      <td class="table-td">10 Mar 2023 10:58:13 PM</td>
      <td class="table-td">Saad Hasan</td>
      <td class="table-td">https://github.com/Learn-with-Sumit/assignment-1</td>
      <td class="table-td input-mark">
        <input max="100" value="100" />
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </td>
    </tr>
  );
}

export default AssignmentRow;
