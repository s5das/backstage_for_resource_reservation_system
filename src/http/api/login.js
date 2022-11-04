import serviceAxios from ".."

export const login = (adminName,password)=>{
    return serviceAxios({
        method: "POST",
        url:'/admin/login',
        data:{
            adminName,
            password
        }
    })
}
