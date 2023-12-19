import axios, { AxiosInstance, AxiosResponse } from "axios";

const API_BASE_URL = process.env.API_URL || "https://localhost:7014";
const axiosInstance: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
});

const handleError = (error: any, operation: string) => {
	console.error(error);
	throw new Error(`Failed to ${operation} data`);
};

const handleResponse = (response: AxiosResponse) => response.data;

export const getAll = async (endpoint: string) => {
	try {
		const response = await axiosInstance.get(`/${endpoint}`);
		return handleResponse(response);
	} catch (error) {
		handleError(error, "fetch");
	}
};

export const get = async (endpoint: string, id: number) => {
	try {
		const response = await axiosInstance.get(`/${endpoint}/${id}`);
		return handleResponse(response);
	} catch (error) {
		handleError(error, "fetch");
	}
};

export const getUserByEmail = async (email: string) => {
	try {
		const response = await axiosInstance.get(`/users?email=${email}`);
		return handleResponse(response);
	} catch (error) {
		handleError(error, "User already exists");
	}
};

export const create = async (endpoint: string, data: any) => {
	try {
		const response = await axiosInstance.post(`/${endpoint}`, data);
		return handleResponse(response);
	} catch (error) {
		handleError(error, "create");
	}
};

export const login = async (username: string, password: string) => {
	const data = {
		username: username,
		password: password,
	};

	try {
		const response = await axiosInstance.post(
			"api/authorization/Login",
			data
		);
		return handleResponse(response);
	} catch (error) {
		handleError(error, "login");
	}
};
export const update = async (endpoint: string, id: number, data: any) => {
	try {
		const response = await axiosInstance.put(`/${endpoint}/${id}`, data);
		return handleResponse(response);
	} catch (error) {
		handleError(error, "update");
	}
};

export const remove = async (endpoint: string, id: number) => {
	try {
		const response = await axiosInstance.delete(`/${endpoint}/${id}`);
		return handleResponse(response);
	} catch (error) {
		handleError(error, "delete");
	}
};
