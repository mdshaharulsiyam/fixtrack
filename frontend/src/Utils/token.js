const TOKEN_KEY = 'token'

export const getToken = () => {
    try {
        return localStorage.getItem(TOKEN_KEY)
    } catch {
        return null
    }
}

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}
