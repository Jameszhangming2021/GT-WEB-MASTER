/**
 * 图纸下载相关接口
 */
import request from '@/utils/request'

// 获取采购订单
export const getPurOrders = (data) => {
  return request({
    // url: '/api/Web/Supplier/GetPomain',
    url: '/api/Web/BaseData/GetPomain',
    method: 'post',
    data,
  })
}

// 根据采购单号获取相应的物料
export const getMaterByPur = (data) => {
  return request({
    // url: '/api/Web/Supplier/GetCinvcode',
    url: '/api/Web/BaseData/GetCinvcode',
    method: 'post',
    data,
  })
}

// 根据物号获取图纸
export const getDrawing = (data) => {
  return request({
    // url: '/api/Web/Supplier/GetPopoId',
    url: '/api/Web/BaseData/GetPopoId',
    method: 'post',
    data,
  })
}

// 下载图纸
export const downloadDrawing = (data) => {
  return request({
    url: '/api/Web/Supplier/DrawingDownload',
    method: 'post',
    data,
  })
}

// 获取更新图纸列表
export const getUpdateDrawing = () => {
  return request({
    // url: '/api/Web/Supplier/GetUpdatePopoId',
    url: '/api/Web/BaseData/GetUpdatePopoId',
    method: 'post',
  })
}

// 获取下载百分比
export const getDownloadPer = () => {
  return request({
    url: '/api/Web/Supplier/GetDownloadBfb',
    method: 'post',
  })
}
