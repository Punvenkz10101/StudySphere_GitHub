import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";
import { BiTrash, BiEdit, BiFullscreen } from "react-icons/bi";
import socketService from "../services/socketService";

export default function RoomPage() {
  const { roomKey } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Ensure these values have default fallbacks
  const creator = state?.creator || state?.username || '';
  const topic = state?.topic || 'Study Room';
  const username = state?.username || creator || '';

  // Initialize state with default values
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [pomodoroState, setPomodoroState] = useState({
    isRunning: false,
    timeLeft: 0,
    duration: 0
  });
  const [sessioncount, setSessionCount] = useState(0)
  const meetingContainerRef = useRef(null);

  // Memoize tasks to prevent unnecessary re-renders
  const memoizedTasks = useMemo(() => {
    return Array.isArray(tasks) ? tasks : [];
  }, [tasks]);

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
          meetingContainerRef.current.innerHTML = '';
        }
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    };
  }, [roomKey, username, topic]);

  useEffect(() => {
    // Safely connect to socket
    const socket = socketService.connect();
    
    // Join room safely
    socketService.emit('joinRoom', { 
      roomKey, 
      username 
    });

    // Handle room join confirmation with safe defaults
    const handleRoomJoined = ({ members = [], tasks = [] }) => {
      console.log('Room joined successfully:', { members, tasks });
      setMembers(members);
      setTasks(tasks);
    };
    socket.on('roomJoined', handleRoomJoined);

    // Other socket event handlers with error handling
    const handleUserJoined = ({ username, members = [] }) => {
      console.log('User joined:', username, 'Current members:', members);
      setMembers(members);
    };
    socket.on('userJoined', handleUserJoined);

    const handleUserLeft = ({ username }) => {
      console.log('User left:', username);
      setMembers(prev => (prev || []).filter(member => member !== username));
    };
    socket.on('userLeft', handleUserLeft);

    const handleTaskAdded = (taskData) => {
      console.log('Task added:', taskData);
      setTasks(prev => [...(prev || []), taskData]);
    };
    socket.on('taskAdded', handleTaskAdded);

    const handleTaskDeleted = (taskId) => {
      console.log('Task deleted:', taskId);
      setTasks(prev => (prev || []).filter(task => task.id !== taskId));
    };
    socket.on('taskDeleted', handleTaskDeleted);

    const handleTaskEdited = ({ taskId, newText }) => {
      console.log('Task edited:', taskId, newText);
      setTasks(prev => 
        (prev || []).map(task => 
          task.id === taskId ? { ...task, text: newText } : task
        )
      );
    };
    socket.on('taskEdited', handleTaskEdited);

    // Pomodoro event handlers
    const handlePomodoroStarted = ({ running, timeLeft, startTime, duration }) => {
      console.log('Pomodoro started:', { running, timeLeft, startTime, duration });
      setPomodoroState({
        isRunning: running,
        timeLeft: timeLeft,
        duration: duration
      });
    };
    socket.on('pomodoroStarted', handlePomodoroStarted);

    const handlePomodoroTick = ({ timeLeft }) => {
      setPomodoroState(prev => ({
        ...prev,
        timeLeft: timeLeft
      }));
    };
    socket.on('pomodoroTick', handlePomodoroTick);

    const handlePomodoroPaused = ({ running, timeLeft }) => {
      setPomodoroState(prev => ({
        ...prev,
        isRunning: running,
        timeLeft: timeLeft
      }));
    };
    socket.on('pomodoroPaused', handlePomodoroPaused);

    const handlePomodoroResumed = ({ running, timeLeft, startTime, duration }) => {
      setPomodoroState({
        isRunning: running,
        timeLeft: timeLeft,
        duration: duration
      });
    };
    socket.on('pomodoroResumed', handlePomodoroResumed);

    const handlePomodoroReset = () => {
      setPomodoroState({
        isRunning: false,
        timeLeft: 0,
        duration: 0
      });
    };
    socket.on('pomodoroReset', handlePomodoroReset);

    const handlePomodoroComplete = () => {
      setPomodoroState(prev => ({
        ...prev,
        isRunning: false,
        timeLeft: 0
      }));
      
      // Optional: Play a sound when pomodoro is complete
      const audio = new Audio('/timer-complete.mp3');
      audio.play().catch(error => console.warn('Audio play failed:', error));
    };
    socket.on('pomodoroComplete', handlePomodoroComplete);

    // Cleanup function
    return () => {
      // Remove all event listeners
      socket.off('roomJoined', handleRoomJoined);
      socket.off('userJoined', handleUserJoined);
      socket.off('userLeft', handleUserLeft);
      socket.off('taskAdded', handleTaskAdded);
      socket.off('taskDeleted', handleTaskDeleted);
      socket.off('taskEdited', handleTaskEdited);
      socket.off('pomodoroStarted', handlePomodoroStarted);
      socket.off('pomodoroTick', handlePomodoroTick);
      socket.off('pomodoroPaused', handlePomodoroPaused);
      socket.off('pomodoroResumed', handlePomodoroResumed);
      socket.off('pomodoroReset', handlePomodoroReset);
      socket.off('pomodoroComplete', handlePomodoroComplete);
      
      // Disconnect socket
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
    if (pomodoroState.timeLeft > 0 && !pomodoroState.isRunning) {
      // Resume from paused state
      socketService.socket.emit('resumePomodoro', {
        roomKey,
        timeLeft: pomodoroState.timeLeft
      });
    } else {
      // Start new timer
      const duration = selectedMinutes * 60;
      socketService.socket.emit('startPomodoro', {
        roomKey,
        duration
      });
    }
    setSessionCount(prev=> prev+1);
  };

  const pausePomodoro = () => {
    socketService.socket.emit('pausePomodoro', {
      roomKey,
      currentTime: pomodoroState.timeLeft
    });
    setPomodoroState(prev => ({
      ...prev,
      isRunning: false
    }));
  };

  const resetPomodoro = () => {
    socketService.socket.emit('resetPomodoro', {
      roomKey
    });
    setPomodoroState({
      isRunning: false,
      timeLeft: 0,
      duration: 0
    });
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
    try {
      // Disconnect from the socket room
      if (socketService.socket) {
        socketService.socket.emit('leaveRoom', { roomKey, username });
        socketService.disconnect();
      }
      
      // Clear any timers if they're running
      if (pomodoroState.isRunning) {
        resetPomodoro();
      }

      // Clear the video conference container
      if (meetingContainerRef.current) {
        meetingContainerRef.current.innerHTML = '';
      }
      
      // Navigate to home page
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Error leaving room:", error);
      // Still navigate even if there's an error
      navigate('/', { replace: true });
    }
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
            {memoizedTasks.map((task) => (
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
                className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Start
              </button>
            ) : (
              <button
                onClick={pausePomodoro}
                className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Pause
              </button>
            )}
            <button
              onClick={resetPomodoro}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Reset
            </button>
          </div>
          Sessions Completed:{sessioncount}
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
