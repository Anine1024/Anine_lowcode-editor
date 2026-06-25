import type { CommonComponentProps } from '../../interface'

export default function Image({ id: _id, url, styles }: CommonComponentProps) {
  const src = url || ''
  if (!src) return null

  return (
    <img
      src={src}
      alt=""
      style={{
        display: 'block',
        maxWidth: '100%',
        objectFit: 'cover',
        ...styles,
      }}
    />
  )
}
