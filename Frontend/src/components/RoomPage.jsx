import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";
import { BiTrash, BiEdit, BiFullscreen } from "react-icons/bi";
import socketService from "../services/socketService";
import Whiteboard from "./Whiteboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/toast.css";

export default function RoomPage() {
  const { roomKey } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  // Ensure these values have default fallbacks
  const creator = state?.creator || state?.username || "";
  const topic = state?.topic || "Study Room";
  const username = state?.username || creator || "";

  // Initialize state with default values
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [pomodoroState, setPomodoroState] = useState({
    isRunning: false,
    timeLeft: 0,
    duration: 0,
  });
  const [sessionCount, setSessionCount] = useState(0);
  const meetingContainerRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [duration, setDuration] = useState(30); // Default duration
  const [breakState, setBreakState] = useState({
    isRunning: false,
    timeLeft: 0,
    duration: 0,
  });
  const [selectedBreakMinutes, setSelectedBreakMinutes] = useState(5);
  const [breakSessionCount, setBreakSessionCount] = useState(0);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  // Memoize tasks to prevent unnecessary re-renders
  const memoizedTasks = useMemo(() => {
    return Array.isArray(tasks) ? tasks : [];
  }, [tasks]);

  useEffect(() => {
    const appId = 949590299;
    const serverSecret = "f71bce5b0ece2bf859e98e7c3f71e189";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomKey,
      uuidv4(),
      username
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: meetingContainerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
        config: {
          role: ZegoUIKitPrebuilt.Host,
        },
      },
      showPreJoinView: true,
      showScreenSharingButton: true,
      showUserList: true,
      showPreviewTitle: true,
      previewViewConfig: {
        title: topic || "Study Room",
        video: false,
        audio: false,
      },
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
    });

    // Cleanup function
    return () => {
      try {
        if (meetingContainerRef.current) {
          meetingContainerRef.current.innerHTML = "";
        }
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    };
  }, [roomKey, username, topic]);

  useEffect(() => {
    // Initialize socket connection
    const socket = socketService.connect();

    if (!socket) {
      console.error('Failed to establish connection');
      
      setConnectionError("Failed to establish connection");
      return;
    }

    // Join room
    socket.emit("joinRoom", { roomKey, username });

    // Handle connection events
    socket.on("connect", () => {
      console.log("Socket connected successfully");
      setConnectionError(null);
      setIsConnecting(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setConnectionError("Failed to connect to server. Please try again.");
      setIsConnecting(false);
      toast.error("Connection error. Retrying...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        className: 'bg-[#00334D] text-white'
      });
    });

    // Listen for duration updates from other users
    socket.on("durationUpdated", (data) => {
      // Update duration for all users except the one who made the change
      setSelectedMinutes(data.duration);
      setPomodoroState((prev) => ({
        ...prev,
        timeLeft: data.duration * 60,
        duration: data.duration * 60,
      }));
    });

    // Handle initial Pomodoro state when joining
    const handlePomodoroState = ({
      running,
      timeLeft,
      duration,
      sessionCount,
    }) => {
      setPomodoroState({
        isRunning: running,
        timeLeft: timeLeft,
        duration: duration,
      });
      if (typeof sessionCount === "number") {
        setSessionCount(sessionCount);
      }
    };
    socket.on("pomodoroState", handlePomodoroState);

    // Handle timer start
    const handlePomodoroStarted = ({
      running,
      timeLeft,
      duration,
      sessionCount,
    }) => {
      setPomodoroState({
        isRunning: running,
        timeLeft: timeLeft,
        duration: duration,
      });
      if (typeof sessionCount === "number") {
        setSessionCount(sessionCount);
      }
    };
    socket.on("pomodoroStarted", handlePomodoroStarted);

    // Handle timer ticks
    const handlePomodoroTick = ({ timeLeft, running }) => {
      setPomodoroState((prev) => ({
        ...prev,
        timeLeft: timeLeft,
        isRunning: running,
      }));
    };
    socket.on("pomodoroTick", handlePomodoroTick);

    // Handle timer pause
    const handlePomodoroPaused = ({ running, timeLeft, sessionCount }) => {
      setPomodoroState((prev) => ({
        ...prev,
        isRunning: running,
        timeLeft: timeLeft,
      }));
      if (typeof sessionCount === "number") {
        setSessionCount(sessionCount);
      }
    };
    socket.on("pomodoroPaused", handlePomodoroPaused);

    // Handle timer reset
    const handlePomodoroReset = ({ running, timeLeft, sessionCount }) => {
      setPomodoroState({
        isRunning: running,
        timeLeft: timeLeft,
        duration: 0,
      });
      if (typeof sessionCount === "number") {
        setSessionCount(sessionCount);
      }
    };
    socket.on("pomodoroReset", handlePomodoroReset);

    // Handle timer completion
    const handlePomodoroComplete = ({ sessionCount }) => {
      setPomodoroState((prev) => ({
        ...prev,
        isRunning: false,
        timeLeft: 0,
      }));
      if (typeof sessionCount === "number") {
        setSessionCount(sessionCount);
      }
    };
    socket.on("pomodoroComplete", handlePomodoroComplete);

    // Handle session count updates
    const handleSessionCountUpdate = ({ sessionCount }) => {
      if (typeof sessionCount === "number") {
        setSessionCount(sessionCount);
      }
    };
    socket.on("sessionCountUpdate", handleSessionCountUpdate);

    // Room event handlers
    const handleRoomJoined = ({ members = [], tasks = [] }) => {
      console.log(`Room joined: ${username} entered the room`);
      setMembers(members);
      setTasks(tasks);
    };

    const handleUserJoined = ({ username, members = [] }) => {
      console.log(`New user joined: ${username}`);
      setMembers(members);
    };

    const handleUserLeft = ({ username }) => {
      console.log(`User left the room: ${username}`);
      setMembers((prev) =>
        (prev || []).filter((member) => member !== username)
      );
    };

    // Task event handlers
    const handleTaskAdded = (taskData) => {
      try {
        if (typeof taskData === "string") {
          setTasks((prev) => [
            ...(prev || []),
            {
              id: uuidv4(),
              text: taskData,
            },
          ]);
        } else if (typeof taskData === "object" && taskData.text) {
          setTasks((prev) => [
            ...(prev || []),
            {
              id: taskData.id || uuidv4(),
              text: taskData.text,
            },
          ]);
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    };

    const handleTaskDeleted = (taskId) => {
      setTasks((prev) => (prev || []).filter((task) => task.id !== taskId));
    };

    const handleTaskEdited = ({ taskId, newText }) => {
      setTasks((prev) =>
        (prev || []).map((task) =>
          task.id === taskId ? { ...task, text: newText } : task
        )
      );
    };

    // Break timer event handlers
    const handleBreakState = ({
      running,
      timeLeft,
      duration,
      sessionCount,
    }) => {
      setBreakState({
        isRunning: running,
        timeLeft: timeLeft,
        duration: duration,
      });
      if (typeof sessionCount === "number") {
        setBreakSessionCount(sessionCount);
      }
    };

    const handleBreakStarted = ({
      running,
      timeLeft,
      duration,
      sessionCount,
    }) => {
      setBreakState({
        isRunning: running,
        timeLeft: timeLeft,
        duration: duration,
      });
      if (typeof sessionCount === "number") {
        setBreakSessionCount(sessionCount);
      }
    };

    const handleBreakTick = ({ timeLeft, running }) => {
      setBreakState((prev) => ({
        ...prev,
        timeLeft: timeLeft,
        isRunning: running,
      }));
    };

    const handleBreakComplete = ({ sessionCount }) => {
      setBreakState((prev) => ({
        ...prev,
        isRunning: false,
        timeLeft: 0,
      }));
      if (typeof sessionCount === "number") {
        setBreakSessionCount(sessionCount);
      }
    };

    // Listen for break duration updates from other users
    socket.on("breakDurationUpdated", (data) => {
      setSelectedBreakMinutes(data.duration);
      setBreakState((prev) => ({
        ...prev,
        timeLeft: data.duration * 60,
        duration: data.duration * 60,
      }));
    });

    // Listen for task updates
    socket.on("tasksUpdated", ({ tasks }) => {
      setTasks(tasks);
    });

    // Attach event listeners
    socket.on("roomJoined", handleRoomJoined);
    socket.on("userJoined", handleUserJoined);
    socket.on("userLeft", handleUserLeft);
    socket.on("taskAdded", handleTaskAdded);
    socket.on("taskDeleted", handleTaskDeleted);
    socket.on("taskEdited", handleTaskEdited);
    socket.on("breakState", handleBreakState);
    socket.on("breakStarted", handleBreakStarted);
    socket.on("breakTick", handleBreakTick);
    socket.on("breakComplete", handleBreakComplete);

    // Cleanup function
    return () => {
      socket.off("pomodoroState", handlePomodoroState);
      socket.off("pomodoroStarted", handlePomodoroStarted);
      socket.off("pomodoroTick", handlePomodoroTick);
      socket.off("pomodoroPaused", handlePomodoroPaused);
      socket.off("pomodoroReset", handlePomodoroReset);
      socket.off("pomodoroComplete", handlePomodoroComplete);
      socket.off("sessionCountUpdate", handleSessionCountUpdate);
      socket.off("roomJoined", handleRoomJoined);
      socket.off("userJoined", handleUserJoined);
      socket.off("userLeft", handleUserLeft);
      socket.off("taskAdded", handleTaskAdded);
      socket.off("taskDeleted", handleTaskDeleted);
      socket.off("taskEdited", handleTaskEdited);
      socket.off("breakState", handleBreakState);
      socket.off("breakStarted", handleBreakStarted);
      socket.off("breakTick", handleBreakTick);
      socket.off("breakComplete", handleBreakComplete);
      socket.off("breakDurationUpdated");
      socket.off("tasksUpdated");

      socketService.disconnect();
    };
  }, [roomKey, username]);

  useEffect(() => {
    let zgInstance = null;

    const handleVisibilityChange = async () => {
      if (document.hidden) {
        // Page is hidden (user switched tabs or minimized)
        if (zgInstance) {
          try {
            await zgInstance.turnCameraOff();
            await zgInstance.turnMicrophoneOff();
          } catch (error) {
            console.error("Error handling visibility change:", error);
          }
        }
      } else {
        // Page is visible again
        zgInstance = ZegoUIKitPrebuilt.getInstance();
        if (zgInstance) {
          try {
            // Reinitialize the room
            const appId = 1876705794;
            const serverSecret = "99cf0d1e05d48b4324ddc3e28a03301f";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
              appId,
              serverSecret,
              roomKey,
              uuidv4(),
              username
            );

            const zp = ZegoUIKitPrebuilt.create(kitToken);
            await zp.joinRoom({
              container: meetingContainerRef.current,
              scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
                config: {
                  role: ZegoUIKitPrebuilt.Host,
                },
              },
              showPreJoinView: false,
              showScreenSharingButton: true,
              showUserList: true,
              showPreviewTitle: true,
              previewViewConfig: {
                title: topic || "Study Room",
                video: false,
                audio: false,
              },
              turnOnMicrophoneWhenJoining: false,
              turnOnCameraWhenJoining: false,
              showMyCameraToggleButton: true,
              showMyMicrophoneToggleButton: true,
              showAudioVideoSettingsButton: true,
            });
          } catch (error) {
            console.error("Error reinitializing room:", error);
          }
        }
      }
    };

    // Add visibility change listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [roomKey, username, topic]);

  const toggleFullscreen = () => {
    const element = meetingContainerRef.current;
    if (!document.fullscreenElement) {
      element?.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const startPomodoro = () => {
    if (pomodoroState.timeLeft > 0 && pomodoroState.isRunning === false) {
      // If there's time left from a pause, continue from there
      socketService.socket.emit("startPomodoro", {
        roomKey,
        duration: pomodoroState.timeLeft,
      });
    } else {
      // Start new timer with selected duration
      const duration = selectedMinutes * 60; // Convert minutes to seconds
      socketService.socket.emit("startPomodoro", {
        roomKey,
        duration: duration,
      });
    }
  };

  const pausePomodoro = () => {
    socketService.socket.emit("pausePomodoro", { roomKey });
  };

  const resetPomodoro = () => {
    socketService.socket.emit("resetPomodoro", { roomKey });
  };

  const addTask = () => {
    if (currentTask.trim()) {
      if (editingTaskId !== null) {
        socketService.socket.emit("editTask", {
          roomKey,
          taskId: editingTaskId,
          newText: currentTask.trim(),
        });
        setEditingTaskId(null);
      } else {
        socketService.socket.emit("addTask", {
          roomKey,
          task: currentTask.trim(), // Send just the text
        });
      }
      setCurrentTask("");
    }
  };

  const deleteTask = (taskId) => {
    socketService.socket.emit("deleteTask", {
      roomKey,
      taskId,
    });
  };

  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setCurrentTask(typeof task === "string" ? task : task.text);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomKey);
    toast.success();
    toast.info("Room key copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: false,
      className: 'bg-[#00334D] text-white'
    });
  };

  const leaveRoom = async () => {
    try {
      // Get the Zego instance
      const zgInstance = ZegoUIKitPrebuilt.getInstance();
      
      if (zgInstance) {
        try {
          // First, stop all local streams
          await zgInstance.turnCameraOff();
          await zgInstance.turnMicrophoneOff();
          
          // Stop screen sharing if active
          await zgInstance.stopScreenSharing();
          
          // Leave the room explicitly
          await zgInstance.leaveRoom();
          
          // destroy() will automatically:
          // 1. Leave the room
          // 2. Stop all streams
          // 3. Clean up resources
          // 4. Destroy the instance
          await zgInstance.destroy();
          console.log("Successfully destroyed Zego instance and left room");
        } catch (zegoError) {
          console.error("Error cleaning up Zego:", zegoError);
        }
      }
  
      // Clear the video container
      if (meetingContainerRef.current) {
        meetingContainerRef.current.innerHTML = '';
      }
  
      // Handle socket cleanup
      if (socketService.socket) {
        socketService.socket.emit("leaveRoom", { roomKey, username });
        socketService.disconnect();
      }
  
      // Reset timers if running
      if (pomodoroState.isRunning) {
        resetPomodoro();
      }
  
      // Add a small delay before navigation to ensure cleanup is complete
      setTimeout(() => {
        // Force reload the page before navigation to ensure complete cleanup
        window.location.href = '/';
      }, 100);
  
    } catch (error) {
      console.error("Error leaving the room:", error);
      // If there's an error, force cleanup and reload
      if (meetingContainerRef.current) {
        meetingContainerRef.current.innerHTML = '';
      }
      window.location.href = '/';
    }
  };

   
    


  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    socketService.socket?.emit("changeDuration", {
      roomId: roomKey,
      duration: newDuration,
    });
  };

  const startBreak = () => {
    const duration =
      breakState.timeLeft > 0 && !breakState.isRunning
        ? breakState.timeLeft
        : selectedBreakMinutes * 60;

    socketService.socket.emit("startBreak", {
      roomKey,
      duration: duration,
    });
  };

  const pauseBreak = () => {
    socketService.socket.emit("pauseBreak", { roomKey });
  };

  const resetBreak = () => {
    socketService.socket.emit("resetBreak", { roomKey });
  };

  const handleBreakDurationChange = (newDuration) => {
    socketService.socket.emit("changeBreakDuration", {
      roomId: roomKey,
      duration: newDuration,
    });
  };

  return (
    <div
      className="room-page flex flex-col min-h-screen w-full text-white"
      style={{
        backgroundImage: 'url("/Night5.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#001022",
      }}
      onError={(e) => {
        console.error("Background image failed to load");
        e.currentTarget.style.backgroundImage = "none";
      }}
    >
      {connectionError && (
        <div className="bg-red-500/80 text-white px-4 py-2 text-center">
          {connectionError}
        </div>
      )}
      {/* Navbar */}
      <nav className="w-full bg-[#001022]/50 p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Buttons row - vertical on mobile, horizontal on desktop */}
        <div className="w-full flex flex-col sm:flex-row justify-between sm:justify-between items-center gap-2">
          {/* Left side button */}
          <div className="w-full sm:w-1/3 sm:flex sm:justify-start">
            <button
              onClick={copyToClipboard}
              className="w-full sm:w-auto bg-white text-[#00334D] px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-[14px] sm:text-[15px] font-medium whitespace-nowrap"
            >
              Copy Room Key
            </button>
          </div>

          {/* Right side buttons - stacked on mobile */}
          <div className="w-full sm:w-1/3 flex flex-col sm:flex-row sm:justify-end gap-2">
            <button
              onClick={() => setShowWhiteboard(true)}
              className="w-full sm:w-auto bg-white text-[#00334D] px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-[14px] sm:text-[15px] font-medium whitespace-nowrap"
            >
              Open Whiteboard
            </button>
            <button
              onClick={leaveRoom}
              className="w-full sm:w-auto bg-white text-[#00334D] px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-[14px] sm:text-[15px] font-medium whitespace-nowrap"
            >
              Leave Room
            </button>
          </div>
        </div>

        {/* Topic - centered below buttons on mobile, centered between them on desktop */}
        <div className="w-full sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 text-center sm:w-auto">
          <span className="text-2xl sm:text-2xl lg:text-3xl font-bold tracking-wide">
            {topic || "Study Room"}
          </span>
        </div>
      </nav>

      {/* Main content wrapper - Added padding and adjusted spacing */}
      <div className="flex flex-col p-4 gap-4">
        {/* Feature boxes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          {/* Members Joined */}
          <div className="bg-[#001022]/50 p-3 rounded-lg flex flex-col h-[280px]">
            <h2 className="text-xl font-semibold mb-4">Members Joined</h2>
            <ul className="mt-2 space-y-2 flex-grow overflow-y-auto">
              {members.map((memberUsername, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{memberUsername}</span>
                  {memberUsername === username && (
                    <span className="text-xs bg-white text-[#00334D] px-2 py-1 rounded-full font-medium">
                      You
                    </span>
                  )}
                  {memberUsername === creator && (
                    <span className="text-xs bg-white text-[#00334D] px-2 py-1 rounded-full font-medium">
                      Host
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Pomodoro Timer */}
          <div className="bg-[#001022]/50 p-3 rounded-lg flex flex-col h-[280px]">
            <h2 className="text-xl font-semibold mb-4">Pomodoro Timer</h2>
            <div className="flex flex-col items-center space-y-3">
              <div className="text-4xl font-bold">
                {Math.floor(pomodoroState.timeLeft / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(pomodoroState.timeLeft % 60).toString().padStart(2, "0")}
              </div>
              <select
                value={selectedMinutes}
                onChange={(e) => {
                  const newDuration = Number(e.target.value);
                  setSelectedMinutes(newDuration);
                  socketService.socket.emit("changeDuration", {
                    roomId: roomKey,
                    duration: newDuration,
                  });
                  setPomodoroState({
                    isRunning: false,
                    timeLeft: newDuration * 60,
                    duration: newDuration * 60,
                  });
                }}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
                disabled={pomodoroState.isRunning}
              >
                <option value={5}>5 Minutes</option>
                <option value={10}>10 Minutes</option>
                <option value={15}>15 Minutes</option>
                <option value={20}>20 Minutes</option>
                <option value={25}>25 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={35}>35 Minutes</option>
                <option value={40}>40 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={50}>50 Minutes</option>
                <option value={55}>55 Minutes</option>
                <option value={60}>60 Minutes</option>
              </select>
              <div className="flex gap-2">
                {!pomodoroState.isRunning ? (
                  <button
                    onClick={startPomodoro}
                    className="bg-white text-[#00334D] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-[15px] font-medium"
                    disabled={pomodoroState.isRunning}
                  >
                    Start
                  </button>
                ) : (
                  <button
                    onClick={pausePomodoro}
                    className="bg-white text-[#00334D] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-[15px] font-medium"
                  >
                    Pause
                  </button>
                )}
                <button
                  onClick={resetPomodoro}
                  className="bg-white text-[#00334D] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-[15px] font-medium"
                >
                  Reset
                </button>
              </div>
              <div className="text-sm text-gray-300">
                Sessions Completed: {sessionCount}
              </div>
            </div>
          </div>

          {/* Break Timer */}
          <div className="bg-[#001022]/50 p-3 rounded-lg flex flex-col h-[280px]">
            <h2 className="text-xl font-semibold mb-4">Break Timer</h2>
            <div className="flex flex-col items-center space-y-3">
              <div className="text-4xl font-bold">
                {Math.floor(breakState.timeLeft / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(breakState.timeLeft % 60).toString().padStart(2, "0")}
              </div>
              <select
                value={selectedBreakMinutes}
                onChange={(e) =>
                  handleBreakDurationChange(Number(e.target.value))
                }
                className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
                disabled={breakState.isRunning}
              >
                <option value={5}>5 Minutes</option>
                <option value={10}>10 Minutes</option>
                <option value={15}>15 Minutes</option>
              </select>
              <div className="flex gap-2">
                {!breakState.isRunning ? (
                  <button
                    onClick={startBreak}
                    className="bg-white text-[#00334D] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-[15px] font-medium"
                    disabled={breakState.isRunning}
                  >
                    Start Break
                  </button>
                ) : (
                  <button
                    onClick={pauseBreak}
                    className="bg-white text-[#00334D] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-[15px] font-medium"
                  >
                    Pause Break
                  </button>
                )}
                <button
                  onClick={resetBreak}
                  className="bg-white text-[#00334D] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-[15px] font-medium"
                >
                  Reset Break
                </button>
              </div>
              <div className="text-sm text-gray-300">
                Break Sessions: {breakSessionCount}
              </div>
            </div>
          </div>

          {/* To-Do Section */}
          <div className="bg-[#001022]/50 p-3 rounded-lg flex flex-col h-[280px]">
            <h2 className="text-xl font-semibold mb-4">To-Do List</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTask();
              }}
              className="space-y-2"
            >
              <input
                type="text"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                placeholder="Add a new task"
                className="w-full p-2.5 bg-gray-700/50 text-white placeholder-gray-400 rounded-lg 
                         border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                         transition-all duration-200"
              />
              <button
                type="submit"
                className="bg-white text-[#00334D] py-2 px-4 rounded-lg w-full hover:bg-gray-100 transition-colors text-[15px] font-medium"
              >
                {editingTaskId !== null ? "Edit Task" : "Add Task"}
              </button>
            </form>
            <ul className="mt-2 space-y-2 overflow-y-auto flex-grow">
              {Array.isArray(memoizedTasks) &&
                memoizedTasks.map((task) => (
                  <li
                    key={task.id || uuidv4()}
                    className="flex items-center justify-between bg-gray-700/50 p-2 rounded-lg hover:bg-gray-700/70 transition-colors group"
                  >
                    <span className="flex-grow text-white">
                      {typeof task === "string" ? task : task.text}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => startEditingTask(task)}
                        className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                      >
                        <BiEdit size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTask(task.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                      >
                        <BiTrash size={18} />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Video Conference Section - Adjusted spacing */}
        <div className="relative w-full h-[250px] sm:h-[334px] bg-[#001022]/50 rounded-lg mt-2 sm:mt-[-5px]">
          <div
            ref={meetingContainerRef}
            className="w-full h-[245px] sm:h-[335px] mt-[1px]"
          ></div>
          <button
            onClick={toggleFullscreen}
            className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white text-[#00334D] py-1.5 sm:py-2 px-3 sm:px-4 rounded-md z-10 text-[15px] font-medium hover:bg-gray-100 transition-colors"
          >
            ⛶ Full Screen
          </button>
        </div>
      </div>

      {showWhiteboard && (
        <Whiteboard roomId={roomKey} onClose={() => setShowWhiteboard(false)} />
      )}
      
    </div>
  );
}