export const adminServiceUrls ={
    addProduct :() => `https://localhost:7269/api/Admin/AdminAdd` ,
    getById : (id:number) => `https://localhost:7269/api/Admin/AdminGetById?id=${id}`,
    deleteProduct: () => `https://localhost:7269/api/Admin/AdminDelete`,
    changePassword: (email:string,old_password:string,password:string)=> `https://localhost:7269/api/Admin/AdminChangePassword?email=${email}&oldPassword=${old_password}&newPassword=${password}`
}