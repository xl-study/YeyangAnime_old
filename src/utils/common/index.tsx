import { message } from 'antd'

export const throttle = (
  func: (...args: any) => void,
  wait: number,
  showTip: boolean = false
) => {
  let timeout: any
  return function (...args: any) {
    if (!timeout) {
      if (showTip) {
        message.info('您的操作太频繁啦')
      }
      timeout = setTimeout(() => {
        timeout = null
        func.apply(args)
      }, wait)
    }
  }
}
