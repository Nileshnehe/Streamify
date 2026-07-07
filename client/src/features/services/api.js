import { API } from "../../services/api";


export const signup = async (signupData) => {
    const response = await API.post("/auth/signup", signupData);
    return response.data;
}

export const login = async (loginData) => {
    const response = await API.post("/auth/login", loginData);
    return response.data;
}

export const logout = async () => {
    const response = await API.post("/auth/logout");
    return response.data;
}

export const getAuthUser = async () => {
    try {
        const response = await API.get("/auth/me");
        return response.data;
    } catch (error) {
        console.log("Error in getAuthUser:", error);
        return null;
    }
}

export const completeOnboarding = async (userData) => {
    const res = await API.post("/auth/onboarding", userData);
    return res.data;
}

export const getUserFriends = async () => {
    const response = await API.get("/users/friends");
    return response.data;
}

export const getRecommendedUsers = async () => {
    const response = await API.get("/users");
    return response.data;
}

export async function getOutgoingFriendRequest() {
  const response = await API.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await API.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await API.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await API.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}