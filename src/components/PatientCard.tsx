import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Trash2, ExternalLink, Calendar } from 'lucide-react';
import type { Patient } from '../types/patient';
import { formatDate, truncateText } from '../utils/helpers';
import Avatar from './Avatar';
import { useTranslation } from '../hooks/useTranslation';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (id: string, name: string) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onEdit, onDelete }) => {
  const { t, currentLanguage } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);


  return (
    <div className="card animate-fade-in">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Avatar
            src={patient.avatar}
            name={patient.name}
            size={64}
            className="rounded-full object-cover border-2 border-gray-200"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {patient.name}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(patient)}
                className="p-2 text-gray-400 hover:text-primary transition-colors duration-200 cursor-pointer"
                title={t('patient.editPatient')}
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(patient.id, patient.name)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                title={t('patient.deletePatient')}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-1">
            {truncateText(patient.description, 100)}
          </p>

          {patient.website && (
            <div className="mt-2">
              <a
                href={patient.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-500 hover:text-blue-800 transition-colors duration-200"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                {t('patient.website')}
              </a>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(patient.createdAt, currentLanguage === 'es' ? 'es-ES' : 'en-US')}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-sm text-secondary hover:text-primary-light cursor-pointer transition-colors duration-200"
            >
              {isExpanded ? (
                <>
                  <span className="mr-1">{t('patient.lessDetails')}</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span className="mr-1">{t('patient.moreDetails')}</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-up">
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">{t('patient.description')}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {patient.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">{t('patient.patientId')}</h4>
                <p className="text-sm text-gray-600 font-mono">{patient.id}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">{t('patient.creationDate')}</h4>
                <p className="text-sm text-gray-600">{formatDate(patient.createdAt, currentLanguage === 'es' ? 'es-ES' : 'en-US')}</p>
              </div>
            </div>

            {patient.website && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">{t('patient.website')}</h4>
                <a
                  href={patient.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-800 transition-colors duration-200 break-all"
                >
                  {patient.website}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
