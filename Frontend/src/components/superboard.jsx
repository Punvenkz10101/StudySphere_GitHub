import { ZegoSuperBoard } from "zego-superboard-sdk";

const initSuperBoard = async () => {
  const superBoard = new ZegoSuperBoard();

  await superBoard.init({
    appID: YOUR_APP_ID, // ZegoCloud's App ID
    serverSecret: YOUR_SERVER_SECRET, // ZegoCloud's Secret
  });

  return superBoard;
};
