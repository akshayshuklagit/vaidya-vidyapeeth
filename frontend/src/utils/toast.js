import { toast } from "sonner";

// Track recent toasts to prevent duplicates
const recentToasts = new Set();
const DUPLICATE_TIMEOUT = 1000; // 1 second

// Helper to prevent duplicate toasts
const preventDuplicate = (message, type) => {
  const key = `${type}:${message}`;
  if (recentToasts.has(key)) {
    return false;
  }
  recentToasts.add(key);
  setTimeout(() => recentToasts.delete(key), DUPLICATE_TIMEOUT);
  return true;
};

// Success toast
export const showSuccess = (message, options = {}) => {
  if (!preventDuplicate(message, 'success')) return;
  return toast.success(message, {
    duration: 2000,
    ...options,
  });
};

// Error toast
export const showError = (message, options = {}) => {
  if (!preventDuplicate(message, 'error')) return;
  return toast.error(message, {
    duration: 3000,
    ...options,
  });
};

// Info toast
export const showInfo = (message, options = {}) => {
  if (!preventDuplicate(message, 'info')) return;
  return toast.info(message, {
    duration: 2000,
    ...options,
  });
};

// Warning toast
export const showWarning = (message, options = {}) => {
  if (!preventDuplicate(message, 'warning')) return;
  return toast.warning(message, {
    duration: 2000,
    ...options,
  });
};

// Loading toast
export const showLoading = (message, options = {}) => {
  return toast.loading(message, {
    ...options,
  });
};

// Promise toast
export const showPromise = (promise, messages, options = {}) => {
  return toast.promise(promise, {
    loading: messages.loading || "Loading...",
    success: messages.success || "Success!",
    error: messages.error || "Something went wrong!",
    ...options,
  });
};

// Custom toast
export const showCustom = (message, options = {}) => {
  return toast(message, {
    duration: 4000,
    ...options,
  });
};

// Dismiss all toasts
export const dismissAll = () => {
  toast.dismiss();
};

// Dismiss specific toast
export const dismiss = (toastId) => {
  toast.dismiss(toastId);
};