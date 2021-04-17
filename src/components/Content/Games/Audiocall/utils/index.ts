export const playEnglishSound = (name: string | undefined) => {
  const audio = new Audio();
  audio.src = `https://dream-react-rslang-server.herokuapp.com/${name}`;
  audio.play();
};
