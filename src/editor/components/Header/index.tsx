import { Space, Button, Tooltip, Popconfirm } from 'antd'
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
                <Popconfirm
                  title="确认导出？"
                  description="将当前页面配置导出为 JSON 文件"
                  onConfirm={handleExport}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button icon={<ExportOutlined />}>导出</Button>
                </Popconfirm>
              </Tooltip>
              <Button onClick={handleImport}>导入</Button>
              <Tooltip title="清空画布">
                <Popconfirm
                  title="确认清空？"
                  description="所有组件将被删除且不可恢复"
                  onConfirm={handleClear}
                  okText="确认清空"
                  cancelText="取消"
                  okButtonProps={{ danger: true }}
                >
                  <Button icon={<ClearOutlined />} danger>清空</Button>
                </Popconfirm>
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
