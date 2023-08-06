export const getIsAuth = () => {
  const session =
    typeof window !== "undefined" ? window.localStorage.getItem("session") : "";

  console.log("SEssion: ", session);

  return session;
};
