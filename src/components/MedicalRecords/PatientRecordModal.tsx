import React, { useState } from 'react';
import { X, FileText, User, Calendar, Pill, Download, Printer as Print, Edit, Plus } from 'lucide-react';
import { mockDoctors } from '../../data/mockData';
import { format, parseISO } from 'date-fns';

interface PatientRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientData: any;
}

export const PatientRecordModal: React.FC<PatientRecordModalProps> = ({
  isOpen,
  onClose,
  patientData
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !patientData) return null;

  const { patient, records, admissionDate } = patientData;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Patient Info */}
      <div className="bg-primary-50 p-4 lg:p-6 rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <User className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                {patient.firstName} {patient.lastName}
              </h3>
              <p className="text-sm text-gray-600">Patient ID: {patient.patientNumber}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-medical-100 text-medical-700 rounded-full text-sm font-medium">
            {patient.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Date of Birth</p>
            <p className="font-medium">{format(parseISO(patient.dateOfBirth), 'MMM dd, yyyy')}</p>
          </div>
          <div>
            <p className="text-gray-500">Blood Group</p>
            <p className="font-medium">{patient.bloodGroup}</p>
          </div>
          <div>
            <p className="text-gray-500">Admission Date</p>
            <p className="font-medium">{format(parseISO(admissionDate), 'MMM dd, yyyy h:mm a')}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-primary-600">{records.length}</div>
          <div className="text-sm text-gray-600">Total Records</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-medical-600">
            {records.reduce((total: number, record: any) => total + record.prescriptions.length, 0)}
          </div>
          <div className="text-sm text-gray-600">Prescriptions</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-warning-600">
            {patient.allergies.length}
          </div>
          <div className="text-sm text-gray-600">Allergies</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">
            {records.filter((r: any) => r.followUpDate && new Date(r.followUpDate) > new Date()).length}
          </div>
          <div className="text-sm text-gray-600">Follow-ups</div>
        </div>
      </div>

      {/* Allergies */}
      {patient.allergies.length > 0 && (
        <div className="bg-danger-50 p-4 rounded-lg border border-danger-200">
          <h4 className="font-medium text-danger-900 mb-2">⚠️ Allergies</h4>
          <div className="flex flex-wrap gap-2">
            {patient.allergies.map((allergy: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-danger-100 text-danger-700 rounded-full text-sm">
                {allergy}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderRecords = () => (
    <div className="space-y-4">
      {records.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No medical records found</p>
        </div>
      ) : (
        records.map((record: any) => {
          const doctor = mockDoctors.find(d => d.id === record.doctorId);
          return (
            <div key={record.id} className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{record.diagnosis}</h4>
                  <p className="text-sm text-gray-600">
                    Dr. {doctor?.firstName} {doctor?.lastName} • {format(parseISO(record.date), 'MMM dd, yyyy h:mm a')}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Symptoms:</p>
                  <p className="text-sm text-gray-600">{record.symptoms}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Treatment:</p>
                  <p className="text-sm text-gray-600">{record.treatment}</p>
                </div>

                {record.prescriptions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Prescriptions:</p>
                    <div className="space-y-2">
                      {record.prescriptions.map((prescription: any) => (
                        <div key={prescription.id} className="bg-primary-50 p-3 rounded border-l-4 border-primary-500">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-primary-900">{prescription.medicationName}</p>
                              <p className="text-sm text-primary-700">
                                {prescription.dosage} • {prescription.frequency} • {prescription.duration}
                              </p>
                              <p className="text-xs text-primary-600 mt-1">{prescription.instructions}</p>
                            </div>
                            <Pill className="h-4 w-4 text-primary-600" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {record.notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Notes:</p>
                    <p className="text-sm text-gray-600">{record.notes}</p>
                  </div>
                )}

                {record.followUpDate && (
                  <div className="bg-warning-50 p-3 rounded border-l-4 border-warning-500">
                    <p className="text-sm font-medium text-warning-900">
                      Follow-up scheduled: {format(parseISO(record.followUpDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
              Medical Records - {patient.firstName} {patient.lastName}
            </h2>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100">
                <Print className="h-4 w-4" />
                <span>Print</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-2 bg-medical-50 text-medical-600 rounded-lg hover:bg-medical-100">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'records', label: 'Medical Records', icon: FileText }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'records' && renderRecords()}
        </div>

        {/* Footer */}
        <div className="p-4 lg:p-6 border-t border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Last updated: {records.length > 0 ? format(parseISO(records[records.length - 1].date), 'MMM dd, yyyy h:mm a') : 'Never'}
            </div>
            <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
              <Plus className="h-4 w-4" />
              <span>Add Record</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};