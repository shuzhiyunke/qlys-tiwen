import request from '@/utils/request'

export function addVisitor (data) {
  return request({
    url: '/register/addVisitor',
    methods: 'POST',
    data
  })
}
