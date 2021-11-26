import axios from "axios";
import Vue from "vue";
const api = axios.create({
  baseURL: "http://103.137.75.74:230/",
  // headers: getHeaders(),
  timeout: 5000,
});

// function getHeaders() {
//   const headers = {
//     Accept: "application/json",
//   };
//   if (localStorage.getItem("token") != null) {
//     headers["x-token"] = localStorage.getItem("token");
//   }
//   return headers;
// }

Vue.prototype.$api = api;

Vue.prototype.$endpoint = {
  GET_ALL_EXPENSE: "mx_get",
  GET_ALL_EXPENSE_LIST: "list_profile",
  GET_EXPENSE: "query?search=",
  GET_Bill: "m_bill_api",
  SEARCH: "query?search=",
  GET_ALL_EMPLOYEES: "/employee",
  DELETE_EMPLOYEE: "/employee/delete",
  UPDATE_EMPLOYEE: "/employee/update",
  REQUEST_REVIEW: "/review/request",
  GET_ALL_REVIEWS_BY_EMPLOYEE: "/review/getByEmpId",
  DELETE_REVIEW: "/review/delete",
  SUBMIT_REVIEW: "/review/submit",
  PROCESS_REVIEW: "/review/process",
};
