import { useState, useRef } from 'react'
import { PictureOutlined, SwapOutlined } from '@ant-design/icons'
import type { CommonComponentProps } from '../../interface'
import { useComponentsStore } from '../../stores/components'

export default function Image({ id, url, styles }: CommonComponentProps) {
  const [imgError, setImgError] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const { updateComponentProps } = useComponentsStore()
  const src = url || ''
  const showImg = src && !imgError

  const triggerUpload = () => fileRef.current?.click()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImgError(false)
      updateComponentProps(id, { url: reader.result as string })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <div
      data-component-id={id}
      style={{
        display: 'inline-block',
        width: styles?.width || 200,
        maxWidth: '100%',
        border: '1px dashed #bfbfbf',
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: '#fafafa',
        aspectRatio: styles?.width && styles?.height ? undefined : '4 / 3',
        ...styles,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        title="上传图片"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {showImg ? (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img
            src={src}
            alt=""
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={() => setImgError(true)}
          />
          {isHover && (
            <div
              onClick={triggerUpload}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.35)',
                cursor: 'pointer',
                color: '#fff',
                fontSize: 13,
                gap: 4,
              }}
            >
              <SwapOutlined />
              更换图片
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={triggerUpload}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            minHeight: styles?.height || 150,
            color: '#bfbfbf',
            cursor: 'pointer',
            gap: 4,
            transition: 'color 0.2s, background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#1677ff'
            e.currentTarget.style.backgroundColor = '#f0f5ff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#bfbfbf'
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          <PictureOutlined style={{ fontSize: 28, pointerEvents: 'none' }} />
          <span style={{ fontSize: 13, pointerEvents: 'none' }}>点击上传图片</span>
        </div>
      )}
    </div>
  )
}
