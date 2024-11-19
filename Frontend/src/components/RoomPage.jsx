import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";

export default function RoomPage() {
  const { roomKey } = useParams();
  const [isPomodoroRunning, setPomodoroRunning] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const meetingContainerRef = useRef(null);

  useEffect(() => {
    const appId = 1876705794;
    const serverSecret = "99cf0d1e05d48b4324ddc3e28a03301f";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomKey,
      uuidv4(),
      "StudySphere USER"
    );

    const ui = ZegoUIKitPrebuilt.create(kitToken);

    ui.joinRoom({
      container: meetingContainerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  }, [roomKey]);

  useEffect(() => {
    let timer;
    if (isPomodoroRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    }
    if (time === 0) {
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
          {/* Pomodoro Timer and Copy Room Key Section */}
          <div className="pomodoro-copy-section  flex justify-between items-center w-full mb-6">
            {/* Pomodoro Timer Section */}
            <div className="pomodoro-timer flex flex-col items-start  text-white p-4 rounded-lg w-1/3">
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

            {/* Copy Room Key Section */}
            <div className="copy-room-key flex flex-col items-end  text-white p-4 rounded-lg w-1/3">
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
          <div className="h-full w-full">
            <div
              ref={meetingContainerRef}
              className="w-full h-[500px]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

