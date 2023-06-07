import React from "react";
import SelfRank from "../../components/students/selfRank/SelfRank";
import OthersRank from "../../components/students/otherRank/OthersRank";

function Leaderboard() {
  return (
    <section class="py-6 bg-primary">
      <div class="mx-auto max-w-7xl px-5 lg:px-0">
        <SelfRank />

        <OthersRank />
      </div>
    </section>
  );
}

export default Leaderboard;
