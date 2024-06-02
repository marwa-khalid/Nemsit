
// import axios, { AxiosRequestConfig } from "axios";
// import { AuthModel, UserModel } from "./_models";
// const APIURL_V1 = import.meta.env.VITE_APP_API_URL;

// export const GET_USER_BY_ACCESSTOKEN_URL = `${APIURL_V1}/verify_token`;
// export const LOGIN_URL = `${APIURL_V1}/authorization/authorize`;
// export const REGISTER_URL = `${APIURL_V1}/register`;
// export const REQUEST_PASSWORD_URL = `${APIURL_V1}/profile/password/reset/request`;
// export const GET_PROFILE_INFO = `${APIURL_V1}/profile/info`;

// export async function apiRequest<T>(url: string, config: AxiosRequestConfig): Promise<T> {
//   const response = await axios(url, config);
//   return response.data;
// }

// // Login request
// export function login(email: string, password: string) {
//   return apiRequest<AuthModel>(LOGIN_URL, {
//     method: 'POST',
//     data: {
//       userName: email,
//       password,
//       languageType: 2,
//       deviceType: 1,
//       deviceId: "Windows",
//     },
//   });
// }

// // Register request
// export function register(
//   email: string,
//   firstname: string,
//   lastname: string,
//   password: string,
//   password_confirmation: string
// ) {
//   return apiRequest<void>(REGISTER_URL, {
//     method: 'POST',
//     data: {
//       email,
//       first_name: firstname,
//       last_name: lastname,
//       password,
//       password_confirmation,
//     },
//   });
// }

// // Request password reset
// export function requestPassword(EmailAddress: string) {
//   return apiRequest<void>(REQUEST_PASSWORD_URL, {
//     method: 'POST',
//     data: {
//       EmailAddress,
//       languageType: 2,
//       customRedirectUrl: "http://localhost:5173/metronic8/react/demo1/reset",
//     },
//   });
// }

// // Get profile information
// export function getProfileInfo(token: string) {
//   const headers = { "Authorization": "Bearer " + token };
//   return apiRequest<UserModel>(GET_PROFILE_INFO, {
//     method: 'GET',
//     headers,
//   });
// }


import { AuthModel, UserModel ,PasswordResetModel} from "./_models";
import { LOGIN_URL,REQUEST_PASSWORD_URL, GET_PROFILE_INFO, REDIRECT_URL_V1,CHANGE_PASSWORD} from "./constants";
import apiRequest from "./_apiservice";
import { emailPreferences } from "../../accounts/components/settings/SettingsModel";

// Login request
export function login(email: string, password: string) {
  return apiRequest<AuthModel>(LOGIN_URL, {
    method: 'POST',
    data: {
      userName: email,
      password,
      languageType: 2,
      deviceType: 1,
      deviceId: "Windows",
    },
  });
}

// Request password reset
export function requestResetLink(EmailAddress: string) {
  return apiRequest<PasswordResetModel>(REQUEST_PASSWORD_URL, {
    method: 'POST',
    data: {
      EmailAddress,
      languageType: 2,
      customRedirectUrl: REDIRECT_URL_V1,
    },
  });
}

//Check if UUID is valid
export function checkUUIDValidity(uuid: string | null) {
  return apiRequest<PasswordResetModel>(`${CHANGE_PASSWORD}/${uuid}`, {
    method: 'GET',
  });
}

export function changePassword(emailAddress: string, password: string,passwordVerification: string,passwordResetToken: string,languageType:number) {
  return apiRequest<Boolean>(CHANGE_PASSWORD, {
    method: 'POST',
    data:{
      languageType,
      emailAddress,
      password,
      passwordVerification,
      passwordResetToken
    }
  });
}

// Get profile information
export function getProfileInfo(token: string) {
  const headers = { "Authorization": "Bearer " + token };
  return apiRequest<UserModel>(GET_PROFILE_INFO, {
    method: 'GET',
    headers,
  });
}
