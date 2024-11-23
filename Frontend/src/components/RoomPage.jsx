import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";
import { IoMdArrowRoundBack } from "react-icons/io";


export default function RoomPage() {
  const { roomKey } = useParams();
  const { state } = useLocation();
  const creator = state?.creator || state?.username;
  const Topic=state?.topic;

  const [time, setTime] = useState(0); // Timer in seconds
  const [isPomodoroRunning, setPomodoroRunning] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState(25); // Default 25 minutes
  const meetingContainerRef = useRef(null);
  const[sessioncount,setSessionCount] = useState(0);

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

  // Timer Logic
  useEffect(() => {
    let timer;
    if (isPomodoroRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0 && isPomodoroRunning) {
      setPomodoroRunning(false);
      // incrementing sessioncount
      setSessionCount((prev) => prev + 1);
      alert("Time's up! Take a break.");
    }
    return () => clearInterval(timer);
  }, [isPomodoroRunning, time]);

  const startPomodoro = () => {
    setTime(selectedMinutes * 60); // Set the timer based on selected minutes
    setPomodoroRunning(true);
  };

  const pausePomodoro = () => {
    setPomodoroRunning(false);
  };

  const resetPomodoro = () => {
    setPomodoroRunning(false);
    setTime(0);
  };

  const handleTimeSelection = (minutes) => {
    setSelectedMinutes(minutes);
    setTime(minutes * 60); // Update timer display immediately
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomKey);
    alert("Room key copied to clipboard!");
  };

  const enterFullscreen = () => {
    if (meetingContainerRef.current.requestFullscreen) {
      meetingContainerRef.current.requestFullscreen();
    } else if (meetingContainerRef.current.webkitRequestFullscreen) {
      meetingContainerRef.current.webkitRequestFullscreen();
    } else if (meetingContainerRef.current.msRequestFullscreen) {
      meetingContainerRef.current.msRequestFullscreen();
    }
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
        <div className="flex flex-col px-3 rounded-lg w-full leading-none ">
          {/* Pomodoro Timer and Room Key , Progress, Notes Section */}
          <div className="flex justify-between items-center w-full mb-6 ">
            {/* Pomodoro Timer */}
            <div className="flex flex-col items-start text-white  rounded-lg w-1/5 h-1/3 max-sm:w-7">
              <h2 className="text-xl font-semibold pl-7">Pomodoro Timer</h2>

              {/* Timer Display */}
              <p
                className="mt-2 text-6xl font-bold bg-black rounded-lg ml-2 py-4 px-8 w-50"
                style={{ fontFamily: "Digital, monospace" }}
              >
                {Math.floor(time / 60).toString().padStart(2, "0")}:
                {(time % 60).toString().padStart(2, "0")}
              </p>

              {/* Time Options */}
              <div className="flex space-x-3 ml-4 mt-2">
                {[10, 15, 25, 60].map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => handleTimeSelection(minutes)}
                    className={`  py-3 px-3 rounded-full ${
                      selectedMinutes === minutes
                        ? "bg-red-500 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {minutes} 
                  </button>
                ))}
              </div>

              {/* Timer Controls */}
              <div className="flex space-x-4 mt-4 pl-2">
                {isPomodoroRunning ? (
                  <button
                    onClick={pausePomodoro}
                    className="bg-white text-[#00334D] py-1 px-6 rounded-lg"
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={startPomodoro}
                    className="bg-white text-[#00334D] py-1 px-6 rounded-lg ml-2"
                  >
                    Start
                  </button>
                )}
                <button
                  onClick={resetPomodoro}
                  className="bg-gray-700 text-white py-1 px-6 rounded-lg"
                >
                  Reset
                </button>
              </div>
              <div className=" pt-4 pl-4 ">Sessions Completed:{sessioncount}</div>
            </div>
            {/* {PROGRESS SECTION} */}
            <div className="bg-red-800 h-1/3">d</div>

            {/* Room Key */}
           
          
            <div className="flex flex-col items-end text-white  rounded-lg w-1/3">
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
<hr />

<div className=" text-center w-full font-bold m-3 size-4 ">TOPIC: {Topic}</div>
<hr />
          {/* Video Conference Container */}
          <div className="relative w-full h-[400px]">
            <div ref={meetingContainerRef} className="w-full h-full"></div>

            {/* Full-screen Button */}
            <button
              onClick={enterFullscreen}
              className="absolute top-4 right-4 text-white bg-[#00334D] py-2 px-4 rounded-md z-10"
            >
              ⛶ Full Screen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
