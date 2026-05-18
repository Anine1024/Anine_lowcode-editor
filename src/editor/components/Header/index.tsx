import { Space, Button, Tooltip } from 'antd'
import { ExportOutlined, ClearOutlined } from '@ant-design/icons'
import { useComponentsStore } from '../../stores/components'

export default function Header() {
  const { mode, setMode, components } = useComponentsStore()

  const handleExport = () => {
    const json = JSON.stringify(components, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lowcode-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string)
          useComponentsStore.setState({ components: data })
        } catch {
          // ignore invalid file
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleClear = () => {
    useComponentsStore.setState({
      components: [{ id: 1, name: 'Page', props: {}, desc: '页面' }],
      curComponentId: null,
      curComponent: null,
    })
  }

  return (
    <div className='w-[100%] h-[100%]'>
      <div className='h-[50px] flex justify-between items-center px-[20px]'>
        <div className="font-bold text-[16px]">低代码编辑器</div>
        <Space>
          {mode === 'edit' && (
            <>
              <Tooltip title="导出JSON">
                <Button icon={<ExportOutlined />} onClick={handleExport}>导出</Button>
              </Tooltip>
              <Button onClick={handleImport}>导入</Button>
              <Tooltip title="清空画布">
                <Button icon={<ClearOutlined />} onClick={handleClear} danger>清空</Button>
              </Tooltip>
              <Button type="primary" onClick={() => setMode('preview')}>预览</Button>
            </>
          )}
          {mode === 'preview' && (
            <Button type="primary" onClick={() => setMode('edit')}>退出预览</Button>
          )}
        </Space>
      </div>
    </div>
  )
}
