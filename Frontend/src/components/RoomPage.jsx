import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Overlay from './Overlay.jsx';

export default function RoomPage() {
  const { roomKey } = useParams();
  const [isPomodoroRunning, setPomodoroRunning] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [tasks, setTasks] = useState([{ text: "Complete Algebra section", completed: false }]);
  const [progress, setProgress] = useState(0);

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

  const sendMessage = () => {
    setMessages([...messages, { text: newMessage, sender: "You" }]);
    setNewMessage('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomKey);
    alert('Room key copied to clipboard!');
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    const completedTasks = updatedTasks.filter((task) => task.completed).length;
    setProgress((completedTasks / updatedTasks.length) * 100);
  };

  return (
    <div
      className="room-page flex flex-col h-screen text-white"
      style={{
        backgroundImage: `url('/Night5.jpg')`, // Using direct URL from public folder
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Overlay /> {/* Overlay remains fixed and provides header separation */}

      <div className="content-wrapper flex pt-24 pb-8 mx-auto max-w-screen-xl h-full w-full">
        <div className="grid grid-cols-3 gap-8 w-full h-full">
          {/* Left Column - Team and Sessions */}
          <div className="flex flex-col justify-between p-6 bg-[#002233]/75 rounded-lg h-full">
            <div className="team-section mb-6">
              <h2 className="text-lg font-semibold mb-4">Team Members</h2>
              <div className="bg-gray-750/75 p-2 rounded-lg h-40 overflow-y-auto">
                <p className="text-sm text-center">No team members joined yet.</p>
              </div>
            </div>
            <div className="sessions-completed">
              <h2 className="text-lg font-semibold mb-4">Sessions Completed</h2>
              <p className="bg-gray-750/75 p-4 rounded-lg text-center text-2xl">0</p>
            </div>
          </div>

          {/* Middle Column - Pomodoro and Task Progress */}
          <div className="flex flex-col justify-between p-6 bg-[#001d2e]/75 rounded-lg h-full">
            <div className="pomodoro-section mb-6 text-center">
              <h2 className="text-lg font-semibold">Pomodoro Timer</h2>
              <p className="mt-2 text-4xl font-bold">
                {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
              </p>
              {isPomodoroRunning ? (
                <button onClick={stopPomodoro} className="bg-white text-[#00334D] py-1 px-6 mt-4 rounded-lg">
                  Stop
                </button>
              ) : (
                <button onClick={startPomodoro} className="bg-white text-[#00334D] py-1 px-6 mt-4 rounded-lg">
                  Start 25-Minute Timer
                </button>
              )}
            </div>
            <div className="task-progress text-center">
              <h2 className="text-lg font-semibold">Target to be Completed</h2>
              <ul className="task-list mt-4 mb-4">
                {tasks.map((task, index) => (
                  <li key={index} className="flex items-center justify-center mb-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(index)}
                      className="mr-2"
                    />
                    {task.text}
                  </li>
                ))}
              </ul>
              <div className="progress-bar w-3/4 mx-auto bg-gray-300 rounded-full h-6 overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className="bg-[#00334D] h-6 rounded-full"
                ></div>
              </div>
            </div>
          </div>

          {/* Right Column - Chat, Room Key, and Leave Meeting */}
          <div className="flex flex-col justify-between p-6 bg-[#002233]/75 rounded-lg h-full">
            <div className="chat-section mb-6 text-center">
              <h2 className="text-lg font-semibold">Live Chat</h2>
              <div className="chat-box border p-2 h-40 overflow-y-scroll bg-white/75 text-black rounded-lg mb-4">
                {messages.map((msg, index) => (
                  <p key={index}>
                    <strong>{msg.sender}:</strong> {msg.text}
                  </p>
                ))}
              </div>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="border p-2 w-full mb-2 text-black rounded-lg"
              />
              <button onClick={sendMessage} className="bg-white text-[#00334D] py-1 px-4 rounded-lg">
                Send
              </button>
            </div>
            <div className="copy-room-key mb-4 text-center">
              <h2 className="text-lg font-semibold mb-2">Room Key</h2>
              <p className="text-sm mb-2">Share this key to invite others.</p>
              <button
                onClick={copyToClipboard}
                className="bg-white text-[#00334D] py-1 px-6 rounded-lg"
              >
                Copy Room Key
              </button>
            </div>
            <button className="leave-meeting-button bg-white text-red-500 py-2 rounded-lg w-full">
              Leave Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
