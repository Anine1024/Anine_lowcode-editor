import { Input as AntdInput } from 'antd'
import type { CommonComponentProps } from '../../interface'

export default function Input({ id: _id, type: _type, text, styles }: CommonComponentProps) {
  return (
    <AntdInput style={styles} placeholder={text || '请输入'} />
  )
}
