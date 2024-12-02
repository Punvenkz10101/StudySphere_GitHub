import React, { useEffect, useRef, useState } from 'react';
import socketService from '../services/socketService';

const Whiteboard = ({ roomId, onClose }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);

  useEffect(() => {
    const socket = socketService.socket;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    setContext(ctx);

    // Connect to room
    socketService.emit('join-whiteboard-room', roomId);

    // Listen for drawing events from other users
    socket.on('drawing', ({ x, y, drawing, color: remoteColor, size: remoteSize }) => {
      ctx.strokeStyle = remoteColor;
      ctx.lineWidth = remoteSize;
      
      if (drawing) {
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    });

    // Listen for clear canvas event
    socket.on('clearCanvas', () => {
      clearCanvas();
    });

    // Listen for initial canvas state
    socket.on('canvasState', (imageData) => {
      if (imageData) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = imageData;
      }
    });

    return () => {
      socket.off('drawing');
      socket.off('clearCanvas');
      socket.off('canvasState');
    };
  }, [roomId, color, brushSize]);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    context.beginPath();
    context.moveTo(x, y);
    socketService.emit('drawing', { roomId, x, y, drawing: false, color, size: brushSize });
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
    socketService.emit('drawing', { roomId, x, y, drawing: true, color, size: brushSize });

    // Save canvas state after drawing
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL();
    socketService.emit('canvasState', { roomId, imageData });
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      // Save final canvas state
      const canvas = canvasRef.current;
      const imageData = canvas.toDataURL();
      socketService.emit('canvasState', { roomId, imageData });
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleClearCanvas = () => {
    clearCanvas();
    socketService.emit('clearCanvas', { roomId });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Interactive Whiteboard</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Color:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Size:</label>
              <input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-24"
              />
            </div>
            <button
              onClick={handleClearCanvas}
              className="bg-yellow-500 text-white px-3 py-1.5 rounded hover:bg-yellow-600"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border border-gray-300 cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
      </div>
    </div>
  );
};

export default Whiteboard; 