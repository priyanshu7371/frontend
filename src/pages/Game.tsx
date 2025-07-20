import React, { useEffect, useState } from 'react';
import TaskBox from '../components/TaskBox';
import MainTaskBox from '../components/MainTaskBox';
import { useGame } from '../context/GameContext';
import bgImage from '../assets/assets_task_01k0gckyc6emgvck7zbr0pyyp3_1752896856_img_1.webp';
import Profile from '../components/Profile';
import Level from '../components/Level';
import fitnessAnime from '../assets/fitness_anime.jpeg';
import generalTasksData from '../../public/tasks/general_tasks.json';

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

// Remove unused initialMentalTasks and initialPhysicalTasks to fix linter errors

const baseBoxStyle = { minWidth: 260 };
const blueShadow = { boxShadow: '0 4px 24px 0 rgba(79,138,255,0.18)' };
const purpleShadow = { boxShadow: '0 4px 24px 0 rgba(167,127,255,0.18)' };

// For dropdown and lock button colors
const warmYellow = '#FFD700';

// Merge day-wise plan with master tasks for today
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = days[new Date().getDay()];
const masterTasks = generalTasksData.tasks;
const todayPlan = generalTasksData.plan.find(dayObj => dayObj.day === today);
const todayTasks = todayPlan
  ? todayPlan.tasks.slice(0, 4).map(dayTask => {
      const master = masterTasks.find(t => t.id === dayTask.id) || {};
      return {
        ...master,
        ...dayTask,
        quantity: (dayTask as any).quantity ?? (master as any).defaultQuantity,
        sets: (dayTask as any).sets ?? (master as any).defaultSets,
        coins: (master as any).coins,
        time: (dayTask as any).time ?? (master as any).time,
        text: (master as any).name || dayTask.id,
        done: false,
        type: (master as any).type || 'physical', // Ensure type is present
      };
    })
  : [];

// Split todayTasks into physical and mental
// When creating physTasks and mentTasks, always set currentSet: 0 (not undefined)
const physicalTasks = todayTasks
  ? todayTasks
      .filter(t => t.type === 'physical')
      .map(t => ({
        ...t,
        currentSet: 0,
        done: false,
        quantity: t.quantity ?? 0,
        time: t.time ?? 0,
        id: t.id,
        sets: t.sets ?? 1,
        coins: t.coins ?? 0,
        type: t.type ?? 'physical',
        text: t.text,
      }))
  : [];
const mentalTasks = todayTasks
  ? todayTasks
      .filter(t => t.type === 'mental')
      .map(t => ({
        ...t,
        currentSet: 0,
        done: false,
        quantity: t.quantity ?? 0,
        time: t.time ?? 0,
        id: t.id,
        sets: t.sets ?? 1,
        coins: t.coins ?? 0,
        type: t.type ?? 'mental',
        text: t.text,
      }))
  : [];

