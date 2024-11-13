// RoomPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RoomPage() {
  const { roomKey } = useParams();
  const [isPomodoroRunning, setPomodoroRunning] = useState(false);
  const [time, setTime] = useState(25 * 60); // Default 25 min timer
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
    setTime(25 * 60); // Reset to 25 minutes
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
    <div className="room-page p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      {/* Room Key Section */}
      <h1 className="text-2xl font-semibold mb-4">Room Key: {roomKey}</h1>
      <p className="mb-4">Share this key with friends to join the room.</p>
      <button
        onClick={copyToClipboard}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Copy Room Key
      </button>

      {/* Pomodoro Timer */}
      <div className="pomodoro-timer mt-6">
        <h2 className="text-xl font-semibold mb-2">Pomodoro Timer</h2>
        <p>{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
        {isPomodoroRunning ? (
          <button onClick={stopPomodoro} className="bg-red-500 text-white py-2 px-4 rounded mt-2">Stop</button>
        ) : (
          <button onClick={startPomodoro} className="bg-green-500 text-white py-2 px-4 rounded mt-2">Start 25-Minute Timer</button>
        )}
      </div>

      {/* Chat Section */}
      <div className="chat-section mt-6">
        <h2 className="text-xl font-semibold mb-2">Live Chat</h2>
        <div className="chat-box mb-2 border p-2 h-40 overflow-y-scroll">
          {messages.map((msg, index) => (
            <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="border p-2 w-full mb-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white py-2 px-4 rounded">Send</button>
      </div>

      {/* Progress Tracking */}
      <div className="progress-tracking mt-6">
        <h2 className="text-xl font-semibold mb-2">Task Progress</h2>
        <ul className="task-list mb-2">
          {tasks.map((task, index) => (
            <li key={index} className="mb-2">
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
        <div className="progress-bar w-full bg-gray-200 rounded-full h-4">
          <div
            style={{ width: `${progress}%` }}
            className="bg-green-500 h-4 rounded-full"
          ></div>
        </div>
      </div>
    </div>
  );
}
