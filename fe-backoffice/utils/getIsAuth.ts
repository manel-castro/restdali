export const getIsAuth = () => {
  const session =
    typeof window !== "undefined" ? window.localStorage.getItem("session") : "";

  return session;
};
