export const generateUID = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789_";
  let uid = "";
  for (let i = 0; i < 23; i++) {
    uid += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return uid;
};
