import serviceAxios from "..";

export const getBuildingList = () => {
  return serviceAxios({
    method: "get",
    url: "/admin/building/list",
  });
};

export const getRoomList = (
  roomName,
  buildingId,
  capacity,
  hasComputer,
  hasPowerStrip,
  hasProjector,
  hasWifi
) => {
  return serviceAxios({
    method: "post",
    url: "/admin/room/list",
    data: {
      roomName,
      buildingId,
      capacity,
      hasComputer,
      hasPowerStrip,
      hasProjector,
      hasWifi,
    },
  });
};

export const getOrder = (id,date) => {
    return serviceAxios({
        url:"/admin/room/getOrder",
        method:'get',
        params:{
            id,
            date
        }
    })
};

export const getInfoById = (id) => {
    return serviceAxios({
        method:'get',
        url:`/admin/room/get/${id}`
    })
}

export const modifyStatusById = (id) => {
    return serviceAxios({
        method:'put',
        url:`/admin/room/status/${id}`
    })
}

export const rmovePic = (id,url)=>{
    return serviceAxios({
        method:'delete',
        url:'/admin/room/avatar/remove',
        params:{
           id,
           url
        }
    })
}

// ???
export const uploadPic = (file) =>{
    let fomdata = new FormData()
    fomdata.append('file',file)
    return serviceAxios({
        method:'post',
        url:'/admin/room/avatar/upload',
        data:fomdata
    })
}

export const getModifyInfoById = (id) => {
    return serviceAxios({
        method:'get',
        url:`/admin/room/getDto/${id}`
    })
}

export const modifyMessage = (avatars,id,otherInfo) => {
    return serviceAxios({
        method:'put',
        url:'/admin/room/update',
        data:{
            avatars,
            id,
            otherInfo
        }
    })
}