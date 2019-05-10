import axios from 'axios'

// 配置api地址
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
    baseURL = '/api'
} else {
    // /* 屏蔽console.log */
    // let tempLog = window.console.log
    // if (window.localStorage.getItem('log') === 'true') {
    //   window.console.log = tempLog
    // } else {
    //   window.console.log = () => null
    // }
}

/* 取消重复请求 */
let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let CancelToken = axios.CancelToken
// axios设置
const $ajax = axios.create({
    baseURL: baseURL
})
let removePending = (config) => {
    for (let p in pending) {
        if (pending[p].u === config.url + '&' + config.method) { // 当当前请求在数组中存在时执行函数体
            console.log('取消', JSON.stringify(config))
            pending[p].f() // 执行取消操作
            pending.splice(p, 1) // 把这条记录从数组中移除
        }
    }
}

// 添加请求拦截器
$ajax.interceptors.request.use(config => {
    let service = window.localStorage.getItem('service') || 'xzgsj'
    let system = window.localStorage.getItem('system') || 'pc'
    let systemE = window.localStorage.getItem('system-e') || 'pc'
    if (config.method === 'get') {
        if (!config.params) {
            config.params = {}
        }
        config.params['service'] = service
        config.params['system'] = system
        config.params['system-e'] = systemE
    }
    // if (config.method === 'post') {
    //   if (!config.data) {
    //     config.data = {}
    //   }
    //   config.data['service'] = service
    //   config.data['system'] = system
    //   console.log('--post--', config.data)
    // }
    removePending(config) // 在一个ajax发送前执行一下取消操作
    config.cancelToken = new CancelToken((c) => {
        pending.push({u: config.url + '&' + config.method, f: c})
    })
    return config
}, error => {
    return Promise.reject(error)
})
// 添加响应拦截器
$ajax.interceptors.response.use(response => {
    removePending(response.config)
    return response
}, error => {
    return {data: {error: error}}
})

export default $ajax
