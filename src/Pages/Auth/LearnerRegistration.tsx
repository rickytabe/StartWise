// pages/auth/RegisterLearner.tsx
import React, { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaCalendar,
  FaTransgender,
  FaEye,
  FaEyeSlash,
  FaGoogle
} from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

// Custom Input Component
const InputField = ({
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  icon,
  error,
  touched,
  showPasswordToggle = false,
  showPassword = false,
  setShowPassword,
  required = true
}: {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon: React.ReactNode;
  error?: string;
  touched?: boolean;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  required?: boolean;
}, 

) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {placeholder}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        id={id}
        name={name}
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`block w-full pl-10 pr-10 py-3 rounded-lg border ${
          error && touched
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        } shadow-sm transition duration-200 focus:outline-none focus:ring-2`}
        required={required}
      />
      {showPasswordToggle && setShowPassword && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
      {error && touched && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <FiAlertCircle className="h-5 w-5 text-red-500" />
        </div>
      )}
    </div>
    {error && touched && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <FiAlertCircle className="mr-1" /> {error}
      </p>
    )}
  </div>
);

// Custom Select Component
const SelectField = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  options,
  icon,
  placeholder
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  icon: React.ReactNode;
  placeholder: string;
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {placeholder}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="block w-full pl-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm appearance-none bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
);

const RegisterLearner = () => {
  const { registerLearner, isLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dob: "",
    sex: "other" as "male" | "female" | "other",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Firebase error mapping
  const getFirebaseError = (errorCode: string) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Email is already in use. Please use a different email.";
      case "auth/invalid-email":
        return "Invalid email address. Please enter a valid email.";
      case "auth/weak-password":
        return "Password is too weak. It should be at least 6 characters.";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled.";
      case "auth/too-many-requests":
        return "Too many requests. Please try again later.";
      default:
        return "An error occurred during registration. Please try again.";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof typeof formData]);
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.length < 2) error = "Name is too short";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (value !== formData.password) error = "Passwords do not match";
        break;
      case "phoneNumber":
        if (!/^\+?[0-9]{10,15}$/.test(value)) error = "Invalid phone number";
        break;
      case "dob":
        if (!value) error = "Date of birth is required";
        else if (new Date(value) > new Date()) error = "Invalid date of birth";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof typeof formData]);
    });

    setErrors(newErrors);
    return Object.keys(newErrors).every(key => !newErrors[key]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const newTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(newTouched);

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      await registerLearner(formData.email, formData.password, {
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        dob: userData.dob,
        sex: userData.sex,
        level: "beginner",
        completedMentorships: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      toast.success("Account created successfully! Redirecting to dashboard...");
      setTimeout(() => navigate("/mentee_dashboard/profile"), 2000);
    } catch (err: any) {
      console.error("Registration error:", err);
      const errorMessage = err.code ? getFirebaseError(err.code) : err.message || "Registration failed";
      toast.error(errorMessage);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
     
      toast.info("Google signup functionality would be implemented here");
    } catch (err: any) {
      const errorMessage = err.code ? getFirebaseError(err.code) : err.message || "Google signup failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <FaLock className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create Learner Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w">
            Join our community of learners and mentors
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 transform transition-all duration-300 hover:shadow-2xl">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Full Name"
              icon={<FaUser />}
              error={errors.name}
              touched={touched.name}
            />

            <InputField
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email Address"
              icon={<FaEnvelope />}
              error={errors.email}
              touched={touched.email}
            />

            <InputField
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              icon={<FaLock />}
              error={errors.password}
              touched={touched.password}
              showPasswordToggle={true}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            <InputField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              icon={<FaLock />}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              showPasswordToggle={true}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Phone Number"
                icon={<FaPhone />}
                error={errors.phoneNumber}
                touched={touched.phoneNumber}
              />

              <InputField
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Date of Birth"
                icon={<FaCalendar />}
                error={errors.dob}
                touched={touched.dob}
              />
            </div>

            <SelectField
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              onBlur={handleBlur}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
              icon={<FaTransgender />}
              placeholder="Gender"
            />

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                className="w-full inline-flex justify-center items-center py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
                Sign up with Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>By registering, you agree to our Terms and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterLearner;