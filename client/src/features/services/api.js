import { API } from "../../services/api";


export const signup = async (signupData) => {
    const response = await API.post("/auth/signup", signupData);
    return response.data;
}

export const login = async (loginData) => {
    const response = await API.post("/auth/login", loginData);
    return response.data
}

export const getAuthUser = async () => {
    const res = await API.get("/auth/me");
    return res.data;
}

export const completeOnboarding = async (userData) => {
    const res = await API.post("/auth/onboarding", userData);
    return res.data;
}    