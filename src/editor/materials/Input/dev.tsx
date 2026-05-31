import { Input as AntdInput } from 'antd'
import type { CommonComponentProps } from '../../interface'

export default function Input({ id, type: _type, text, styles }: CommonComponentProps) {
  return (
    <AntdInput data-component-id={id} style={styles} placeholder={text || '请输入'} />
  )
}
