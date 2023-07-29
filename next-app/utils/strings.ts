export const getLastWordString = (string: string) => {
  var n = string.split(" ");
  const lastWord = n.splice(n.length - 1, 1).join("");
  const rest = n.join(" ");

  return [rest, lastWord];
};
