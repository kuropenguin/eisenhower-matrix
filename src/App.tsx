import React, { useState } from 'react';
import { Target, BarChart3 } from 'lucide-react';
import { QuadrantCard } from './components/QuadrantCard';
import { quadrants } from './data/quadrants';
import { useTasks } from './hooks/useTasks';
import { Task } from './types';

function App() {
  const { tasks, addTask, updateTask, deleteTask, moveTask, getTasksByQuadrant } = useTasks();
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, quadrant: string) => {
    e.preventDefault();
    if (draggedTask && draggedTask.quadrant !== quadrant) {
      moveTask(draggedTask.id, quadrant);
    }
    setDraggedTask(null);
  };

  const totalTasks = tasks.length;
  const completedTasks = getTasksByQuadrant('delete').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <Target size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              アイゼンハワーマトリックス
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            タスクを緊急度と重要度で分類し、効率的に管理しましょう
          </p>
          
          {/* Stats */}
          <div className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-600" />
              <span className="text-sm text-gray-600">
                総タスク数: <span className="font-semibold text-gray-900">{totalTasks}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                完了済み: <span className="font-semibold text-gray-900">{completedTasks}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {quadrants.map((quadrant) => (
            <QuadrantCard
              key={quadrant.id}
              quadrant={quadrant}
              tasks={getTasksByQuadrant(quadrant.id)}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
        </div>

        {/* Matrix Labels */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <span className="text-sm font-medium text-gray-700">重要</span>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <span className="text-sm font-medium text-gray-700">重要ではない</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <span className="text-sm font-medium text-gray-700">緊急 ← → 緊急ではない</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Ctrl+Enter で保存、Escape でキャンセル</p>
        </div>
      </div>
    </div>
  );
}

export default App;