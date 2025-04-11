const STORAGE_KEY = 'age_verified';

export const isAgeVerified = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) === 'true';
};

export const setAgeVerified = (): void => {
  localStorage.setItem(STORAGE_KEY, 'true');
};

export const clearAgeVerification = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
