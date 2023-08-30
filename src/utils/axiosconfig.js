const getTokenFromLocalStorage = localStorage.getItem("grip")
  ? JSON.parse(localStorage.getItem("grip"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null
        ? getTokenFromLocalStorage?.data?.token
        : ""
    }`,
    Accept: "application/json",
  },
};
