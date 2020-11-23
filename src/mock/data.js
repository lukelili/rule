export default {
  getOrderType: () => ({
    code: 0,
    data: [
      {
        label: '新贷',
        value: 'new'
      },
      {
        label: '复贷',
        value: 'old'
      }
    ]
  })
}