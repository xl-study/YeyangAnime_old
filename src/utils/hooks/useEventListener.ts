import { useEffect, useRef } from 'react'

type TargetElement = HTMLElement | Element | Document | Window
type Options = {
  target?: TargetElement
  capture?: boolean
  once?: boolean
  passive?: boolean
}

export const useEventListener = (
  eventName: string,
  handler: Function,
  options?: Options
) => {
  const savehandler = useRef<Function>()
  useEffect(() => {
    savehandler.current = handler
  }, [handler])

  useEffect(() => {
    const element = options?.target || window
    const ismobile = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    if (!element || !element.addEventListener || ismobile) return
    const eventListener = (event: Event) =>
      savehandler.current && savehandler.current(event)
    element.addEventListener(eventName, eventListener, {
      capture: options?.capture,
      once: options?.once,
      passive: options?.passive,
    })
    return () => element.removeEventListener(eventName, eventListener)
  }, [
    eventName,
    options?.target,
    options?.capture,
    options?.once,
    options?.passive,
  ])
}
