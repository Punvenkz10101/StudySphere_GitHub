import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";

export default function RoomPage() {
  const { roomKey } = useParams();
  const { state } = useLocation();
  const creator = state?.creator || "Guest";
  const [isPomodoroRunning, setPomodoroRunning] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const meetingContainerRef = useRef(null);

  useEffect(() => {
    const appId = 1876705794;
    const serverSecret = "99cf0d1e05d48b4324ddc3e28a03301f";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomKey,
      uuidv4(),
      creator
    );

    const ui = ZegoUIKitPrebuilt.create(kitToken);
    ui.joinRoom({
      container: meetingContainerRef.current,
      scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
    });

    return () => ui.leaveRoom(); // Cleanup on unmount
  }, [roomKey, creator]);

  useEffect(() => {
    let timer;
    if (isPomodoroRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0) {
      setPomodoroRunning(false);
      alert("Time's up! Take a break.");
    }
    return () => clearInterval(timer);
  }, [isPomodoroRunning, time]);

  const startPomodoro = () => {
    setTime(25 * 60);
    setPomodoroRunning(true);
  };

  const stopPomodoro = () => setPomodoroRunning(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomKey);
    alert("Room key copied to clipboard!");
  };

  const toggleOverlay = () => setOverlayVisible((prev) => !prev);

  return (
    <div
      className="room-page flex flex-col items-center justify-center min-h-screen w-full text-white"
      style={{
        backgroundImage: `url('/Night5.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="content-wrapper flex flex-col items-center justify-center h-full w-full">
        <div className="flex flex-col p-6 bg-[#001d2e]/75 rounded-lg w-full">
          {/* Pomodoro Timer and Room Key Section */}
          <div className="flex justify-between items-center w-full mb-6">
            {/* Pomodoro Timer */}
            <div className="flex flex-col items-start text-white p-4 rounded-lg w-1/3">
              <h2 className="text-xl font-semibold">Pomodoro Timer</h2>
              <p className="mt-2 text-4xl font-bold">
                {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
              </p>
              {isPomodoroRunning ? (
                <button
                  onClick={stopPomodoro}
                  className="bg-white text-[#00334D] py-1 px-6 mt-4 rounded-lg"
                >
                  Stop
                </button>
              ) : (
                <button
                  onClick={startPomodoro}
                  className="bg-white text-[#00334D] py-1 px-6 mt-4 rounded-lg"
                >
                  Start 25-Minute Timer
                </button>
              )}
            </div>

            {/* Room Key */}
            <div className="flex flex-col items-end text-white p-4 rounded-lg w-1/3">
              <h2 className="text-xl font-semibold">Room Key</h2>
              <p className="text-sm mb-2">Share this key to invite others.</p>
              <button
                onClick={copyToClipboard}
                className="bg-white text-[#00334D] py-1 px-6 rounded-lg"
              >
                Copy Room Key
              </button>
            </div>
          </div>

          {/* Video Conference Container */}
          <div className="relative w-full h-[500px]">
            <div ref={meetingContainerRef} className="w-full h-full"></div>

            {/* Full-screen Overlay */}
            {isOverlayVisible && (
              <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <button
                  onClick={toggleOverlay}
                  className="text-white text-xl bg-[#00334D] py-2 px-4 rounded-md"
                >
                  Close Overlay
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
