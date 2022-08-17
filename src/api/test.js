/**
 * 测试接口API
 */
import request from '@/utils/request'

export const test = () => {
  return request({
    url: '/api/Common/Test',
  })
}
