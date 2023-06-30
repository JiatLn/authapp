import { Dialog } from '@headlessui/react'
import React, { useCallback, useEffect } from 'react'

type Props = {
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number,
  message: string
  setMessage: (msg: string) => void
}

const bgColorMap = {
  success: 'bg-green-400',
  error: 'bg-rose-400',
  warning: 'bg-yellow-400',
  info: 'bg-blue-400'
}

const Toast = ({ type, message, duration = 2000, setMessage }: Props) => {

  const removeToast = useCallback(() => {
    setMessage('')
  }, [setMessage])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        removeToast()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [message, duration, removeToast])

  if (!message || !message.length) return null

  return (
    <Dialog open={!!message.length} onClose={() => { }} className="fixed left-1/2 translate-x-[-50%] top-4 flex items-center justify-center" >
      <Dialog.Panel className={`w-full max-w-sm rounded text-white ${bgColorMap[type]}`}>
        <Dialog.Description className={'text-center py-2 px-4'}>
          {message}
        </Dialog.Description>
      </Dialog.Panel>
    </Dialog>
  )
}

export default Toast
