import { useAuth } from "@clerk/clerk-react";

export const useApi = () => {
  const { getToken } = useAuth();

  const makeRequest = async (endpoint, options = {}) => {
    const token = await getToken();
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`http://localhost:8000/api/${endpoint}`, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (response.status === 429) {
        throw new Error("Unauthorized access. Please log in.");
      }
      throw new Error(
        errorData?.detail || "An error occurred while processing your request."
      );
    }
    return response.json();
  };
  return { makeRequest };
};