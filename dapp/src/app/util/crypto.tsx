const API_URL = "http://localhost:7385";

export const encrypt = async (key: string, value: string) => {
  const response = await fetch(`${API_URL}/encrypt`, {
    method: "POST",
    body: JSON.stringify({ key, value }),
    headers: {
      "Content-Type": "application/json",
    }
  });
  const data = await response.json();
  return data;
};

export const decrypt = async (key: string, value: string) => {
  const response = await fetch(`${API_URL}/decrypt`, {
    method: "POST",
    body: JSON.stringify({ key, value }),
    headers: {
      "Content-Type": "application/json",
    }
  });
  const data = await response.json();
  return data;
};