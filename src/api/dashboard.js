import request from '@/utils/fetch'

export function getVersion() {
  return request({
    url: '/api/version',
    method: 'GET'
  })
}
