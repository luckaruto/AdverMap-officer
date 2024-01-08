import axios from "axios";
export const api = axios.create({
	//baseURL: process.env.BE_API,
	baseURL: "http://localhost:8081",
	timeout: 5000,
  });