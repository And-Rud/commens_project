import axios from "axios";

export const getDataFromServer = async (url) => {
  try {
    const response = await axios.get(`${url}`);
    const data = response.data;
    console.log("response", response.data);

    if (response) {
      console.log("response", response);
    } else {
      console.log("response", response);
    }
    console.log("Відповідь від сервера:", data);
  } catch (error) {
    console.log("Помилка відправки запиту:", error);
  }
};
