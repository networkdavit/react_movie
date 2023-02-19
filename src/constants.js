const api_url = "http://localhost:8000/api/v1";

const api_endpoints={
    token: `${api_url}/auth/token/`,
    refresh_token: `${api_url}/auth/token/refresh/`,
    verify_token : `${api_url}/auth/verify-token/`,
    movies: `${api_url}/movies/`,

}

export default api_endpoints;