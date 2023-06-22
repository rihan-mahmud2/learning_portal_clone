import { useSelector } from "react-redux";

export const useAdmin = (type) => {
  const auth = useSelector((state) => state.auth);

  if (auth?.accessToken && auth?.user?.role === type) {
    return true;
  } else {
    return false;
  }
};
