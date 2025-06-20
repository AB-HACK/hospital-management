import React, { useState } from 'react';
import { Folder, FolderOpen, FileText, Calendar, User, Search, Filter, Download, Eye, Plus, Clock, Users } from 'lucide-react';
import { mockPatients, mockMedicalRecords } from '../../data/mockData';
import { PatientRecordModal } from './PatientRecordModal';
import { AddRecordModal } from './AddRecordModal';
import { format, parseISO } from 'date-fns';

interface GroupedRecords {
  [year: string]: {
    [month: string]: {
      [day: string]: {
        patientId: string;
        records: any[];
        patient: any;
        admissionDate: string;
      }[];
    };
  };
}

export const MedicalRecords: React.FC = () => {
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('All');

  // Group records by year, month, and day
  const groupRecordsByDate = (): GroupedRecords => {
    const grouped: GroupedRecords = {};

    mockPatients.forEach(patient => {
      const patientRecords = mockMedicalRecords.filter(record => record.patientId === patient.id);
      const admissionDate = patient.createdAt;
      
      if (admissionDate) {
        const date = parseISO(admissionDate);
        const year = format(date, 'yyyy');
        const month = format(date, 'MMMM');
        const day = format(date, 'dd');

        if (!grouped[year]) grouped[year] = {};
        if (!grouped[year][month]) grouped[year][month] = {};
        if (!grouped[year][month][day]) grouped[year][month][day] = [];

        grouped[year][month][day].push({
          patientId: patient.id,
          records: patientRecords,
          patient,
          admissionDate
        });
      }
    });

    return grouped;
  };

  const groupedRecords = groupRecordsByDate();
  const years = Object.keys(groupedRecords).sort((a, b) => parseInt(b) - parseInt(a));

  // Filter by search term and year
  const filteredYears = years.filter(year => {
    if (filterYear !== 'All' && year !== filterYear) return false;
    
    if (!searchTerm) return true;
    
    // Search through patients in this year
    return Object.values(groupedRecords[year]).some(months =>
      Object.values(months).some(days =>
        days.some(dayData =>
          dayData.some(entry =>
            `${entry.patient.firstName} ${entry.patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.patient.patientNumber?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      )
    );
  });

  const getTotalPatientsInYear = (year: string): number => {
    return Object.values(groupedRecords[year]).reduce((total, months) =>
      total + Object.values(months).reduce((monthTotal, days) =>
        monthTotal + days.length, 0), 0);
  };

  const getTotalRecordsInYear = (year: string): number => {
    return Object.values(groupedRecords[year]).reduce((total, months) =>
      total + Object.values(months).reduce((monthTotal, days) =>
        monthTotal + days.reduce((dayTotal, entry) => dayTotal + entry.records.length, 0), 0), 0);
  };

  const handleAddRecord = (recordData: any) => {
    console.log('Adding new medical record:', recordData);
    // In a real app, this would make an API call
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header with Search and Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 gap-4">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1 w-full">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search patients or records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm lg:text-base"
            />
          </div>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-3 lg:px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm lg:text-base"
          >
            <option value="All">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm lg:text-base w-full sm:w-auto justify-center"
        >
          <Plus className="h-4 w-4" />
          <span>Add Record</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow-soft">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="bg-primary-100 p-1.5 lg:p-2 rounded-lg">
              <Users className="h-4 w-4 lg:h-5 lg:w-5 text-primary-600" />
            </div>
            <div>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{mockPatients.length}</p>
              <p className="text-xs lg:text-sm text-gray-600">Total Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow-soft">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="bg-medical-100 p-1.5 lg:p-2 rounded-lg">
              <FileText className="h-4 w-4 lg:h-5 lg:w-5 text-medical-600" />
            </div>
            <div>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{mockMedicalRecords.length}</p>
              <p className="text-xs lg:text-sm text-gray-600">Total Records</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow-soft">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="bg-warning-100 p-1.5 lg:p-2 rounded-lg">
              <Calendar className="h-4 w-4 lg:h-5 lg:w-5 text-warning-600" />
            </div>
            <div>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{years.length}</p>
              <p className="text-xs lg:text-sm text-gray-600">Active Years</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow-soft">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="bg-danger-100 p-1.5 lg:p-2 rounded-lg">
              <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-danger-600" />
            </div>
            <div>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">
                {mockMedicalRecords.filter(r => {
                  const recordDate = parseISO(r.date);
                  const today = new Date();
                  return format(recordDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
                }).length}
              </p>
              <p className="text-xs lg:text-sm text-gray-600">Today's Records</p>
            </div>
          </div>
        </div>
      </div>

      {/* File System Structure */}
      <div className="bg-white rounded-xl shadow-soft p-4 lg:p-6">
        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6 flex items-center">
          <Folder className="h-5 w-5 mr-2 text-primary-600" />
          Medical Records Archive
        </h3>

        <div className="space-y-2">
          {filteredYears.map(year => (
            <div key={year} className="border border-gray-200 rounded-lg">
              {/* Year Folder */}
              <button
                onClick={() => setExpandedYear(expandedYear === year ? null : year)}
                className="w-full flex items-center justify-between p-3 lg:p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {expandedYear === year ? (
                    <FolderOpen className="h-5 w-5 text-primary-600" />
                  ) : (
                    <Folder className="h-5 w-5 text-gray-600" />
                  )}
                  <span className="font-semibold text-gray-900 text-sm lg:text-base">
                    {year}
                  </span>
                  <div className="flex space-x-4 text-xs lg:text-sm text-gray-500">
                    <span>{getTotalPatientsInYear(year)} patients</span>
                    <span>{getTotalRecordsInYear(year)} records</span>
                  </div>
                </div>
                <div className="text-xs lg:text-sm text-gray-400">
                  {Object.keys(groupedRecords[year]).length} months
                </div>
              </button>

              {/* Months */}
              {expandedYear === year && (
                <div className="border-t border-gray-200 bg-gray-50">
                  {Object.entries(groupedRecords[year]).map(([month, days]) => (
                    <div key={month} className="border-b border-gray-100 last:border-b-0">
                      <button
                        onClick={() => setExpandedMonth(expandedMonth === `${year}-${month}` ? null : `${year}-${month}`)}
                        className="w-full flex items-center justify-between p-3 lg:p-4 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3 ml-6">
                          {expandedMonth === `${year}-${month}` ? (
                            <FolderOpen className="h-4 w-4 text-primary-600" />
                          ) : (
                            <Folder className="h-4 w-4 text-gray-600" />
                          )}
                          <span className="font-medium text-gray-800 text-sm lg:text-base">{month}</span>
                          <span className="text-xs lg:text-sm text-gray-500">
                            {Object.values(days).reduce((total, dayData) => total + dayData.length, 0)} patients
                          </span>
                        </div>
                        <div className="text-xs lg:text-sm text-gray-400">
                          {Object.keys(days).length} days
                        </div>
                      </button>

                      {/* Days */}
                      {expandedMonth === `${year}-${month}` && (
                        <div className="bg-white border-t border-gray-200">
                          {Object.entries(days).map(([day, dayData]) => (
                            <div key={day} className="border-b border-gray-100 last:border-b-0">
                              <button
                                onClick={() => setExpandedDay(expandedDay === `${year}-${month}-${day}` ? null : `${year}-${month}-${day}`)}
                                className="w-full flex items-center justify-between p-3 lg:p-4 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex items-center space-x-3 ml-12">
                                  {expandedDay === `${year}-${month}-${day}` ? (
                                    <FolderOpen className="h-4 w-4 text-primary-600" />
                                  ) : (
                                    <Folder className="h-4 w-4 text-gray-600" />
                                  )}
                                  <span className="font-medium text-gray-700 text-sm lg:text-base">
                                    {day} {month} {year}
                                  </span>
                                  <span className="text-xs lg:text-sm text-gray-500">
                                    {dayData.length} admission{dayData.length !== 1 ? 's' : ''}
                                  </span>
                                </div>
                              </button>

                              {/* Patient Files */}
                              {expandedDay === `${year}-${month}-${day}` && (
                                <div className="bg-gray-50 border-t border-gray-200">
                                  {dayData.map((entry) => (
                                    <div key={entry.patientId} className="p-3 lg:p-4 ml-16 border-b border-gray-200 last:border-b-0">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                          <FileText className="h-4 w-4 text-medical-600" />
                                          <div>
                                            <p className="font-medium text-gray-900 text-sm lg:text-base">
                                              {entry.patient.firstName} {entry.patient.lastName}
                                            </p>
                                            <div className="flex items-center space-x-4 text-xs lg:text-sm text-gray-500">
                                              <span>ID: {entry.patient.patientNumber}</span>
                                              <span>{entry.records.length} record{entry.records.length !== 1 ? 's' : ''}</span>
                                              <span>Admitted: {format(parseISO(entry.admissionDate), 'h:mm a')}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <button
                                            onClick={() => setSelectedPatient(entry)}
                                            className="flex items-center space-x-1 px-2 lg:px-3 py-1 bg-primary-50 text-primary-600 rounded hover:bg-primary-100 text-xs lg:text-sm"
                                          >
                                            <Eye className="h-3 w-3" />
                                            <span>View</span>
                                          </button>
                                          <button className="flex items-center space-x-1 px-2 lg:px-3 py-1 bg-medical-50 text-medical-600 rounded hover:bg-medical-100 text-xs lg:text-sm">
                                            <Download className="h-3 w-3" />
                                            <span>Export</span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredYears.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400 mx-auto mt-2" />
            </div>
            <p className="text-gray-500">No medical records found.</p>
          </div>
        )}
      </div>

      {/* Patient Record Modal */}
      {selectedPatient && (
        <PatientRecordModal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          patientData={selectedPatient}
        />
      )}

      {/* Add Record Modal */}
      <AddRecordModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddRecord}
      />
    </div>
  );
};