import React from 'react'
import Img from 'react-cool-img'


interface Props {
  className?: string,
  src?: string | null,
  alt?: string,
}


const AsyncImage: React.FC<Props> = ({
  className,
  src,
  alt = ''
}: Props) => {


  return (
    <Img
      className={className}
      src={src}
      alt={alt}
    />
  )
}

export default AsyncImage
