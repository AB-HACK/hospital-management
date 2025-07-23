import React, { useState } from 'react';
import { X, User, Lock, AlertCircle, CheckCircle, Key } from 'lucide-react';
import { patients, signupCodes } from '../../data/mockData';

interface PatientAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (patient: any) => void;
}

const PatientAuthModal: React.FC<PatientAuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  // UI state
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    signupCode: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find patient in mock data
    const patient = patients.find(p => 
      p.username === loginData.username && p.password === loginData.password
    );

    if (patient) {
      onLogin(patient);
      handleClose();
    } else {
      setError('Invalid username or password');
    }

    setIsLoading(false);
  };

  // Handle signup form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validate passwords match
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate signup code
    if (!signupCodes.includes(signupData.signupCode)) {
      setError('Invalid signup code. Please contact the hospital for a valid code.');
      setIsLoading(false);
      return;
    }

    // Check if username already exists
    if (patients.some(p => p.username === signupData.username)) {
      setError('Username already exists. Please choose a different one.');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create new patient
    const newPatient = {
      id: `PT${String(patients.length + 1).padStart(3, '0')}`,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      phone: signupData.phone,
      dateOfBirth: signupData.dateOfBirth,
      username: signupData.username,
      password: signupData.password,
      createdAt: new Date().toISOString(),
      appointments: [],
      medicalRecords: [],
      bills: []
    };

    // Add to patients array (in real app, this would be an API call)
    patients.push(newPatient);

    setSuccess('Account created successfully! You can now log in.');
    setIsSignup(false);
    resetForms();
    setIsLoading(false);
  };

  // Reset all forms
  const resetForms = () => {
    setLoginData({ username: '', password: '' });
    setSignupData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      signupCode: '',
      username: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
  };

  // Handle modal close
  const handleClose = () => {
    resetForms();
    setIsSignup(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">
            {isSignup ? 'Create Account' : 'Patient Login'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Success Message */}
          {success && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg mb-6">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-700 text-sm">{success}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-6">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Login Form */}
          {!isSignup ? (
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Demo Patient Login:</h4>
                <p className="text-sm text-blue-700"><strong>Username:</strong> john.doe</p>
                <p className="text-sm text-blue-700"><strong>Password:</strong> patient123</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Switch to Signup */}
              <div className="text-center">
                <p className="text-gray-600">
                  New patient?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignup(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* Signup Form */
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={signupData.firstName}
                    onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={signupData.lastName}
                    onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    value={signupData.dateOfBirth}
                    onChange={(e) => setSignupData({...signupData, dateOfBirth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Signup Code */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Hospital Signup Code</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={signupData.signupCode}
                    onChange={(e) => setSignupData({...signupData, signupCode: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter code provided by hospital"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Demo codes: HSP2024001, HSP2024002, MED2024001
                </p>
              </div>

              {/* Account Credentials */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={signupData.username}
                  onChange={(e) => setSignupData({...signupData, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Switch to Login */}
              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignup(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientAuthModal;