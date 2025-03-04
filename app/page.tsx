'use client';

import { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]); // Aufgaben speichern
  const [newTask, setNewTask] = useState<string>(''); // Neue Aufgabe hinzufügen

  const addTask = () => {
    if (!newTask) return;
    setTasks([...tasks, { title: newTask, completed: false }]);
    setNewTask('');
  };

  return (
    <div className="min-h-screen">
      <h1>To-Do Liste</h1>

      <div className="flex flex-col items-center mb-6">
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            className="input-field"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Neue Aufgabe hinzufügen"
          />
          <button className="add-task-btn" onClick={addTask}>
            Aufgabe hinzufügen
          </button>
        </div>

        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <div className="task-info">
                <h2 className="task-title">{task.title}</h2>
                <p className={task.completed ? 'text-green-500' : 'text-red-500'}>
                  {task.completed ? 'Erledigt' : 'Unerledigt'}
                </p>
              </div>

              <div className="task-actions">
                <button
                  className={`task-action-btn completed ${task.completed ? 'bg-green-500' : ''}`}
                  onClick={() => {
                    setTasks((prevTasks) =>
                      prevTasks.map((t) =>
                        t.title === task.title
                          ? { ...t, completed: !t.completed }
                          : t
                      )
                    );
                  }}
                >
                  {task.completed ? 'Erledigt' : 'Markieren als erledigt'}
                </button>
                <button
                  className="task-action-btn delete"
                  onClick={() => setTasks(tasks.filter((t) => t.title !== task.title))}
                >
                  Löschen
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
