export const adminServiceUrls ={
    addProduct :() => `https://localhost:7269/api/Admin/AdminAdd` ,
    getById : (id:number) => `https://localhost:7269/api/Admin/AdminGetById?id=${id}`,
    deleteProduct: () => `https://localhost:7269/api/Admin/AdminDelete`
}