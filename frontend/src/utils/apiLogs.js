import axiosClient from "../api/axios";

export const handleResponse = async (response) => {
  const endTime = new Date();
  const {
    config: {
      baseURL,
      method,
      url,
      metadata: { startTime, type },
    },
    status,
  } = response;
  const executionTime = (endTime - startTime) / 1000;
  await apiLogs({ baseURL, method, url, status, executionTime, type });
};

export const handleError = async (error) => {
  const endTime = new Date();
  const {
    config: {
      baseURL,
      method,
      url,
      metadata: { startTime },
    },
    response: { status, type },
  } = error;
  const executionTime = (endTime - startTime) / 1000;
  await apiLogs({ baseURL, method, url, status, executionTime, type });
};

export const apiLogs = async (logData) => {
  try {
    // Send log data to the backend endpoint
    await axiosClient.post("/api/logs", logData);
  } catch (error) {
    console.error("Error sending log data to backend:", error);
  }
};
