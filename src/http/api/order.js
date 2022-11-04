import serviceAxios from "..";

export const getDetail = (id) => {
  return serviceAxios({
    method: "get",
    url: `/admin/order/get/${id}`,
  });
};

export const getInfoByPage = (
  page,
  status,
  username,
  departmentName,
  roomName,
  date
) => {
  return serviceAxios({
    method: "get",
    url: `/admin/order/list/${page}/${10}/${status}`,
    params: {
      username,
      departmentName,
      roomName,
      date,
    },
  });
};

export const cancel = (id, cancelReason) => {
  return serviceAxios({
    method: "put",
    url: "/admin/order/cancel",
    params: {
      id,
      cancelReason,
    },
  });
};

export const pass = (id) => {
  return serviceAxios({
    method: "put",
    url: `/admin/order/access/${id}`,
  });
};

export const save = (id, adminOtherInfo) => {
  return serviceAxios({
    method: "put",
    url: "/admin/order/save",
    params: {
      id,
      adminOtherInfo,
    },
  });
};
