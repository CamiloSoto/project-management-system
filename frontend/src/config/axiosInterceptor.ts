import axiosClient from "./axiosClient";

let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const axiosInterceptor = () => {
    let isRefreshing = false;

    axiosClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                localStorage.getItem("refreshToken")
            ) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            resolve: (token: string) => {
                                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                                resolve(axiosClient(originalRequest));
                            },
                            reject: (err: any) => reject(err),
                        });
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const res = await axiosClient.post(
                        "/auth/refresh",
                        null,
                        {
                            headers: {
                                "x-refresh-token": `Bearer ${localStorage.getItem("refreshToken")}`,
                            },
                        }
                    );

                    const {accessToken, refreshToken} = res.data;
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);

                    processQueue(null, accessToken);

                    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                    return axiosClient(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/auth/sign-in";
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
}

export default axiosInterceptor;