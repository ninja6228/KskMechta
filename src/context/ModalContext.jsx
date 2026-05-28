import { createContext, useContext, useState } from 'react'

const ModalContext = createContext(null)

export function ModalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [defaultProgram, setDefaultProgram] = useState('')
  const [modalMode, setModalMode] = useState('booking')

  const openModal = (program = '') => {
    setModalMode('booking')
    setDefaultProgram(program)
    setOpen(true)
  }

  const openCustomProgramModal = () => {
    setModalMode('custom')
    setDefaultProgram('')
    setOpen(true)
  }

  const closeModal = () => setOpen(false)

  return (
    <ModalContext.Provider value={{
      open,
      modalMode,
      openModal,
      openCustomProgramModal,
      closeModal,
      defaultProgram,
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}
