import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useState } from "react";
import { useAddAssignmentMarksMutation } from "../../features/student/assignmentMark/assignmentMarkApi";
import { useSelector } from "react-redux";
import { size } from "lodash";
import moment from "moment";

const AddAssignment = ({ opened, close, assignment }) => {
  const { user } = useSelector((state) => state?.auth);
  const { name, id: student_id } = user || {};
  const [repo, setRepo] = useState("");
  const [er, setEr] = useState("");
  const [addAssignment, { isError, isLoading, isSuccess, error }] =
    useAddAssignmentMarksMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (size(assignment)) {
      const { id, video_title, totalMark } = assignment[0] || [];
      const updatedData = {
        status: "pending",
        mark: 0,
        totalMark,
        title: video_title,
        assignment_id: id,
        student_name: name,
        student_id,
        repo_link: repo,
        createdAt: moment().toISOString(),
      };

      addAssignment({ ...updatedData });

      console.log(updatedData);
    }
  };
  if (isSuccess) {
    close();
  } else if (isError) {
    setEr(error);
  }
  return (
    <>
      <Modal opened={opened} onClose={close}>
        <form onSubmit={handleSubmit}>
          <TextInput
            required
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            label="Reopsitory_Link"
            placeholder="Your Assignment repo link"
            autoComplete="off"
          />

          <Group position="center" mt="md">
            <Button disabled={isLoading} type="submit">
              Submit
            </Button>
          </Group>
        </form>
        <p>{er}</p>
      </Modal>
    </>
  );
};

export default AddAssignment;
