export const checkValidData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPasswordValid =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/.test(password);

  if (!isEmailValid) return "Email ID is not valid. It should be in the format 'example@domain.com'.";
  if (!isPasswordValid) {
    return "Password is not valid. It must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  return null;
};
