/**
 * Validate email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password
 */
export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate phone number (Indian)
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate name
 */
export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return {
      isValid: false,
      error: "Name must be at least 2 characters",
    };
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return {
      isValid: false,
      error: "Name can only contain letters and spaces",
    };
  }

  return { isValid: true };
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim().length === 0) {
    return {
      isValid: false,
      error: `${fieldName} is required`,
    };
  }
  return { isValid: true };
};

/**
 * Validate form
 */
export const validateForm = (fields) => {
  const errors = {};
  let isValid = true;

  Object.keys(fields).forEach((key) => {
    const field = fields[key];

    if (field.required && !field.value) {
      errors[key] = `${field.label} is required`;
      isValid = false;
    }

    if (field.type === "email" && field.value && !validateEmail(field.value)) {
      errors[key] = "Invalid email address";
      isValid = false;
    }

    if (field.type === "phone" && field.value && !validatePhone(field.value)) {
      errors[key] = "Invalid phone number";
      isValid = false;
    }

    if (
      field.minLength &&
      field.value &&
      field.value.length < field.minLength
    ) {
      errors[key] =
        `${field.label} must be at least ${field.minLength} characters`;
      isValid = false;
    }

    if (
      field.maxLength &&
      field.value &&
      field.value.length > field.maxLength
    ) {
      errors[key] =
        `${field.label} must not exceed ${field.maxLength} characters`;
      isValid = false;
    }
  });

  return { isValid, errors };
};
