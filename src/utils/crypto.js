/* 加密、解密方法 */

import JsEncrypt from 'jsencrypt'

/**
 * 
 * @param {String} data 需要加密的数据 
 * @desc 加密数据
 * @return {String} res 加密后的数据 
 */
export function encryptData (data) {
  // 创建加密对象实例
  const encryptor = new JsEncrypt()
  // 之前ssl生成的公钥，复制的时候要小心不要有空格
  const pubKey = `-----BEGIN PUBLIC KEY----- 
  MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMG00cTZGMUgD69EH/FcH1E4kGnEWwCb 
  U8GOkWtl76mInfQghOGAEGVh1UBD7H87Carjp8zqLFaSYn0XfNdHJ5kCAwEAAQ== 
  -----END PUBLIC KEY-----`
  // 设置公钥
  encryptor.setPublicKey(pubKey)
  // 对内容进行加密
  const res = encryptor.encrypt(data)

  return res
}