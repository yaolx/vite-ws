import { isObject, assign, compact, isFunction, remove, map } from 'lodash'

export interface MsgPayload {
  type: string
  [key: string]: any
}

let receiveQueue: any[] = []

function parse(data: any) {
  try {
    return JSON.parse(data)
  } catch (e) {
    return false
  }
}

/**
 * 统一响应底层 message 事件
 *
 */
function eventHandler(event: any, token: string | undefined) {
  let data = event.data
  let temp = null
  if (typeof data === 'string') {
    temp = parse(data)
    if (isObject(temp)) {
      data = temp
    }
  }
  receiveQueue.forEach((cb) => {
    cb(data, event, token)
  })
}

interface SendMessageOptions {
  sendDownward?: boolean
  noStringify?: boolean
}

/**
 * 发送消息
 * @param type 消息类型,例如：knowledgemap_add_ref->新增前后置关系；knowledgemap_delete_ref->删除前后置关系
 * @param data 发送的参数，json格式
 * @param options 其它的配置
 */
export function sendMessage(type: string, data: any = {}, options: SendMessageOptions = { sendDownward: false, noStringify: false }) {
  let sendWins: Window[] = []
  if (!options.sendDownward) {
    const parent = window.parent
    const opener = window.opener

    sendWins = compact([parent, opener])
  } else {
    const iframes = document.getElementsByTagName('iframe')
    sendWins = compact(map(iframes, (iframe) => iframe.contentWindow))
  }

  const paramsObject = assign({ type }, data)
  const params = options.noStringify ? paramsObject : JSON.stringify(paramsObject)

  sendWins.forEach((win) => {
    win.postMessage(params, '*')
  })
}

/**
 * 发送消息给指定的 window 窗口
 * 常用于 iframe 里的消息发送
 *
 * @param win window对象
 * @param type 事件类型
 * @param data 传递的数据对象
 */
export function sendMessageTo(win: Window, type: string, data: any) {
  const params = JSON.stringify({
    type,
    ...data
  })

  win.postMessage(params, '*')
}

let hasRegistry = false
/**
 * 注册消息
 * @param callback 注册消息的回调方法
 */
export function registerReceive(callback: Function, token?: string) {
  if (isFunction(window.addEventListener) && !hasRegistry) {
    hasRegistry = true
    window.addEventListener('message', (event: any) => eventHandler(event, token), false)
  }
  let callbackArr: any[] = []
  if (isFunction(callback)) {
    callbackArr = [callback]
  }
  receiveQueue = receiveQueue.concat(callbackArr)
  return callback
}
/**
 * 取消注册
 * @export
 * @param callback 注册消息的回调方法
 */
export function cancelReceive(callback: Function) {
  remove(receiveQueue, (receiveItem: Function) => {
    return callback === receiveItem
  })
}
