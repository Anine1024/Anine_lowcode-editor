import type { CommonComponentProps } from '../../interface'

export default function Container({ id: _id, name: _name, children, styles }: CommonComponentProps) {

  return (
    <>
      <div
        className={'p-[20px]'}
        style={styles}
      >
        {children}
      </div>
    </>
  )
}
