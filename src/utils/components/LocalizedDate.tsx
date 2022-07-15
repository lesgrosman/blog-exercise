import { ReactElement, ReactNode, useMemo } from 'react'


interface Props {
  date?: string | Date | null | number,
  isRow?: boolean,
  placeholder?: ReactNode | null,
}

const LocalizedDate = ({
  date,
  isRow,
  placeholder
}: Props) => {
  const localizedDate = useMemo(
    () => {
      try {
        if (!date) return placeholder
        const parsedDate = isRow ? new Date(date) : date as Date
        const intl = new Intl.DateTimeFormat('en-US')
        return (intl.format(parsedDate))
      } catch (error) {
        return placeholder || ''
      }
    },
    [ date, isRow, placeholder ]
  )
  return localizedDate as unknown as ReactElement || null
}

export default LocalizedDate
