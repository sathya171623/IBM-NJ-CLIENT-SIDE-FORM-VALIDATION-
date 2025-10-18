export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.test(password);

export const validatePhone = (phone) => /^\d{10}$/.test(phone);

export const validateCardNumber = (num) => /^\d{16}$/.test(num);