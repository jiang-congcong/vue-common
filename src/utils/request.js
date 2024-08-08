import axios from 'axios';  
  
// 创建axios实例  
const service = axios.create({  
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url  
  timeout: 5000 // 请求超时时间  
});  
  
// 请求拦截器  
service.interceptors.request.use(  
  config => {  
    // 在发送请求之前做些什么  
    // 例如设置token  
    if (localStorage.getItem('token')) {  
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;  
    }  
    return config;  
  },  
  error => {  
    // 对请求错误做些什么  
    console.error('请求发生错误', error); // for debug  
    Promise.reject(error);  
  }  
);  
  
// 响应拦截器  
service.interceptors.response.use(  
  response => {  
    /**  
     * 对响应数据做点什么  
     */  
    // 例如，这里可以根据后端响应的code来判断请求是否成功  
    let res = response.data;  
    if (res.code !== 200) {  
      // 处理错误  
      Message.error({ message: res.message || 'Error' });  
      return Promise.reject(new Error(res.message || 'Error'));  
    } else { 
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        } 
        
      return res;  
    }  
  },  
  error => {  
    console.error('响应错误', error); // for debug  
    Message.error({ message: error.message });  
    return Promise.reject(error);  
  }  
);  
  
// 封装get请求  
export function get(url, params = {}) {  
  return service.get(url, { params });  
}  
  
// 封装post请求  
export function post(url, data = {}) {  
  return service.post(url, data);  
}  
  
// 封装put请求  
export function put(url, data = {}) {  
  return service.put(url, data);  
}  
  
// 封装delete请求  
export function deleteAPI(url, params = {}) {  
  return service.delete(url, { params });  
}  
  
// 其他请求...