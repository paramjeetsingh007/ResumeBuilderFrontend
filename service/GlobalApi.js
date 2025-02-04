import { Content } from "@radix-ui/react-dialog";
import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL.replace(/\/$/, "");
const axiosClient = axios.create({
  baseURL: `${BASE_URL}/api/`,
  headers: { // Note: headers is in lowercase
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`, // Add a space between 'Bearer' and the API key
  },
});

const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);

const GetUserResumes=(userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail);

const UpdateResumeDetail=(id,data)=>axiosClient.put('/user-resumes/'+id,data)

const GetResumeById=(id)=>axiosClient.get('/user-resumes/'+id+'?populate=*')

const DeleteResumeById=(id)=>axiosClient.delete('/user-resumes/'+id)

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById
};
