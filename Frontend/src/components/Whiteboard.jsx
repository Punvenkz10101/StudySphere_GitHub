import React, { useEffect, useRef, useState } from 'react';
import socketService from '../services/socketService';
import { BsPencilFill, BsEraser } from 'react-icons/bs';

const Whiteboard = ({ roomId, onClose }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [isEraser, setIsEraser] = useState(false);
  const [previousColor, setPreviousColor] = useState('#000000');
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const socket = socketService.socket;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Enable anti-aliasing
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';  // Add smooth line joins
    ctx.imageSmoothingEnabled = true;  // Enable image smoothing
    ctx.imageSmoothingQuality = 'high';  // Set smoothing quality to high
    
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

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const container = canvas.parentElement;
      const { width, height } = container.getBoundingClientRect();

      // Store current canvas content
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(canvas, 0, 0);

      // Resize canvas
      canvas.width = width;
      canvas.height = height;

      // Restore content
      const ctx = canvas.getContext('2d');
      ctx.drawImage(tempCanvas, 0, 0, width, height);
      
      // Reset context properties
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current.parentElement);
    }

    return () => resizeObserver.disconnect();
  }, [color, brushSize]);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
    
    context.beginPath();
    context.moveTo(x, y);
    socketService.emit('drawing', { roomId, x, y, drawing: false, color, size: brushSize });
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Smooth line drawing using quadratic curves
    context.beginPath();
    context.moveTo(lastX, lastY);
    
    // Calculate control point for quadratic curve
    const controlX = (lastX + x) / 2;
    const controlY = (lastY + y) / 2;
    
    context.quadraticCurveTo(controlX, controlY, x, y);
    context.stroke();
    
    setLastX(x);
    setLastY(y);

    socketService.emit('drawing', { 
      roomId, 
      x, 
      y, 
      controlX,
      controlY,
      lastX: lastX,
      lastY: lastY,
      drawing: true, 
      color, 
      size: brushSize 
    });
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
      <div className="bg-white p-4 rounded-lg w-[95vw] h-[90vh] flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Interactive Whiteboard</h2>
          
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEraser(false);
                  setColor(previousColor);
                  setBrushSize(2);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded ${
                  !isEraser 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <BsPencilFill className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsEraser(true);
                  setPreviousColor(color);
                  setColor('#ffffff');
                  setBrushSize(20);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded ${
                  isEraser 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <BsEraser className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {!isEraser && (
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Color:</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 cursor-pointer"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 whitespace-nowrap">
                  {isEraser ? 'Eraser Size:' : 'Brush Size:'}
                </label>
                <input
                  type="range"
                  min={isEraser ? "10" : "1"}
                  max={isEraser ? "50" : "20"}
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="flex gap-2">
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
        </div>

        <div className="flex-grow relative w-full h-0 min-h-[200px]">
          <canvas
            ref={canvasRef}
            width={1000}
            height={600}
            className="absolute inset-0 w-full h-full border border-gray-300"
            style={{ 
              backgroundColor: '#ffffff',
              cursor: isEraser ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4L20 11L11 20\'/%3E%3C/svg%3E") 0 24, auto' 
                              : 'crosshair',
              objectFit: 'contain'
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          />
        </div>
      </div>
    </div>
  );
};

export default Whiteboard; 