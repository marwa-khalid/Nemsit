import axios from "axios";
import { AuthModel, UserModel } from "./_models";
const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `https://api.invoicehippo.nl/api/v1/authorization/authorize`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `https://api.invoicehippo.nl/api/v1/profile/password/reset/request`;
export const GET_PROFILE_INFO = `https://api.invoicehippo.nl/api/v1/profile/info`;

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    userName:email,
    password,
    languageType: 2,
    deviceType: 1,
    deviceId: "Windows"
  });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(EmailAddress: string) {
  return axios.post(REQUEST_PASSWORD_URL, {
    EmailAddress,
  });
}

export function getProfileInfo(token: string) {
    const headers = {"Authorization": "Bearer " + token}
    return axios.get( GET_PROFILE_INFO,{headers});
}