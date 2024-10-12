const API_URL = "https://localhost:7385";

export const encrypt = async (key: string, value: string) => {
  const response = await fetch(`${API_URL}/encrypt`, {
    method: "POST",
    body: JSON.stringify({ key, value }),
  });
  const data = await response.json();
  return data;
};

export const decrypt = async (key: string, value: string) => {
  const response = await fetch(`${API_URL}/decrypt`, {
    method: "POST",
    body: JSON.stringify({ key, value }),
  });
  const data = await response.json();
  return data;
};