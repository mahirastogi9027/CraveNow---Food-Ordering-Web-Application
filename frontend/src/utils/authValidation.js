const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{10,}$/;

export function validateEmail(email) {
  const value = email.trim();
  if (!value) return 'Email is required';
  if (!EMAIL_REGEX.test(value)) return 'Enter a valid email address';
  return '';
}

export function validatePassword(password) {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return 'Password must include at least one letter and one number';
  }
  return '';
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return '';
}

export function validateFullName(name) {
  const value = name.trim();
  if (!value) return 'Full name is required';
  if (value.length < 2) return 'Full name must be at least 2 characters';
  return '';
}

export function validatePhone(phone) {
  const value = phone.trim();
  if (!value) return 'Phone number is required';
  const digits = value.replace(/\D/g, '');
  if (digits.length < 10) return 'Enter a valid phone number';
  if (!PHONE_REGEX.test(value)) return 'Enter a valid phone number';
  return '';
}

export function validateLoginForm({ email, password }) {
  const errors = {};
  const emailError = validateEmail(email);
  const passwordError = password ? '' : 'Password is required';

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
}

export function validateSignupForm({ fullName, email, phone, password, confirmPassword }) {
  const errors = {};
  const fields = {
    fullName: validateFullName(fullName),
    email: validateEmail(email),
    phone: validatePhone(phone),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
  };

  Object.entries(fields).forEach(([key, message]) => {
    if (message) errors[key] = message;
  });

  return errors;
}
