import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";
import { BiTrash, BiEdit } from "react-icons/bi";
import socketService from "../services/socketService";

export default function RoomPage() {
  const { roomKey } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const creator = state?.creator || state?.username;
  const topic = state?.topic;
  const username = state?.username || creator;

  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [members, setMembers] = useState([]);
  const [pomodoroState, setPomodoroState] = useState({
    isRunning: false,
    timeLeft: 0,
    duration: 0
  });

  const meetingContainerRef = useRef(null);

  // Video Conference Setup
  useEffect(() => {
    const appId = 1876705794;
    const serverSecret = "99cf0d1e05d48b4324ddc3e28a03301f";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId, serverSecret, roomKey, uuidv4(), username
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    
    zp.joinRoom({
      container: meetingContainerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
        config: { role: ZegoUIKitPrebuilt.Host },
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

    return () => {
      try {
        if (meetingContainerRef.current) {
          meetingContainerRef.current.innerHTML = '';
        }
        if (zp?.destroy) zp.destroy();
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    };
  }, [roomKey, username, topic]);

  // Socket Connection and Event Handlers
  useEffect(() => {
    const socket = socketService.connect();
    socket.emit('joinRoom', { roomKey, username });

    const socketEvents = {
      'roomJoined': ({ members, tasks, pomodoroState }) => {
        setMembers(members);
        setTasks(tasks || []);
        if (pomodoroState) {
          setPomodoroState({
            isRunning: pomodoroState.running,
            timeLeft: pomodoroState.timeLeft,
            duration: pomodoroState.duration
          });
        }
      },
      'userJoined': ({ username, members }) => setMembers(members),
      'userLeft': ({ username }) => setMembers(prev => prev.filter(member => member !== username)),
      'taskAdded': (taskData) => setTasks(prev => [...prev, taskData]),
      'taskDeleted': (taskId) => setTasks(prev => prev.filter(task => task.id !== taskId)),
      'taskEdited': ({ taskId, newText }) => setTasks(prev => 
        prev.map(task => task.id === taskId ? { ...task, text: newText } : task)
      ),
      'pomodoroStarted': ({ running, timeLeft, duration }) => setPomodoroState({ isRunning: running, timeLeft, duration }),
      'pomodoroResumed': ({ running, timeLeft }) => setPomodoroState(prev => ({ ...prev, isRunning: running, timeLeft })),
      'pomodoroTick': ({ timeLeft }) => setPomodoroState(prev => ({ ...prev, timeLeft })),
      'pomodoroPaused': ({ running, timeLeft }) => setPomodoroState(prev => ({ ...prev, isRunning: running, timeLeft })),
      'pomodoroReset': () => setPomodoroState({ isRunning: false, timeLeft: 0, duration: 0 }),
      'pomodoroComplete': () => {
        setPomodoroState(prev => ({ ...prev, isRunning: false, timeLeft: 0 }));
        new Audio('/timer-complete.mp3').play();
      }
    };

    // Register all socket events
    Object.entries(socketEvents).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      // Cleanup all socket events
      Object.keys(socketEvents).forEach(event => socket.off(event));
      socketService.disconnect();
    };
  }, [roomKey, username]);

  // Timer Controls
  const startPomodoro = () => {
    if (pomodoroState.timeLeft > 0 && !pomodoroState.isRunning) {
      socketService.socket.emit('resumePomodoro', {
        roomKey,
        timeLeft: pomodoroState.timeLeft
      });
    } else {
      socketService.socket.emit('startPomodoro', {
        roomKey,
        duration: selectedMinutes * 60,
        isPaused: false
      });
    }
  };

  const pausePomodoro = () => {
    socketService.socket.emit('pausePomodoro', { roomKey });
  };

  const resetPomodoro = () => {
    socketService.socket.emit('resetPomodoro', { roomKey });
  };

  // Task Management
  const addTask = () => {
    if (currentTask.trim()) {
      socketService.socket.emit(
        editingTaskId ? 'editTask' : 'addTask',
        {
          roomKey,
          ...(editingTaskId ? { taskId: editingTaskId, newText: currentTask.trim() } : { task: currentTask.trim() })
        }
      );
      setCurrentTask("");
      setEditingTaskId(null);
    }
  };

  // Room Management
  const leaveRoom = () => {
    try {
      if (socketService.socket) {
        socketService.socket.emit('leaveRoom', { roomKey, username });
        socketService.disconnect();
      }
      if (pomodoroState.isRunning) resetPomodoro();
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Error leaving room:", error);
      navigate('/', { replace: true });
    }
  };

  // Render your JSX here (keep the existing JSX)
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
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setCurrentTask(task.text);
                    }}
                    className="text-blue-500"
                  >
                    <BiEdit />
                  </button>
                  <button
                    onClick={() => {
                      socketService.socket.emit('deleteTask', {
                        roomKey,
                        taskId: task.id
                      });
                    }}
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
            {Math.floor(pomodoroState.timeLeft / 60)
              .toString()
              .padStart(2, "0")}
            :{(pomodoroState.timeLeft % 60).toString().padStart(2, "0")}
          </div>
          <div className="space-x-4 mt-4">
            <select
              value={selectedMinutes}
              onChange={(e) => setSelectedMinutes(Number(e.target.value))}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
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
            {!pomodoroState.isRunning ? (
              <button
                onClick={startPomodoro}
                className="bg-green-500 px-4 py-2 rounded-lg"
              >
                Start
              </button>
            ) : (
              <button
                onClick={pausePomodoro}
                className="bg-yellow-500 px-4 py-2 rounded-lg"
              >
                Pause
              </button>
            )}
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
            onClick={() => {
              navigator.clipboard.writeText(roomKey);
              alert("Room key copied to clipboard!");
            }}
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
      </div>
    </div>
  );
}
