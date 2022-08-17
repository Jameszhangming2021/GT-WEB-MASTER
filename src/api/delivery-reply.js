/* 供应商交期回复接口 */

import request from '@/utils/request'

/**
 * 获取采购单数据
 * @param {*} data
 * @returns Promise
 */
export const getPurchaseDate = (data) => {
  return request({
    url: '/api/app/Procurement/GetPuoFile',
    method: 'post',
    data,
  })
}

/**
 * 获取采购单明细
 * @param {*} data
 */
export const getPurchaseDetail = (data) => {
  return request({
    url: '/api/app/Procurement/GetPuoDetails',
    method: 'post',
    data,
  })
}

/**
 * 采购单交期确认
 * @param {*} data
 */
export const confirmDelivery = (data) => {
  return request({
    url: '/api/app/Procurement/DeliveryConfirm',
    method: 'post',
    data,
  })
}
