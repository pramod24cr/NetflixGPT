const errorMessages = {
    "auth/email-already-in-use": "This email is already registered. Try signing in instead.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-disabled": "This account has been disabled. Contact support for assistance.",
    "auth/user-not-found": "No account found with this email. Please check or sign up.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/weak-password": "Password should be at least 6 characters long.",
    "auth/missing-email": "Email address is required.",
    "auth/missing-password": "Password is required.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
    "auth/too-many-requests": "Too many failed attempts. Try again later.",
    "auth/internal-error": "An unexpected error occurred. Please try again.",
    "auth/invalid-credential": "Invalid credentials. Please check your email and password.",
  };
  
  export const getAuthErrorMessage = (errorCode) => {
    return errorMessages[errorCode] || "An unknown error occurred. Please try again.";
  };
  
  