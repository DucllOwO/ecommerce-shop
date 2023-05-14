import axios from "axios";

const BASE_URL = "http://localhost:1205/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});