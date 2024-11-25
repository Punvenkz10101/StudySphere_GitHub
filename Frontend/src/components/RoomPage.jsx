import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";
import { BiTrash, BiEdit, BiFullscreen } from "react-icons/bi";
import socketService from "../services/socketService";

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
  const [members, setMembers] = useState([]);

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

  useEffect(() => {
    const socket = socketService.connect();

    // Join room on component mount
    socket.emit('joinRoom', { roomKey, username });

    // Handle room join confirmation
    socket.on('roomJoined', ({ members, tasks }) => {
      console.log('Room joined successfully:', { members, tasks });
      setMembers(members);
      setTasks(tasks || []);
    });

    // Handle new user joining
    socket.on('userJoined', ({ username, members }) => {
      console.log('User joined:', username, 'Current members:', members);
      setMembers(members);
    });

    // Handle user leaving
    socket.on('userLeft', ({ username }) => {
      console.log('User left:', username);
      setMembers(prev => prev.filter(member => member !== username));
    });

    // Handle tasks
    socket.on('taskAdded', (taskData) => {
      console.log('Task added:', taskData);
      setTasks(prev => [...prev, taskData]);
    });

    socket.on('taskDeleted', (taskId) => {
      console.log('Task deleted:', taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    });

    socket.on('taskEdited', ({ taskId, newText }) => {
      console.log('Task edited:', taskId, newText);
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, text: newText } : task
      ));
    });

    // Handle errors
    socket.on('error', ({ message }) => {
      console.error('Socket error:', message);
      alert(message);
    });

    return () => {
      socket.off('roomJoined');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('taskAdded');
      socket.off('taskDeleted');
      socket.off('taskEdited');
      socket.off('error');
      socketService.disconnect();
    };
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
        socketService.socket.emit('editTask', {
          roomKey,
          taskId: editingTaskId,
          newText: currentTask.trim()
        });
        setEditingTaskId(null);
      } else {
        socketService.socket.emit('addTask', {
          roomKey,
          task: currentTask.trim()
        });
      }
      setCurrentTask("");
    }
  };

  const deleteTask = (taskId) => {
    socketService.socket.emit('deleteTask', {
      roomKey,
      taskId
    });
  };

  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setCurrentTask(task.text);
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
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addTask();
                }
              }}
            />
            <button
              onClick={addTask}
              className="bg-green-500 text-white py-2 px-4 rounded-lg w-full"
            >
              {editingTaskId !== null ? "Edit Task" : "Add Task"}
            </button>
          </div>
          <ul className="mt-4 space-y-2 overflow-y-auto">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between bg-gray-700 p-2 rounded-lg"
              >
                <span>{task.text}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => startEditingTask(task)}
                    className="text-blue-500"
                  >
                    <BiEdit />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
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
            {members.map((memberUsername, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{memberUsername}</span>
                {memberUsername === username && 
                  <span className="text-xs bg-green-500 px-2 py-1 rounded-full">
                    You
                  </span>
                }
                {memberUsername === creator && 
                  <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">
                    Host
                  </span>
                }
              </li>
            ))}
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
