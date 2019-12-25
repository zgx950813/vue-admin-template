import request from '@/utils/fetch'

export function getMonthlyRunratePolicies(year, quarter) {
  return request({
    url: '/api/v1/vault/monthlyRunratePolicies-search',
    method: 'POST',
    params: {
      year,
      quarter
    }
  })
}

export function getCarMonthlyRunratePolicies(year, quarter) {
  return request({
    url: '/api/v1/vault/carMonthlyRunratePolicies-search',
    method: 'POST',
    params: {
      year,
      quarter
    }
  })
}
