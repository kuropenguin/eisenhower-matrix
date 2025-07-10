import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task, Quadrant } from '../types';
import { TaskCard } from './TaskCard';

interface QuadrantCardProps {
  quadrant: Quadrant;
  tasks: Task[];
  onAddTask: (quadrant: string, title: string, details: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, quadrant: string) => void;
}

export const QuadrantCard: React.FC<QuadrantCardProps> = ({
  quadrant,
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDetails, setNewDetails] = useState('');

  const handleAddTask = () => {
    if (newTitle.trim()) {
      onAddTask(quadrant.id, newTitle.trim(), newDetails.trim());
      setNewTitle('');
      setNewDetails('');
      setIsAddingTask(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAddTask();
    } else if (e.key === 'Escape') {
      setNewTitle('');
      setNewDetails('');
      setIsAddingTask(false);
    }
  };

  return (
    <div 
      className={`${quadrant.bgColor} ${quadrant.borderColor} border-2 rounded-xl p-6 h-full min-h-[500px] flex flex-col`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, quadrant.id)}
    >
      <div className="mb-6">
        <h2 className={`text-2xl font-bold ${quadrant.color} mb-2`}>
          {quadrant.title}
        </h2>
        <p className={`text-sm ${quadrant.color} opacity-80`}>
          {quadrant.description}
        </p>
      </div>

      <div className="flex-1 space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
            onDragStart={onDragStart}
          />
        ))}

        {isAddingTask ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="space-y-3">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="タスクのタイトル"
                autoFocus
              />
              <textarea
                value={newDetails}
                onChange={(e) => setNewDetails(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="詳細を入力..."
                rows={3}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  追加
                </button>
                <button
                  onClick={() => {
                    setNewTitle('');
                    setNewDetails('');
                    setIsAddingTask(false);
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingTask(true)}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-white/50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <Plus size={20} />
            新しいタスクを追加
          </button>
        )}
      </div>
    </div>
  );
};