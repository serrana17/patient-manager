import axios from 'axios';
import type { Patient, PatientFormData } from '../types/patient';

const API_BASE_URL = 'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const patientService = {
  async getPatients(): Promise<Patient[]> {
    try {
      const response = await api.get<Patient[]>('/');
      const sortedPatients = response.data.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; 
      });
      return sortedPatients;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw new Error('Error al cargar los pacientes');
    }
  },

  async getPatientById(id: string): Promise<Patient> {
    try {
      const response = await api.get<Patient>(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching patient:', error);
      throw new Error('Error al cargar el paciente');
    }
  },

  async createPatient(patientData: PatientFormData): Promise<Patient> {
    try {
      const response = await api.post<Patient>('/', patientData);
      return response.data;
    } catch (error) {
      console.error('Error creating patient:', error);
      throw new Error('Error al crear el paciente');
    }
  },

  async updatePatient(id: string, patientData: PatientFormData): Promise<Patient> {
    try {
      const response = await api.put<Patient>(`/${id}`, patientData);
      return response.data;
    } catch (error) {
      console.error('Error updating patient:', error);
      throw new Error('Error al actualizar el paciente');
    }
  },

  async deletePatient(id: string): Promise<void> {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw new Error('Error al eliminar el paciente');
    }
  },
};
