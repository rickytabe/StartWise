// utils/validation.ts
export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };
  
  export const validatePhone = (phone: string): boolean => {
    // Basic international phone validation
    const re = /^[0-9]{9,15}$/;
    return re.test(phone);
  };
  
  export const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };
  
  export const validateDOB = (dob: string): boolean => {
    if (!dob) return false;
    const dobDate = new Date(dob);
    const today = new Date();
    return dobDate < today;
  };