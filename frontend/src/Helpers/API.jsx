import axios from "axios";

const BASE_URL = "http://localhost:3000/";

export const GET = async (endpoint) => {
  try {
    const res = await axios.get(BASE_URL + endpoint, {
      headers: { "Content-Type": "application/json" },
    });
    if (res.status == 201 || res.status == 200) {
      return res.data;
    } else {
      throw new Error(JSON.stringify(res.data));
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Server unreachable");
    }
  }
};

export const POST = async (endpoint, body) => {
  try {
    const token = localStorage.getItem("token")
    const res = await axios.post(BASE_URL + endpoint, body, {
      headers: { "Content-Type": "application/json","Authorization":token },
    });
    if (res.status == 201 || res.status == 200) {
      return res.data;
    } else {
      throw new Error(JSON.stringify(res.data));
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Server unreachable");
    }
  }
};
