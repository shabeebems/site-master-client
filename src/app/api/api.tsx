import apiClient from "@/lib/axiosClient";
import axios from "axios";

const SERVER_URI = process.env.NEXT_PUBLIC_API_BASE_URL || ''

// Check and validate datas
export const apiCheck = async (data: object, route: string) => {
    try {
        const response = await axios.post(`${SERVER_URI}/api/${route}`, data, { withCredentials: true })
        return response.data
    } catch (error) {
        console.error("Error during authentication", error);
        throw error;
    }
}

// Get datas for contractor
export const fetchDetails = async (route: string) => {
    try {
        const response = await apiClient.get(`${SERVER_URI}/api/contractor/${route}`, { withCredentials: true })
        return response?.data.data
    } catch (error) {
        console.error("Error during fetching workers", error);
        throw error;
    }
}

// Fetch details based on pagination
export const fetchPaginationDetails = async (route: string, currentPage: number, itemsPerPage: number) => {
    try {
        console.log()
        const response = await apiClient.get(`${SERVER_URI}/api/contractor/${route}/${currentPage}/${itemsPerPage}`, { withCredentials: true })
        return response?.data.data
    } catch (error) {
        console.error("Error during fetching workers", error);
        throw error;
    }
}

// Get datas of single (equipment / project / worker) with _id
export const fetchSingleData = async (route: string, _id: string) => {
    try {
        const response = await apiClient.get(`${SERVER_URI}/api/contractor/${route}/${_id}`, { withCredentials: true })
        return response?.data.data
    } catch (error) {
        console.error("Error during fetching workers", error);
        throw error;
    }
}

// Patch works
export const statusEdits = async (route: string, data: object) => {
    try {
        const response = await apiClient.patch(`${SERVER_URI}/api/contractor/${route}`, data, { withCredentials: true })
        return response?.data.data
    } catch (error) {
        console.error("Error during fetching workers", error);
        throw error;
    }
}

// Patch works
export const simpleEdits = async (route: string, data: object) => {
    try {
        const response = await apiClient.patch(`${SERVER_URI}/api/contractor/${route}`, data, { withCredentials: true })
        return response
    } catch (error) {
        console.error("Error during fetching workers", error);
        throw error;
    }
}

export const checkEquipmentCount = async (data: object, route: string) => {
    try {
        const response = await apiClient.post(`${SERVER_URI}/api/contractor/${route}`, data, { withCredentials: true })
        return response?.data
    } catch (error) {
        console.error("Error during fetching workers", error);
        throw error;
    }
}

export const dataValidation = async (data: object, route: string) => {
    try {
        const response = await apiClient.post(`${SERVER_URI}/api/contractor/${route}`, data, { withCredentials: true })
        return response?.data
    } catch (error) {
        console.error("Error during fetching workers", error);
        throw error;
    }
}

// Logout
export const logoutApi = async () => {
    try {
        const response = await axios.delete(`${SERVER_URI}/api/auth/logout`, { withCredentials: true })
        return response.data
    } catch (error) {
        console.error("Error during Logout", error);
        throw error;
    }
}



