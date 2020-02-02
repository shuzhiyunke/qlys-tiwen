import request from '@/utils/request'

export function addVisitor (data) {
  return request({
    url: '/register/addVisitor',
    methods: 'POST',
    data
  })
}

export function viewVisitor (data) {
  return request({
    url: '/register/viewVisitor',
    methods: 'POST',
    data
  })
}

export function visitorDetail (data) {
  return request({
    url: '/register/visitorDetail',
    methods: 'POST',
    data
  })
}

export function addTemperature (data) {
  return request({
    url: '/register/addTemperature',
    methods: 'POST',
    data
  })
}
