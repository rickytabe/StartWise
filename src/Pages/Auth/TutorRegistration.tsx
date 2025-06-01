// pages/auth/RegisterTutor.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../Utils/Validation';
import Button from '../../Components/shared/Button';
import Input from '../../Components/shared/InputForm';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaPhone, 
  FaEye,
  FaEyeSlash 
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { registerTutor } from '../../services/auth';

const RegisterTutor = () => {
  const {isLoading, error } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    skills: [] as string[],
    yearsOfExperience: 0,
    hourlyRate: 0,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'skills') {
      const options = e.target as HTMLSelectElement;
      const selectedSkills = Array.from(options.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, [name]: selectedSkills }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) || 0 }));
    
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof typeof formData] as string);
  };

  const validateField = (name: string, value: string | number | string[]) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value || (typeof value === 'string' && !validateEmail(value))) {
          error = 'Invalid email address';
        }
        break;
      case 'password':
        if (!value || (typeof value === 'string' && !validatePassword(value))) {
          error = 'Password must be at least 6 characters';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
      case 'yearsOfExperience':
        if (Number(value) < 0) {
          error = 'Experience cannot be negative';
        }
        break;
      case 'hourlyRate':
        if (Number(value) < 0) {
          error = 'Hourly rate cannot be negative';
        }
        break;
      case 'skills':
        if (Array.isArray(value) && value.length === 0) {
          error = 'Please select at least one skill';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key as keyof typeof formData]);
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerTutor) {
      console.error("registerTutor is not defined");
      return;
    }
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);
    
    if (!validateForm()) return;
    
    try {
      await registerTutor(
        formData.email,
        formData.password,
        {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          skills: formData.skills,
          yearsOfExperience: formData.yearsOfExperience,
          hourlyRate: formData.hourlyRate,
          rating: 0,
          bio: '',
        }
      );
      
      navigate('/tutor/dashboard');
    } catch (err) {
      console.error("Error during registration:", err);
      toast.error("Registration failed. Please try again.");
      setErrors(prev => ({ ...prev, form: 'Registration failed. Please try again.' }));
    }
  };

  const skillOptions = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'UI/UX Design',
    'DevOps',
    'Cloud Computing',
    'Cybersecurity',
    'Blockchain',
    'Product Management',
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-blue-600">Become a Mentor</h2>
          <p className="mt-2 text-sm text-gray-600">
            Share your expertise and guide the next generation of tech professionals
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <p className="mb-4 text-red p-4 rounded-b-md">
              {typeof error === 'string' ? error : (error as Error).message}
            </p>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full pl-10 rounded-md border p-2 ${
                      errors.name && touched.name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    } shadow-sm sm:text-sm`}
                    required
                  />
                </div>
                {errors.name && touched.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full pl-10 rounded-md border p-2 ${
                      errors.email && touched.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    } shadow-sm sm:text-sm`}
                    required
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password Field */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full pl-10 pr-10 rounded-md border p-2 ${
                      errors.password && touched.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    } shadow-sm sm:text-sm`}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              
              {/* Confirm Password Field */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full pl-10 pr-10 rounded-md border p-2 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    } shadow-sm sm:text-sm`}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            
            {/* Phone Number Input */}
            <div className="relative">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full pl-10 rounded-md border p-2 ${
                      errors.phoneNumber && touched.phoneNumber
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    } shadow-sm sm:text-sm`}
                    required
                  />
                </div>
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>
            
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <select
                multiple
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                  errors.skills ? 'border-red-500' : 'border'
                }`}
                size={5}
                required
              >
                {skillOptions.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple skills</p>
              {errors.skills && (
                <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Years of Experience"
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="number"
                min="0"
                value={formData.yearsOfExperience.toString()}
                onChange={handleNumberChange}
                onBlur={handleBlur}
                error={errors.yearsOfExperience}
                touched={touched.yearsOfExperience}
                required
              />
              
              <Input
                label="Hourly Rate (XAF)"
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                min="0"
                step="1"
                value={formData.hourlyRate.toString()}
                onChange={handleNumberChange}
                onBlur={handleBlur}
                error={errors.hourlyRate}
                touched={touched.hourlyRate}
                required
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Become a Tutor'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

          </div>
          
          <div className="mt-6 text-center">
            <Link 
              to="/login/mentor" 
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTutor;