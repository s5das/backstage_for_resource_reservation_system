import serviceAxios from "..";

export const getTypeList = () => {
  return serviceAxios({
    method: "get",
    url: "/admin/department-type/list",
  });
};

export const addAdimin = (departmentName, leaderName, departmentTypeId) => {
  return serviceAxios({
    method: "post",
    url: "/admin/department/add",
    data: {
      departmentName,
      leaderName,
      departmentTypeId,
    },
  });
};

export const removeAdmin = (id) => {
  return serviceAxios({
    method: "delete",
    url: `/admin/department/remove/${id}`,
  });
};

export const modifyAdiminInfo = (
  departmentName,
  departmentTypeId,
  id,
  leaderName
) => {
  return serviceAxios({
    method: "put",
    url: "/admin/department/update",
    data: {
      departmentName,
      departmentTypeId,
      id,
      leaderName,
    },
  });
};

export const getPartmentDetail = (id, name) => {
  return serviceAxios({
    method: "get",
    url: "/admin/department/get",
    params: {
      id,
      name,
    },
  });
};

export const addPartmentmember = (departmentId, mobile, userId, userName) => {
  return serviceAxios({
    url:'/admin/user/add',
    method: "post",
    data: {
      departmentId,
      mobile,
      userId,
      userName,
    },
  });
};

export const modifyIsDisabled = (id) => {
  return serviceAxios({
    method: "put",
    url: `/admin/user/disabled/${id}`,
  });
};

export const modifyMemberInfo = (id, mobile, userId, userName) => {
  return serviceAxios({
    method: "put",
    url: "/admin/user/update",
    data: {id,mobile,userId,userName},
  });
};

export const removeMember = (id) => {
  return serviceAxios({
    method: "delete",
    url: `/admin/user/remove/${id}`,
  });
};

export const getInfoByPage = (
  page,
  departmentTypeId,
  departmentName,
  name
) => {
  return serviceAxios({
    method: "get",
    url: `/admin/department/list/${page}/${10}`,
    params: {
      departmentTypeId,
      departmentName,
      name,
    },
  });
};

export const modifyPartmentIsDisabled = (id) => {
  return serviceAxios({
    method:'put',
    url:`/admin/department/disabled/${id}`
  })
}