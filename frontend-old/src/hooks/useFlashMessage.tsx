import bus from '../utils/bus'

export default function useFlashMessage() {
  const setFlashMessage = (message: string, type: string) => {
    bus.emit('flashMessage', { message, type })
  }

  return { setFlashMessage }
}
