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

// this.$http.post('/admin/card/' + action, this.update)
//   .then((response) => {
//     if (response.status === 200) {
//       if (action === 'add') {
//         this.update.id = response.id
//       }
//       this.$message.success('保存成功')
//       if (this.$refs.upload1.file != this.update.icon) {
//         this.$refs.upload1.handleUpload()
//       }
//       if (this.$refs.upload2.file != this.update.config) {
//         this.$refs.upload2.handleUpload()
//       }
//     } else {
//       this.$message.error('服务器错误')
//       // eslint-disable-next-line no-console
//       console.log(response)
//     }
//   })

// this.$http.get('/admin/card/get_rss_list')
//   .then((response) => {
//     if (response.status === 200) {
//       this.rss = response.rss
//     } else {
//       this.$message.error('服务器错误')
//       // eslint-disable-next-line no-console
//       console.log(response)
//     }
//   })
