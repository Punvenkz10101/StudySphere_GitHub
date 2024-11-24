import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";
import { BiTrash, BiEdit, BiFullscreen } from "react-icons/bi";

export default function RoomPage() {
  const { roomKey } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const creator = state?.creator || state?.username;
  const topic = state?.topic;
  const username = state?.username || creator;

  const [time, setTime] = useState(0);
  const [isPomodoroRunning, setPomodoroRunning] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const meetingContainerRef = useRef(null);

  useEffect(() => {
    const appId = 1876705794;
    const serverSecret = "99cf0d1e05d48b4324ddc3e28a03301f";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomKey,
      uuidv4(),
      username
    );

    const ui = ZegoUIKitPrebuilt.create(kitToken);
    ui.joinRoom({
      container: meetingContainerRef.current,
      scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
    });

    return () => ui.leaveRoom();
  }, [roomKey, username]);

  const toggleFullscreen = () => {
    const element = meetingContainerRef.current;
    if (!document.fullscreenElement) {
      element?.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const startPomodoro = () => {
    setTime(selectedMinutes * 60);
    setPomodoroRunning(true);
  };

  const resetPomodoro = () => {
    setPomodoroRunning(false);
    setTime(0);
  };

  const addTask = () => {
    if (currentTask.trim()) {
      if (editingTaskId !== null) {
        setTasks((prevTasks) =>
          prevTasks.map((task, index) =>
            index === editingTaskId ? currentTask : task
          )
        );
        setEditingTaskId(null);
      } else {
        setTasks((prev) => [...prev, currentTask]);
      }
      setCurrentTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomKey);
    alert("Room key copied to clipboard!");
  };

  const leaveRoom = () => {
    navigate("/");
  };

  return (
    <div
      className="room-page flex flex-col items-center min-h-screen w-full text-white"
      style={{
        backgroundImage: `url('/Night5.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar */}
      <nav className="w-full bg-[#001022]/50 p-4 text-center text-lg font-bold">
        {topic || "Study Room"}
      </nav>

      {/* Main Content */}
      <div className="content-wrapper grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 w-full h-full">
        {/* To-Do Section */}
        <div className="bg-[#001022]/50 p-4 rounded-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-4">To-Do List</h2>
          <div className="space-y-2">
            <input
              type="text"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              placeholder="Add a new task"
              className="w-full p-2 bg-gray-700 rounded-md"
            />
            <button
              onClick={addTask}
              className="bg-green-500 text-white py-2 px-4 rounded-lg w-full"
            >
              {editingTaskId !== null ? "Edit Task" : "Add Task"}
            </button>
          </div>
          <ul className="mt-4 space-y-2 overflow-y-auto">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-700 p-2 rounded-lg"
              >
                <span>{task}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => setCurrentTask(task)}
                    className="text-blue-500"
                  >
                    <BiEdit />
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="text-red-500"
                  >
                    <BiTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pomodoro Timer */}
        <div className="bg-[#001022]/50 p-4 rounded-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold">Pomodoro Timer</h2>
          <div className="text-4xl font-bold mt-4">
            {Math.floor(time / 60)
              .toString()
              .padStart(2, "0")}
            :{(time % 60).toString().padStart(2, "0")}
          </div>
          <div className="space-x-4 mt-4">
            <select
              value={selectedMinutes}
              onChange={(e) => setSelectedMinutes(Number(e.target.value))}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              <option value={10}>10 Minutes</option>
              <option value={20}>20 Minutes</option>
              <option value={30}>30 Minutes</option>
              <option value={40}>40 Minutes</option>
            </select>
            <button
              onClick={startPomodoro}
              className="bg-green-500 px-4 py-2 rounded-lg"
            >
              Start
            </button>
            <button
              onClick={resetPomodoro}
              className="bg-red-500 px-4 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Room Info */}
        <div className="bg-[#001022]/50 p-4 rounded-lg flex flex-col">
          <h2 className="text-xl font-semibold">Room Info</h2>
          <p className="mt-2">Room Key:</p>
          <p className="bg-gray-700 p-2 rounded-md">{roomKey}</p>
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 mt-4 px-4 py-2 rounded-lg w-full"
          >
            Copy Key
          </button>
          <button
            onClick={leaveRoom}
            className="bg-red-500 mt-4 px-4 py-2 rounded-lg w-full"
          >
            Leave Room
          </button>
        </div>

        {/* Members Joined */}
        <div className="bg-[#001022]/50 p-4 rounded-lg flex flex-col">
          <h2 className="text-xl font-semibold">Members Joined</h2>
          <ul className="mt-4 space-y-2">
            <li>{username} (Host)</li>
          </ul>
        </div>
      </div>

      {/* Video Conference Section */}
      <div className="relative w-full h-[395px] mt-[-3px] bg-[#001022]/50">
        <div ref={meetingContainerRef} className="w-full h-full"></div>

        {/* Full-screen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 text-white bg-[#00334D] py-2 px-4 rounded-md z-10"
        >
          ⛶ Full Screen
        </button>
      </div>
    </div>
  );
}
