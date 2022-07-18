import { ReactElement, ReactNode, useMemo } from 'react'


interface Props {
  date?: string | Date | null | number,
  isRaw?: boolean,
  placeholder?: ReactNode | null,
}

const LocalizedDate = ({
  date,
  isRaw,
  placeholder
}: Props) => {
  const localizedDate = useMemo(
    () => {
      try {
        if (!date) return placeholder
        const parsedDate = isRaw ? new Date(date) : date as Date
        const intl = new Intl.DateTimeFormat('en-US')
        return (intl.format(parsedDate))
      } catch (error) {
        return placeholder || ''
      }
    },
    [ date, isRaw, placeholder ]
  )
  return localizedDate as unknown as ReactElement || null
}

export default LocalizedDate
