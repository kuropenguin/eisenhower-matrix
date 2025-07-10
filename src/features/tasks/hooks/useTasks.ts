import { useState, useCallback } from 'react';
import { Task } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((quadrant: string, title: string, details: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      details,
      createdAt: new Date(),
      quadrant: quadrant as Task['quadrant']
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const moveTask = useCallback((taskId: string, newQuadrant: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, quadrant: newQuadrant as Task['quadrant'] } : task
    ));
  }, []);

  const getTasksByQuadrant = useCallback((quadrant: string) => {
    return tasks.filter(task => task.quadrant === quadrant);
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByQuadrant
  };
};