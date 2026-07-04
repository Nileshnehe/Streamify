import { API } from "../../services/api";


export const signup = async (signupData) => {
    const response = await API.post("/auth/signup", signupData);
    return response.data;
}

export const getAuthUser = async () => {
      const res = await API.get("/auth/me");
      return res.data;
    }