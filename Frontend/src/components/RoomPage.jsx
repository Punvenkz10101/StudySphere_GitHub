import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Overlay from './Overlay';

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
      timer = setInterval(() => setTime(prev => prev - 1), 1000);
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
    const completedTasks = updatedTasks.filter(task => task.completed).length;
    setProgress((completedTasks / updatedTasks.length) * 100);
  };

  return (
    <div className="room-page flex flex-col justify-between h-screen bg-[#00334D] text-white">
      <Overlay /> {/* Overlay remains fixed and provides header separation */}

      <div className="content-wrapper flex flex-col justify-between pt-20 pb-8 mx-auto max-w-screen-lg h-full">
        {/* Room Key Section */}
        <div className="room-key-section text-center mb-6">
          <h1 className="text-2xl font-semibold">Room Key: {roomKey}</h1>
          <p className="mt-2">Share this key with friends to join the room.</p>
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600 transition"
          >
            Copy Room Key
          </button>
        </div>

        {/* Pomodoro Timer */}
        <div className="pomodoro-section mb-6 text-center">
          <h2 className="text-xl font-semibold">Pomodoro Timer</h2>
          <p className="mt-2">{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
          {isPomodoroRunning ? (
            <button onClick={stopPomodoro} className="bg-red-500 text-white py-2 px-4 mt-2 rounded">Stop</button>
          ) : (
            <button onClick={startPomodoro} className="bg-green-500 text-white py-2 px-4 mt-2 rounded">Start 25-Minute Timer</button>
          )}
        </div>

        {/* Chat Section */}
        <div className="chat-section mb-6 text-center">
          <h2 className="text-xl font-semibold">Live Chat</h2>
          <div className="chat-box border p-2 h-32 overflow-y-scroll bg-white text-black rounded mb-2">
            {messages.map((msg, index) => (
              <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
            ))}
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="border p-2 w-full mb-2 text-black"
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white py-2 px-4 rounded">Send</button>
        </div>

        {/* Progress Tracking */}
        <div className="progress-section mb-6 text-center">
          <h2 className="text-xl font-semibold">Task Progress</h2>
          <ul className="task-list mt-2 mb-2">
            {tasks.map((task, index) => (
              <li key={index} className="mb-1">
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
          <div className="progress-bar w-3/4 mx-auto bg-gray-300 rounded-full h-4 overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="bg-green-500 h-4 rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
