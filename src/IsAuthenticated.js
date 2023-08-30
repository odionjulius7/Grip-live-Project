import { useSelector } from "react-redux";

function useIsAuthenticated() {
  const userData = useSelector((state) => state.auth.user);
  const token = userData?.data?.token;
  const isAuthenticated = !!token; // Convert token to a boolean value
  return isAuthenticated;
}

export default useIsAuthenticated;
