import axios from "axios";

const api = axios.create({
   base_url : `${import.meta.env.DEV_BACK_END_URL/api}`
});

export default api;