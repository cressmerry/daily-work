import axios from "axios";
const API = "http://localhost:3001/courses";

export const getCourses = () => axios.get(API);
export const getCourseById = (id) => axios.get(`${API}/${id}`);
export const addCourse = (data) => axios.post(API, data);
