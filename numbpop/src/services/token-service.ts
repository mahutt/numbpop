export const TokenService = {
  saveToken(token: string) {
    localStorage.setItem('authToken', token)
  },

  getToken(): string | null {
    return localStorage.getItem('authToken')
  },

  removeToken() {
    localStorage.removeItem('authToken')
  },

  hasToken(): boolean {
    return !!this.getToken()
  },
}