const Game = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { gold, addCoins, gainExp, character } = useGame();
  const [showPhysicalBox, setShowPhysicalBox] = useState(true);
  const [showMentalBox, setShowMentalBox] = useState(true);
  const [showLockMsg, setShowLockMsg] = useState(false);
  const [levelUpMsg, setLevelUpMsg] = useState(false);

  // Track set progress and done status for each box
  const [physTasks, setPhysTasks] = useState(physicalTasks);
  const [mentTasks, setMentTasks] = useState(mentalTasks);

  // Update selectedTask with currentSet and done from the correct box
  useEffect(() => {
    if (selectedTask) {
      let updated = physTasks.find(t => t.text === selectedTask.text);
      if (!updated) updated = mentTasks.find(t => t.text === selectedTask.text);
      if (updated) setSelectedTask(updated);
    }
  }, [physTasks, mentTasks]);

  // Lock mental (brain) box if not all physical tasks are done
  const mentalLocked = !physTasks.every(t => t.done);

  // Auto-hide lock message after 2 seconds
  React.useEffect(() => {
    if (showLockMsg) {
      const timer = setTimeout(() => setShowLockMsg(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showLockMsg]);

  // Mark a set as done and update state
  const handleComplete = (completed: boolean | 'proceed') => {
    if (!selectedTask) return;
    const updateTasks = (tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
      setTasks((ts: Task[]) => ts.map((t: Task) => {
        if (t.text === selectedTask!.text) {
          if (t.done) return t; // Already done
          const nextSet = t.currentSet + 1;
          if (nextSet >= t.sets) {
            if (t.coins) addCoins(t.coins);
            return { ...t, currentSet: t.sets, done: true };
          } else {
            return { ...t, currentSet: nextSet };
          }
        }
        return t;
      }));
    };
    if (physTasks.some(t => t.text === selectedTask.text)) {
      updateTasks(physTasks, setPhysTasks);
    } else if (mentTasks.some(t => t.text === selectedTask.text)) {
      updateTasks(mentTasks, setMentTasks);
    }
  };

  // Use a wrapper for onTaskClick to always pass a valid Task
  const handleTaskClick = (task: Task) => {
    setSelectedTask({ ...task });
  };

  // Render TaskBox with clickable tasks
  const renderTaskBox = (tasksArr: Task[], customStyle?: React.CSSProperties, backgroundImage?: string) => (
    <TaskBox
      tasks={tasksArr}
      style={{ ...baseBoxStyle, ...customStyle, minHeight: 60 + tasksArr.length * 32 }}
      onTaskClick={handleTaskClick}
      selectedTask={selectedTask}
      backgroundImage={backgroundImage}
    />
  );

  // Remove useEffect that checks for user authentication/profile completion
  // Remove setProfileData, setShowProfilePopup, setProfileChecked, and handleProfileComplete if only used for auth/profile

  const [activeMobileBox, setActiveMobileBox] = useState<'mental' | 'physical'>('mental');
  const [templateTasks, setTemplateTasks] = useState([]);

  // Responsive check
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

  // After both physTasks and mentTasks are updated, check if all are done and level up every time
  useEffect(() => {
    if (
      physTasks.length > 0 && mentTasks.length > 0 &&
      physTasks.every(t => t.done) && mentTasks.every(t => t.done)
    ) {
      gainExp(character.expMax, () => setLevelUpMsg(true));
      setTimeout(() => setLevelUpMsg(false), 2500);
    }
  }, [physTasks, mentTasks, gainExp, character.expMax]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw' }}>
      {/* Profile at top left */}
      <div style={{ position: 'absolute', top: 18, left: 28, zIndex: 100 }}>
        <Profile />
      </div>
      {/* Level at top right */}
      <div style={{ position: 'absolute', top: 18, right: 28, zIndex: 100 }}>
        <Level />
      </div>
      {/* Modal overlay for CompleteProfile */}
      {/* Remove profile popup logic */}
      {/* Blur and block interaction with the rest of the app if popup is open */}
      <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', background: '#10131a', backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat', overflow: 'hidden' }}>
        {levelUpMsg && (
          <div style={{ position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%)', zIndex: 100, background: 'rgba(32,38,60,0.95)', color: '#7fff7f', fontWeight: 900, fontSize: 32, padding: '24px 60px', borderRadius: 18, boxShadow: '0 0 32px #7fff7f55', letterSpacing: 2, textAlign: 'center', textShadow: '0 0 16px #7fff7f99' }}>
            LEVEL UP!
          </div>
        )}
        {/* Gold Display - small, left top, next to profile card */}
        {/* <div style={{ position: 'absolute', top: 28, left: 140, background: 'rgba(24,28,40,0.85)', border: '1.5px solid #ffd700', borderRadius: 12, color: '#ffd700', fontWeight: 700, fontSize: 15, padding: '4px 14px', boxShadow: '0 0 6px #ffd70033', display: 'flex', alignItems: 'center', gap: 7, zIndex: 4 }}>
          <span style={{ fontSize: 18 }}>🪙</span> {gold}
        </div> */}
        {/* Mobile toggle for TaskBoxes */}
        {isMobile && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 80, gap: 12 }}>
            <button
              onClick={() => setActiveMobileBox('mental')}
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                border: 'none',
                background: activeMobileBox === 'mental' ? '#4f8cff' : '#232a3a',
                color: '#fff',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: activeMobileBox === 'mental' ? '0 2px 8px #4f8cff55' : 'none',
                transition: 'background 0.2s',
              }}
            >
              Mental Tasks
            </button>
            <button
              onClick={() => setActiveMobileBox('physical')}
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                border: 'none',
                background: activeMobileBox === 'physical' ? '#a77fff' : '#232a3a',
                color: '#fff',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: activeMobileBox === 'physical' ? '0 2px 8px #a77fff55' : 'none',
                transition: 'background 0.2s',
              }}
            >
              Physical Tasks
            </button>
          </div>
        )}
        {/* Main layout: side boxes and main box centered */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 2, background: 'none' }}>
          {/* Side TaskBoxes */}
          <div style={{ position: 'relative', left: 0, width: 280, display: 'flex', flexDirection: 'column', gap: 24, marginLeft: 48 }}>
            {/* Physical TaskBox (muscle) - always accessible */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 2 }}>
                <button
                  onClick={() => setShowPhysicalBox(v => !v)}
                  aria-label={showPhysicalBox ? 'Collapse Physical Tasks' : 'Expand Physical Tasks'}
                  style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(255,215,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: showPhysicalBox ? '0 2px 8px #FFD70044' : '0 1px 4px #0002', transition: 'background 0.2s, box-shadow 0.2s', padding: 0 }}
                >
                  <span style={{ fontSize: 18, color: warmYellow }}>💪</span>
                </button>
              </div>
              {showPhysicalBox && (
                <div>
                  {renderTaskBox(physTasks, purpleShadow, fitnessAnime)}
                </div>
              )}
            </div>
            {/* Mental TaskBox (brain) - locked until all physical tasks are done */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 2 }}>
                {mentalLocked ? (
                  <button
                    onClick={() => setShowLockMsg(true)}
                    aria-label="Locked: Complete all physical tasks first to unlock"
                    style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(90,124,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px #5a7cff44', padding: 0, fontWeight: 900 }}
                  >
                    <span style={{ fontSize: 18, color: '#5a7cff' }}>🔒</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowMentalBox(v => !v)}
                    aria-label={showMentalBox ? 'Collapse Mental Tasks' : 'Expand Mental Tasks'}
                    style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(90,124,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: showMentalBox ? '0 2px 8px #5a7cff44' : '0 1px 4px #0002', transition: 'background 0.2s, box-shadow 0.2s', padding: 0 }}
                  >
                    <span style={{ fontSize: 18, color: '#5a7cff' }}>🧠</span>
                  </button>
                )}
              </div>
              {showLockMsg && mentalLocked && (
                <div style={{ color: '#a7bfff', background: '#232a3a', borderRadius: 8, padding: '8px 16px', margin: '8px 0', fontWeight: 700, fontSize: 15, textAlign: 'center', boxShadow: '0 2px 8px #5a7cff33' }}>
                  Complete all physical tasks to unlock mental tasks!
                </div>
              )}
              {showMentalBox && !mentalLocked && (
                <div>
                  {renderTaskBox(mentTasks, blueShadow)}
                </div>
              )}
            </div>
          </div>
          {/* MainTaskBox centered */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', marginLeft: -120 }}>
            <MainTaskBox task={selectedTask} onComplete={handleComplete} />
          </div>
        </div>
      </div>
      {/* Remove the old large text and its box section entirely for redesign */}
    </div>
  );
};

export default Game; 