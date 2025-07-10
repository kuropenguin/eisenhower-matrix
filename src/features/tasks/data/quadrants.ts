import { Quadrant } from '../types';

export const quadrants: Quadrant[] = [
  {
    id: 'do',
    title: 'やる',
    description: '緊急かつ重要',
    color: 'text-green-800',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-300'
  },
  {
    id: 'schedule',
    title: '予定する',
    description: '重要だが緊急ではない',
    color: 'text-orange-800',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300'
  },
  {
    id: 'delegate',
    title: '任せる',
    description: '緊急だが重要ではない',
    color: 'text-blue-800',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-300'
  },
  {
    id: 'delete',
    title: '削除する',
    description: '緊急でも重要でもない',
    color: 'text-red-800',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300'
  }
];