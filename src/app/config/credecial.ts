export const credencialServiceUrl= {
    login: (email:string, password:string) => `https://localhost:7269/api/Authentication/AuthenticationLogin?email=${email}&password=${password}`,
    signUp: () =>`https://localhost:7269/api/Authentication/AuthenticationSignUp`,
    userDetail: () => `https://localhost:7269/api/Authentication/AuthenticationUserData`,
    getUserRole: () => `https://localhost:7269/api/Authentication/AuthenticationGetRole`
}