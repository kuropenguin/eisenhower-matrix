import React, { useState } from 'react';
import { Edit2, Check, X, GripVertical } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete, onDragStart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDetails, setEditDetails] = useState(task.details);
  const [showDetails, setShowDetails] = useState(false);

  const handleSave = () => {
    onUpdate(task.id, { title: editTitle, details: editDetails });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDetails(task.details);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 cursor-move hover:shadow-md transition-shadow duration-200"
      draggable
      onDragStart={(e) => onDragStart(e, task)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="タスクのタイトル"
                autoFocus
              />
              <textarea
                value={editDetails}
                onChange={(e) => setEditDetails(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="詳細を入力..."
                rows={3}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                >
                  <Check size={16} />
                  保存
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
                >
                  <X size={16} />
                  キャンセル
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 
                className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => setShowDetails(!showDetails)}
              >
                {task.title}
              </h3>
              {showDetails && task.details && (
                <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
                  {task.details}
                </p>
              )}
            </div>
          )}
        </div>
        
        {!isEditing && (
          <div className="flex items-center gap-1 ml-2">
            <GripVertical size={16} className="text-gray-400" />
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};