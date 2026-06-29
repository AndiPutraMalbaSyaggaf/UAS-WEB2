axios.interceptors.request.use(
    function(config){
        const token = localStorage.getItem("token");
        
        if(token){
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    function(error){
            
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
    if (!error.response) {
        console.log("Network error / server tidak merespon");
        return Promise.reject(error);
    }

    if (error.response.status == 401) {
        alert("Sesi login habis");
        localStorage.removeItem("token");
        localStorage.removeItem("isLogin");

        window.location.href = "#/login";
    }

    return Promise.reject(error);
    }
);