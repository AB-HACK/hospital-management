import React, { useState } from 'react';
import { Bed, Plus, Filter, Users, AlertCircle, CheckCircle, UserPlus, UserMinus, Wrench } from 'lucide-react';
import { mockRooms, mockPatients } from '../../data/mockData';

export const RoomManagement: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [rooms, setRooms] = useState(mockRooms);

  const filteredRooms = rooms.filter(room => 
    statusFilter === 'All' || room.status === statusFilter
  );

  const handleRoomStatusChange = (roomId: string, newStatus: string, patientId?: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, status: newStatus as any, patientId: newStatus === 'Occupied' ? patientId : undefined }
        : room
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available': return <CheckCircle className="h-4 w-4 text-medical-600" />;
      case 'Occupied': return <Users className="h-4 w-4 text-primary-600" />;
      case 'Maintenance': return <AlertCircle className="h-4 w-4 text-warning-600" />;
      case 'Reserved': return <Bed className="h-4 w-4 text-gray-600" />;
      default: return <Bed className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-medical-100 text-medical-700 border-medical-200';
      case 'Occupied': return 'bg-primary-100 text-primary-700 border-primary-200';
      case 'Maintenance': return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'Reserved': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'ICU': return 'bg-danger-100 text-danger-700';
      case 'Emergency': return 'bg-warning-100 text-warning-700';
      case 'Surgery': return 'bg-primary-100 text-primary-700';
      case 'Private': return 'bg-medical-100 text-medical-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow-soft">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="bg-medical-100 p-1.5 lg:p-2 rounded-lg">
              <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-medical-600" />
            </div>
            <div>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">
                {rooms.filter(r => r.status === 'Available').length}
              </p>
              <p className="text-xs lg:text-sm text-gray-600">Available</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow-soft">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="bg-primary-100 p-1.5 lg:p-2 rounded-lg">
              <Users className="h-4 w-4 lg:h-5 lg:w-5 text-primary-600" />
            </div>
            <div>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">
                {rooms.filter(r => r.status === 'Occupied').length}
              </p>
              <p className="text-xs lg:text-sm text-gray-600">Occupied</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow-soft">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="bg-warning-100 p-1.5 lg:p-2 rounded-lg">
              <AlertCircle className="h-4 w-4 lg:h-5 lg:w-5 text-warning-600" />
            </div>
            <div>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">
                {rooms.filter(r => r.status === 'Maintenance').length}
              </p>
              <p className="text-xs lg:text-sm text-gray-600">Maintenance</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 lg:p-4 rounded-lg shadow-soft">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="bg-gray-100 p-1.5 lg:p-2 rounded-lg">
              <Bed className="h-4 w-4 lg:h-5 lg:w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{rooms.length}</p>
              <p className="text-xs lg:text-sm text-gray-600">Total Rooms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 lg:px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm lg:text-base"
        >
          <option value="All">All Rooms</option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Reserved">Reserved</option>
        </select>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm lg:text-base w-full sm:w-auto justify-center">
          <Plus className="h-4 w-4" />
          <span>Add Room</span>
        </button>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredRooms.map((room) => {
          const patient = room.patientId ? mockPatients.find(p => p.id === room.patientId) : null;
          
          return (
            <div key={room.id} className="bg-white rounded-xl shadow-soft p-4 lg:p-6 hover:shadow-soft-lg transition-shadow">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className={`p-1.5 lg:p-2 rounded-lg border ${getStatusColor(room.status)}`}>
                    {getStatusIcon(room.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Room {room.roomNumber}</h3>
                    <p className="text-xs lg:text-sm text-gray-600">Floor {room.floor}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoomTypeColor(room.type)}`}>
                  {room.type}
                </span>
              </div>

              <div className="space-y-2 lg:space-y-3 mb-3 lg:mb-4">
                <div className="flex justify-between text-xs lg:text-sm">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-medium">{room.capacity} bed{room.capacity > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between text-xs lg:text-sm">
                  <span className="text-gray-600">Daily Rate</span>
                  <span className="font-medium">${room.dailyRate}</span>
                </div>
                <div className="flex justify-between text-xs lg:text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${
                    room.status === 'Available' ? 'text-medical-600' :
                    room.status === 'Occupied' ? 'text-primary-600' :
                    room.status === 'Maintenance' ? 'text-warning-600' :
                    'text-gray-600'
                  }`}>
                    {room.status}
                  </span>
                </div>
              </div>

              {patient && (
                <div className="bg-gray-50 p-2 lg:p-3 rounded-lg mb-3 lg:mb-4">
                  <p className="text-xs lg:text-sm font-medium text-gray-700">Current Patient</p>
                  <p className="text-xs lg:text-sm text-gray-600">{patient.firstName} {patient.lastName}</p>
                  <p className="text-xs text-gray-500">{patient.phoneNumber}</p>
                </div>
              )}

              <div className="mb-3 lg:mb-4">
                <p className="text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Equipment</p>
                <div className="flex flex-wrap gap-1">
                  {room.equipment.map((item, index) => (
                    <span key={index} className="px-1.5 lg:px-2 py-0.5 lg:py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                {room.status === 'Available' && (
                  <button
                    onClick={() => handleRoomStatusChange(room.id, 'Occupied', mockPatients[0]?.id)}
                    className="flex items-center justify-center space-x-1 flex-1 bg-primary-50 text-primary-600 py-1.5 lg:py-2 px-2 lg:px-3 rounded-lg hover:bg-primary-100 transition-colors text-xs lg:text-sm font-medium"
                  >
                    <UserPlus className="h-3 w-3" />
                    <span>Assign Patient</span>
                  </button>
                )}
                {room.status === 'Occupied' && (
                  <button
                    onClick={() => handleRoomStatusChange(room.id, 'Available')}
                    className="flex items-center justify-center space-x-1 flex-1 bg-medical-50 text-medical-600 py-1.5 lg:py-2 px-2 lg:px-3 rounded-lg hover:bg-medical-100 transition-colors text-xs lg:text-sm font-medium"
                  >
                    <UserMinus className="h-3 w-3" />
                    <span>Discharge</span>
                  </button>
                )}
                {room.status === 'Maintenance' && (
                  <button
                    onClick={() => handleRoomStatusChange(room.id, 'Available')}
                    className="flex items-center justify-center space-x-1 flex-1 bg-warning-50 text-warning-600 py-1.5 lg:py-2 px-2 lg:px-3 rounded-lg hover:bg-warning-100 transition-colors text-xs lg:text-sm font-medium"
                  >
                    <CheckCircle className="h-3 w-3" />
                    <span>Mark Ready</span>
                  </button>
                )}
                {room.status === 'Available' && (
                  <button
                    onClick={() => handleRoomStatusChange(room.id, 'Maintenance')}
                    className="flex items-center justify-center space-x-1 px-2 lg:px-3 py-1.5 lg:py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-xs lg:text-sm"
                  >
                    <Wrench className="h-3 w-3" />
                  </button>
                )}
                <button className="px-2 lg:px-3 py-1.5 lg:py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-xs lg:text-sm">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <Bed className="h-8 w-8 text-gray-400 mx-auto mt-2" />
          </div>
          <p className="text-gray-500">No rooms found.</p>
        </div>
      )}
    </div>
  );
};