import axios from "axios"

const baseURL = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
  withCredentials: true,
    baseURL: baseURL,
  });
  instance.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('Access_Token')}`}


  // Thêm một bộ đón chặn request
  instance.interceptors.request.use(function (config) {  
    // Làm gì đó trước khi request dược gửi đi
    return config;
  }, function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  });

// Thêm một bộ đón chặn response
instance.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
  }, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
  });
  export default instance;