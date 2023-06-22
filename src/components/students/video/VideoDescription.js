import React from "react";
import { Link } from "react-router-dom";

import { useGetQuizeByVideoIdQuery } from "../../../features/admin/quize/quizeApi";
import { Button, Group } from "@mantine/core";
import AddAssignment from "../AddAssignment";
import { useDisclosure } from "@mantine/hooks";
import { useGetAssignmentByVideoIdQuery } from "../../../features/admin/assignment/assignmentApi";

function VideoDescription({ video }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { title, description, createdAt, id } = video || {};
  const { data: quizzes } = useGetQuizeByVideoIdQuery(id);
  const { data: assignment } = useGetAssignmentByVideoIdQuery(id);

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
        {title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on {createdAt}
      </h2>

      <div className="flex gap-4">
        <AddAssignment
          title={title}
          opened={opened}
          open={open}
          close={close}
          assignment={assignment}
        />

        {assignment?.length > 0 && (
          <Group position="center">
            <Button
              className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              onClick={open}
            >
              এসাইনমেন্ট
            </Button>
          </Group>
        )}

        {quizzes?.length > 0 && (
          <Link
            to={`/quizze/${id}`}
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            কুইজে অংশগ্রহণ করুন
          </Link>
        )}
      </div>
      <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
    </div>
  );
}

export default VideoDescription;
