import React, { useRef, useEffect, useState } from 'react';
import clickSound from '../assets/click_sound.wav';

interface Task {
  text: string;
  done: boolean;
  chunks?: number;
  currentChunk?: number;
  duration?: number;
  sets: number;
  currentSet: number;
  coins: number;
  type: 'physical' | 'mental';
  id: string;
  quantity: number;
  time: number;
}

interface TaskBoxProps {
  tasks: Task[];
  style?: React.CSSProperties;
  onTaskClick?: (task: Task) => void;
  selectedTask?: Task | null;
  backgroundImage?: string;
}

const taskBoxClass = 'task-box-responsive';

const clickSoundUrl = clickSound;

const TaskBox: React.FC<TaskBoxProps> = ({ tasks, style, onTaskClick, selectedTask, backgroundImage }) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);

  // Filter tasks for today only
  const filteredTasks = tasks;

  // Animate on mount/unmount
  useEffect(() => {
    // No-op for now
  }, [tasks]);

  const handleTaskClick = (task: Task, idx: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setClickedIdx(idx);
    setTimeout(() => setClickedIdx(null), 140); // Shorter, subtle animation
    if (onTaskClick) onTaskClick(task);
  };

  return (
    <>
      <style>{`
        .taskbox-bg-img {
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
        .${taskBoxClass} {
          background: rgba(24,28,40,0.68);
          border: 1.5px solid rgba(0,0,0,0.12);
          border-radius: 14px;
          padding: 10px 18px;
          min-width: 260px;
          margin: 0;
          color: #dbeafe;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          font-family: 'Segoe UI', Arial, sans-serif;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s, height 0.3s;
        }
        .task-chip {
          background: none;
          border: none;
          border-radius: 4px;
          margin-bottom: 0px;
          margin-top: 0px;
          font-size: 18px;
          font-weight: 600;
          color: #e5e9f7;
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 4px 10px;
          transition: background 0.2s, font-weight 0.2s;
          text-decoration: none;
          border-top: none;
          border-bottom: none;
          min-height: 36px;
          box-sizing: border-box;
        }
        .task-chip:last-child {
          border-bottom: none;
        }
        .task-chip.selected {
          background: rgba(90,124,255,0.12);
          color: #7faaff;
        }
        .task-chip input[type='checkbox'] {
          accent-color: #5a7cff;
          margin-right: 10px;
          width: 18px;
          height: 18px;
        }
        .chip-text {
          font-weight: 600;
          color: inherit;
        }
        .chip-meta {
          margin-left: auto;
          font-size: 14px;
          color: #ffd700;
          font-weight: 700;
        }
        .task-chip:not(:last-child) {
          border-bottom: 1.5px solid rgba(255,255,255,0.18);
        }
        .task-chip:first-child {
          border-top: 1.5px solid rgba(255,255,255,0.18);
        }
        .task-chip:last-child {
          border-bottom: 1.5px solid rgba(255,255,255,0.18);
        }
        .coin-box {
          width: 38px;
          height: 22px;
          min-width: 28px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: #ffd700;
          margin-right: 10px;
          box-shadow: none;
          gap: 2px;
          box-sizing: border-box;
        }
        @media (max-width: 600px) {
          .${taskBoxClass} {
            padding: 4px 4px;
            min-width: 100px;
            font-size: 11px;
            border-radius: 7px;
          }
          .task-chip {
            font-size: 14px;
            padding: 2px 4px;
            border-radius: 4px;
            min-height: 28px;
          }
        }
      `}</style>
      <audio ref={audioRef} src={clickSoundUrl} preload="auto" />
      <div className={taskBoxClass} style={style}>
        {backgroundImage && (
          <img src={backgroundImage} alt="TaskBox Background" className="taskbox-bg-img" />
        )}
        <ul
          ref={ulRef}
          className="taskbox-anim"
          style={{ listStyle: 'none', padding: 0, margin: 0 }}
        >
          {filteredTasks.map((task, idx) => {
            const isSelected = selectedTask && selectedTask.text === task.text;
            // Use text for display
            let displayName = task.text;
            return (
              <li
                key={idx}
                className={`task-chip${isSelected ? ' selected' : ''}${clickedIdx === idx ? ' click-anim' : ''}`}
                style={{ opacity: task.done ? 0.5 : 1, pointerEvents: task.done ? 'none' : 'auto' }}
                onClick={() => !task.done && handleTaskClick(task, idx)}
              >
                <span className="coin-box">{typeof task.coins === 'number' ? task.coins : 0} <span role="img" aria-label="coins">🪙</span></span>
                <span
                  className={`chip-text${isSelected ? ' chip-glitch' : ''}${clickedIdx === idx ? ' click-anim' : ''}`}
                  style={{ fontWeight: 700, color: 'inherit', display: 'flex', alignItems: 'center' }}
                >
                  {displayName}
                  {task.done && <span style={{ marginLeft: 8, color: '#7fff7f', fontWeight: 900, fontSize: 18 }}>✔</span>}
                </span>
                {(typeof task.sets === 'number' && task.sets > 1) && (
                  <span className="chip-meta">
                    ({task.currentSet || 0}/{task.sets})
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TaskBox; 