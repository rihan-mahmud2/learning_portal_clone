export const getAssigments = (data) => {
  const filteredMarks = data?.reduce((accmulate, currentValue) => {
    const { student_id, student_name, mark } = currentValue;

    const existingStudent = accmulate.some(
      (item) => item.student_id === currentValue.student_id
    );

    if (!existingStudent) {
      return [
        ...accmulate,
        {
          student_id: student_id,
          student_name: student_name,
          assignementMarks: mark,
        },
      ];
    }

    return accmulate.map((item) => {
      if (item?.student_id === student_id) {
        return {
          ...item,
          assignementMarks: item?.assignementMarks + mark,
        };
      }

      return item;
    });
  }, []);

  return filteredMarks;
};

export const getQuizeMarks = (data) => {
  const filteredQuizeMarks = data?.reduce((accmulate, current) => {
    const { student_id, student_name, mark } = current;
    const existingStudent = accmulate.some(
      (item) => item?.student_id === current?.student_id
    );
    if (!existingStudent) {
      return [
        ...accmulate,
        {
          student_id: student_id,
          student_name: student_name,
          quizeMarks: mark,
        },
      ];
    }
    return accmulate.map((item) => {
      if (item?.student_id === student_id) {
        return {
          ...item,
          quizeMarks: item?.quizeMarks + mark,
        };
      }
      return item;
    });
  }, []);
  return filteredQuizeMarks;
};
