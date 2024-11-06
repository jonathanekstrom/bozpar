/* eslint-disable @typescript-eslint/no-explicit-any */
const LOCAL_STORAGE_KEY = "applicationData";

export const addToLocalStorage = (sectionKey: any, sectionData: any) => {
  if (typeof window === "undefined") return;

  const existingData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
  existingData[sectionKey] = sectionData;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData));
};

export const getApplicationData = () => {
  if (typeof window === "undefined") return null;

  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
};

export const getSectionData = (sectionKey: any) => {
  if (typeof window === "undefined") return null;

  const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
  return data[sectionKey] || null;
};

export const clearStorage = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
