import React, { useState, useEffect, useCallback } from "react";
import { Plus, Search, Users } from "lucide-react";
import type {
  Patient,
  PatientFormData,
  NotificationState,
} from "../types/patient";
import { patientService } from "../services/patientService";
import PatientCard from "./PatientCard";
import PatientModal from "./PatientModal";
import Notification from "./Notification";
import ConfirmDialog from "./ConfirmDialog";
import LanguageSwitcher from "./LanguageSwitcher";
import PatientSkeleton from "./PatientSkeleton";
import { useTranslation } from "../hooks/useTranslation";

const PatientManager: React.FC = () => {
  const { t } = useTranslation();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: "",
    type: "info",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    patientId: "",
    patientName: "",
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        const data = await patientService.getPatients();
        setPatients(data);
        setFilteredPatients(data);
      } catch (error) {
        console.error("Error loading patients:", error);
        showNotification(t("notifications.errorLoading"), "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatients();
  }, [t]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPatients(patients);
      setIsSearching(false);
    } else {
      setIsSearching(true);
      // Simular un pequeño delay para mostrar el skeleton
      const searchTimer = setTimeout(() => {
        const filtered = patients.filter(
          (patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const sortedFiltered = filtered.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
        setFilteredPatients(sortedFiltered);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(searchTimer);
    }
  }, [patients, searchTerm]);

  const loadPatients = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await patientService.getPatients();
      setPatients(data);
      setFilteredPatients(data);
    } catch (error) {
      console.error("Error loading patients:", error);
      showNotification(t("notifications.errorLoading"), "error");
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setNotification({
      show: true,
      message,
      type,
    });
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  const handleOpenModal = () => {
    setEditingPatient(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPatient(null);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setIsModalOpen(true);
  };

  const handleSubmitPatient = async (data: PatientFormData) => {
    setIsSubmitting(true);
    try {
      if (editingPatient) {
        await patientService.updatePatient(editingPatient.id, data);
        showNotification(t("notifications.patientUpdated"), "success");
      } else {
        await patientService.createPatient(data);
        showNotification(t("notifications.patientCreated"), "success");
      }

      await loadPatients();
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting patient:", error);
      showNotification(
        editingPatient
          ? t("notifications.errorUpdating")
          : t("notifications.errorCreating"),
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePatient = (id: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      patientId: id,
      patientName: name,
    });
  };

  const confirmDelete = async () => {
    try {
      await patientService.deletePatient(confirmDialog.patientId);
      showNotification(t("notifications.patientDeleted"), "success");
      await loadPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
      showNotification(t("notifications.errorDeleting"), "error");
    } finally {
      setConfirmDialog({
        isOpen: false,
        patientId: "",
        patientName: "",
      });
    }
  };

  const cancelDelete = () => {
    setConfirmDialog({
      isOpen: false,
      patientId: "",
      patientName: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-primary mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                {t("patient.title")}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleOpenModal}
                className="btn-primary flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t("patient.addNew")}
              </button>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("app.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <>
            <div className="mb-6 w-[100px] h-[1rem] bg-gray-200 rounded-lg animate-pulse "></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <PatientSkeleton key={index} />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {t("app.showing", {
                  count: filteredPatients.length,
                  total: patients.length,
                })}
                {searchTerm && (
                  <span className="ml-1">para "{searchTerm}"</span>
                )}
              </p>
            </div>

            {/* Patients Grid */}
            {isSearching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <PatientSkeleton key={index} />
                ))}
              </div>
            ) : filteredPatients.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? t("app.noResults") : t("patient.noPatients")}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm
                    ? t("app.tryOtherSearch")
                    : t("patient.startAdding")}
                </p>
                {!searchTerm && (
                  <button onClick={handleOpenModal} className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    {t("patient.addFirst")}
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                  <PatientCard
                    key={patient.id}
                    patient={patient}
                    onEdit={handleEditPatient}
                    onDelete={handleDeletePatient}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      <PatientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitPatient}
        patient={editingPatient}
        isLoading={isSubmitting}
      />

      {/* Notification */}
      <Notification
        notification={notification}
        onClose={handleCloseNotification}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title={t("confirmDialog.deleteTitle")}
        message={t("confirmDialog.deleteMessage", {
          name: confirmDialog.patientName,
        })}
        confirmText={t("confirmDialog.deleteConfirm")}
        cancelText={t("confirmDialog.deleteCancel")}
        type="danger"
      />
    </div>
  );
};

export default PatientManager;
