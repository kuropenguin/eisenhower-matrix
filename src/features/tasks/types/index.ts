export interface Task {
  id: string;
  title: string;
  details: string;
  createdAt: Date;
  quadrant: 'do' | 'schedule' | 'delegate' | 'delete';
}

export interface Quadrant {
  id: 'do' | 'schedule' | 'delegate' | 'delete';
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}