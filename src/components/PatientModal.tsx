import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { X, User, Image, FileText, Globe } from 'lucide-react';
import type { Patient, PatientFormData } from '../types/patient';
import { createPatientSchema } from '../utils/validation';
import { useTranslation } from '../hooks/useTranslation';

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PatientFormData) => void;
  patient?: Patient | null;
  isLoading?: boolean;
}

const PatientModal: React.FC<PatientModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  patient,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatientFormData>({
    resolver: yupResolver(createPatientSchema(t)),
    defaultValues: {
      name: '',
      avatar: '',
      description: '',
      website: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (patient) {
        reset({
          name: patient.name,
          avatar: typeof patient.avatar === 'string' ? patient.avatar : '',
          description: patient.description,
          website: patient.website,
        });
      } else {
        reset({
          name: '',
          avatar: '',
          description: '',
          website: '',
        });
      }
    }
  }, [isOpen, patient, reset]);

  const handleFormSubmit = (data: PatientFormData) => {
    onSubmit(data);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={handleClose}
        />

        {/* Modal */}
        <div className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl  transition-all sm:my-8 sm:max-w-lg w-full max-w-[90vw]">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {patient ? t('patient.editPatient') : t('patient.addNew')}
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                disabled={isLoading}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  {t('patient.name')}
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder={t('patient.namePlaceholder')}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Avatar */}
              <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                  <Image className="w-4 h-4 inline mr-1" />
                  {t('patient.avatar')}
                </label>
                <input
                  {...register('avatar')}
                  type="url"
                  id="avatar"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.avatar ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder={t('patient.avatarPlaceholder')}
                  disabled={isLoading}
                />
                {errors.avatar && (
                  <p className="mt-1 text-sm text-red-600">{errors.avatar.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  <FileText className="w-4 h-4 inline mr-1" />
                  {t('patient.description')}
                </label>
                <textarea
                  {...register('description')}
                  id="description"
                  rows={4}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder={t('patient.descriptionPlaceholder')}
                  disabled={isLoading}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              {/* Website */}
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  <Globe className="w-4 h-4 inline mr-1" />
                  {t('patient.website')}
                </label>
                <input
                  {...register('website')}
                  type="url"
                  id="website"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.website ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder={t('patient.websitePlaceholder')}
                  disabled={isLoading}
                />
                {errors.website && (
                  <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  {t('app.cancel')}
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {patient ? t('app.loading') : t('app.loading')}
                    </div>
                  ) : (
                    patient ? t('patient.editPatient') : t('patient.addNew')
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;