export const API = (method: string, url: any, data?: any) => {
  return {
    method: method,
    url: `http://localhost:3005/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: data,
  };
};