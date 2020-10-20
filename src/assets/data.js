export const rolesList = [
  {
    level: '0',
    name: '超级管理员',
    field: 'admin',
    status: 1
  },
  {
    level: '1',
    name: '财务管理员',
    field: 'finance',
    status: 1
  },
  {
    level: '2',
    name: '运营管理员',
    field: 'operate',
    status: 1
  },
  {
    level: '3',
    name: '催收管理员',
    field: 'collection',
    status: 1
  },
  {
    level: '4',
    name: '审核管理员',
    field: 'checker',
    status: 1,
    children: [
      {
        level: '4-0',
        name: '初审管理员',
        field: 'first_checker',
        status: 1
      },
      {
        level: '4-1',
        name: '终审管理员',
        field: 'final_checker',
        status: 1
      }
    ]
  }
]

export const accountList = [
  {
    name: '诸葛亮',
    phone: '18810381734',
    roles: 'admin',
    gender: 1,
    status: 1
  },
  {
    name: '刘备',
    phone: '18301657324',
    roles: 'first_checker',
    gender: 1,
    status: 1
  },
  {
    name: '张飞',
    phone: '18301657324',
    roles: 'final_checker',
    gender: 1,
    status: 1
  },
  {
    name: '貂蝉',
    phone: '18301657324',
    roles: 'final_checker',
    gender: 0,
    status: 1
  }
]
export const levle1 = [
  {
    id: 1,
    pid: 0
  },
  {
    id: 2,
    pid: 0
  },
  {
    id: 3,
    pid: 0
  }
]

export const btnRules = [
  {
    name: '详情',
    key: 'details'
  },
  {
    name: '添加',
    key: 'add'
  },
  {
    name: '修改',
    key: 'edit'
  },
  {
    name: '删除',
    key: 'delete'
  }
]
