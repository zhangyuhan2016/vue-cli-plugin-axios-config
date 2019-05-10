import $ajax from './config'
/* 登陆 */
export const test = data => $ajax.post('/test', data)
