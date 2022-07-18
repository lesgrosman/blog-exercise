import { ReactNode, createContext, useContext, useState } from 'react'

type PaginationContextType = {
  limit: number
  offset: number
  setOffset: (value: number) => void
}

const PaginationContext = createContext({} as PaginationContextType)

export const PaginationProvider = ({ children }: {children: ReactNode}) => {
  const limit = 5

  const [ offset, setOffset ] = useState<number>(0)

  const handleSetOffset = (value: number) => {
    setOffset(value)
  }

  return (
    <PaginationContext.Provider
      value={{
        limit,
        offset,
        setOffset: handleSetOffset
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export const usePaginationContext = () => useContext(PaginationContext)
