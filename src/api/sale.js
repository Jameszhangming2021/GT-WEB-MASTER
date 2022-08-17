/**
 * 销售模块api
 */
import request from '@/utils/request'

// 获取列表数据
export const getSaleData = (data) => {
  return request({
    url: '/api/web/Sale/GetBdcFile',
    method: 'post',
    data,
  })
}

// 新增
export const createSale = (data) => {
  delete data.bdcId
  return request({
    url: '/api/web/Sale/EnquiryAdd',
    method: 'post',
    data,
  })
}

// 保存
export const updateSale = (data) => {
  return request({
    url: '/api/web/Sale/EnquiryUpdate',
    method: 'post',
    data,
  })
}

// 删除
export const removeSale = (data) => {
  return request({
    url: '/api/web/Sale/EnquiryDelete',
    method: 'post',
    data,
  })
}

// 订单确认
export const confirmSale = (data) => {
  return request({
    url: '/api/web/Sale/EnquiryConfirm',
    method: 'post',
    data,
  })
}

// 下载excel
export const downloadExcel = (data) => {
  return request({
    url: '/api/Web/Sale/EnquiryDownload',
    method: 'post',
    data,
  })
}
