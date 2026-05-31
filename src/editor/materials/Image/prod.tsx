import type { CommonComponentProps } from '../../interface'

export default function Image({ id: _id, url, styles }: CommonComponentProps) {
  const src = url || 'https://via.placeholder.com/200x150?text=Image'
  return (
    <img src={src} style={styles} alt="" />
  )
}
