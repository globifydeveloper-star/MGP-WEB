// Validation Helpers for Forms
export const validateName = (name: string): string | null => {
  if (!name || name.trim() === '') {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return 'Name can only contain letters and spaces';
  }
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone || phone.trim() === '') {
    return 'Mobile number is required';
  }
  if (!/^\d{10}$/.test(phone.trim())) {
    return 'Please enter a valid 10-digit mobile number';
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validateRequired = (value: unknown, fieldName: string): string | null => {
  if (value === undefined || value === null || value === '' || (typeof value === 'boolean' && !value)) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateOtp = (otp: string): string | null => {
  if (!otp || otp.trim() === '') {
    return 'OTP is required';
  }
  if (!/^\d{6}$/.test(otp.trim())) {
    return 'Please enter a valid 6-digit OTP';
  }
  return null;
};
