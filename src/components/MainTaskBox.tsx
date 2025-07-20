import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import animeBoy from '../assets/anime_boy.jpeg';

interface Task {
  text: string;
  done: boolean;
  chunks?: number;
  currentChunk?: number;
  duration?: number; // in seconds
  quantity?: number;
  sets?: number;
  time?: number; // in seconds
  coins?: number; // Added for coins
}

interface MainTaskBoxProps {
  task: Task | null;
  onComplete?: (completed: boolean | 'proceed') => void;
}

const mainTaskBoxClass = 'main-task-box-responsive';

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const MainTaskBox: React.FC<MainTaskBoxProps> = ({ task, onComplete }) => {
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevTaskRef = useRef<Task | null>(null);
  const { addCoins } = useGame();
  // Removed unused: titleAnim, contentAnim, handleTitleClick

  useEffect(() => {
    if (task && task.duration && task !== prevTaskRef.current) {
      setTimer(task.duration);
      setIsRunning(false);
      setShowPrompt(false);
      setShowCompleted(false);
      setCurrentSet(1);
      prevTaskRef.current = task;
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [task]);

  useEffect(() => {
    if (isRunning && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer(t => {
          const next = t - 1;
          if (next <= 0) {
            setIsRunning(false);
            setShowPrompt(true);
            clearInterval(intervalRef.current!);
            return 0;
          }
          return next;
        });
      }, 1000);
      return () => clearInterval(intervalRef.current!);
    }
    return () => {};
  }, [isRunning, timer, task]);

  useEffect(() => {
    if (task) {
      // Removed unused: titleAnim, contentAnim
    }
  }, [task]);

  useEffect(() => {
    if (task) {
      // Removed unused: titleAnim, contentAnim
    }
  }, [task]);

  const handlePrompt = (completed: boolean) => {
    if (completed) {
      if (task && typeof task.sets === 'number' && currentSet < task.sets) {
        setCurrentSet(cs => cs + 1);
        setTimer(task.time ? task.time * 60 : 0);
        setShowPrompt(false);
        setIsRunning(false);
      } else {
        setShowCompleted(true);
        setShowPrompt(false);
        if (onComplete) onComplete(true);
        if (task && typeof task.coins === 'number') addCoins(task.coins);
      }
    } else {
      setTimer(task && task.time ? task.time * 60 : 0);
      setShowPrompt(false);
      setIsRunning(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .${mainTaskBoxClass} {
          background: rgba(24,28,40,0.68);
          border: 1.5px solid #5a7cff;
          border-radius: 14px;
          padding: 18px 24px;
          width: 340px;
          min-width: 340px;
          min-height: 120px;
          max-width: 360px;
          color: #dbeafe;
          box-shadow: none;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-family: 'Segoe UI', Arial, sans-serif;
          position: relative;
          z-index: auto;
          overflow: hidden;
          margin: 0 auto;
          text-align: left;
          font-weight: 600;
          font-size: 18px;
          letter-spacing: 1.1px;
          backdrop-filter: blur(2.5px) brightness(1.08);
        }
        .main-task-title-bg {
          background: linear-gradient(90deg, #ffe0a3 60%, #ffb347 100%);
          border-radius: 8px;
          padding: 10px 32px;
          margin: 0 auto 16px auto;
          font-weight: 800;
          font-size: 20px;
          color: #a65c00;
          letter-spacing: 0.7px;
          display: inline-block;
          text-align: center;
          box-sizing: border-box;
        }
        .main-task-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 80px;
          width: 100%;
          text-align: center;
        }
        .main-task-timer {
          font-size: 32px;
          font-weight: 800;
          color: #a65c00;
          margin: 18px 0 12px 0;
          letter-spacing: 2px;
          text-align: center;
          background: #fff3e0;
          border-radius: 8px;
          padding: 4px 12px;
          display: inline-block;
        }
        .main-task-start-btn {
          font-size: 14px;
          padding: 6px 18px;
          border-radius: 6px;
          background: #ffb347;
          color: #fff;
          border: none;
          cursor: pointer;
          font-weight: 600;
          margin-top: 8px;
          transition: background 0.18s, color 0.18s;
        }
        .main-task-start-btn:active {
          background: #ffae42;
          color: #fff;
        }
        @media (max-width: 600px) {
          .${mainTaskBoxClass} {
            padding: 16px 10px;
            width: 98vw;
            min-width: 98vw;
            min-height: 80px;
            max-width: 98vw;
            font-size: 13px;
            border-radius: 10px;
          }
        }
        .main-taskbox-bg-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.13;
          z-index: 0;
          pointer-events: none;
          border-radius: 14px;
        }
        .main-taskbox-content {
          position: relative;
          z-index: 1;
        }
      `}</style>
      <div className={mainTaskBoxClass}>
        <img src={animeBoy} alt="Anime Boy" className="main-taskbox-bg-img" />
        <div className="main-taskbox-content">
          {task ? (
            <>
              <div className="main-task-title-bg">{task.text}</div>
            </>
          ) : null}
          <div className="main-task-center">
            {task && typeof task.time === 'number' && task.time > 0 && !showCompleted ? (
              <>
                <div className="main-task-timer">{formatTime(timer > 0 ? timer : (task.time * 60))}</div>
                {!isRunning && !showPrompt && (
                  <button
                    className="main-task-start-btn"
                    onClick={() => {
                      setTimer(task.time ? task.time * 60 : 0);
                      setIsRunning(true);
                    }}
                  >
                    Start Timer
                  </button>
                )}
                {isRunning && !showPrompt && (
                  <div style={{ color: '#ffb347', fontWeight: 700, fontSize: 15, marginTop: 8 }}>Timer Running...</div>
                )}
                {showPrompt && (
                  <div style={{ marginTop: 18, color: '#ffe0a3', fontWeight: 700, fontSize: 16 }}>
                    <div>Did you complete this set?</div>
                    <div style={{ marginTop: 10 }}>
                      <button className="main-task-start-btn" style={{ marginRight: 10 }} onClick={() => handlePrompt(true)}>Yes</button>
                      <button className="main-task-start-btn" onClick={() => handlePrompt(false)}>No, Try Again</button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div style={{ color: '#b4bcd0', fontSize: 18, fontWeight: 700, letterSpacing: 1, marginTop: 18 }}>
                {task ? 'No timer for this task' : 'Select a task to begin'}
              </div>
            )}
            {showCompleted && (
              <div style={{ color: '#7fff7f', fontSize: 16, fontWeight: 700, marginTop: 18 }}>Task Completed!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTaskBox; 