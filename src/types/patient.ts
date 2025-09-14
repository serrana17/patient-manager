export interface Patient {
  id: string;
  name: string;
  avatar: string | Record<string, never>;
  description: string;
  website: string;
  createdAt: string;
}

export interface PatientFormData {
  name: string;
  avatar: string;
  description: string;
  website: string;
}

export interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
