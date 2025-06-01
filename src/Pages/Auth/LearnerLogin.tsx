// pages/auth/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateEmail } from '../../Utils/Validation';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

const LearnerLogin = () => { // Renamed from Login to LearnerLogin to match file name
  const { loginwithEmail, loginWithGoogle, isLoading } = useAuth(); // Using LearnerGoogleLogin with alias
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);

  // InputField component (replicated from LearnerRegistration.tsx)
  const InputField = ({
    id, name, type, value, onChange, onBlur, placeholder, icon, error, touched, showPasswordToggle = false, showPassword = false, setShowPassword, required = true
  }: {
    id: string; name: string; type: string; value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string; icon: React.ReactNode; error?: string; touched?: boolean;
    showPasswordToggle?: boolean; showPassword?: boolean; setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>; required?: boolean;
  }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {placeholder}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          id={id} name={name} type={type === "password" && showPassword ? "text" : type}
          value={value} onChange={onChange} onBlur={onBlur}
          className={`block w-full pl-10 pr-10 py-3 rounded-lg border ${
            error && touched ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          } shadow-sm transition duration-200 focus:outline-none focus:ring-2`}
          required={required}
        />
        {showPasswordToggle && setShowPassword && (
          <button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
        {error && touched && (<div className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500"><FiAlertCircle /></div>)}
      </div>
      {error && touched && (<p className="mt-1 text-sm text-red-600 flex items-center"><FiAlertCircle className="mr-1" /> {error}</p>)}
    </div>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof typeof formData]);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'email':
        if (!value) error = 'Email is required';
        else if (!validateEmail(value)) error = 'Invalid email format';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const getFirebaseError = (errorCode: string) => {
    switch (errorCode) {
      case "auth/user-not-found": return "No user found with this email.";
      case "auth/wrong-password": return "Incorrect password.";
      case "auth/invalid-email": return "Invalid email format.";
      case "auth/too-many-requests": return "Too many login attempts. Please try again later.";
      case "auth/user-disabled": return "This account has been disabled.";
      default: return "Login failed. Please check your credentials.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    });
    
    // Validate form
    validateField('email', formData.email);
    validateField('password', formData.password);
    
    const currentErrors = {
      email: errors.email || (!formData.email ? 'Email is required' : ''),
      password: errors.password || (!formData.password ? 'Password is required' : '')
    };
    if (Object.values(currentErrors).some(error => error)) {
      setErrors(currentErrors);
      toast.error("Please fix the errors in the form");
      return;
    }
    
    try {
      await loginwithEmail(formData.email, formData.password);
      toast.success("Logged in successfully! Redirecting...");
      navigate('/mentee_dashboard/profile'); // Or appropriate dashboard
    } catch (err: any) {
      const errorMessage = err.code ? getFirebaseError(err.code) : (err.message || "Login failed");
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle('mentee'); // Specify role
      toast.success("Signed in with Google! Redirecting...");
      navigate('/mentee_dashboard/profile'); // Or appropriate dashboard
    } catch (err: any) {
      // Error is already toasted by AuthContext's loginWithGoogle
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <FaLock className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Learner Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/register/mentee" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 transform transition-all duration-300 hover:shadow-2xl">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <InputField
              id="email" name="email" type="email" value={formData.email}
              onChange={handleChange} onBlur={handleBlur} placeholder="Email Address"
              icon={<FaEnvelope />} error={errors.email} touched={touched.email}
            />

            {/* Password Input */}
            <InputField
              id="password" name="password" type="password" value={formData.password}
              onChange={handleChange} onBlur={handleBlur} placeholder="Password"
              icon={<FaLock />} error={errors.password} touched={touched.password}
              showPasswordToggle={true} showPassword={showPassword} setShowPassword={setShowPassword}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-black hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading && (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
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

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full inline-flex justify-center items-center py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
                Sign in with Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register/mentee" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerLogin;