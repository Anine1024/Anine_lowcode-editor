import { Button, Form, Input, Select, Space, Card, Empty } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useComponentsStore } from '../../stores/components'

const EVENT_OPTIONS = [
  { label: '点击事件', value: 'onClick' },
  { label: '值变更', value: 'onChange' },
  { label: '获得焦点', value: 'onFocus' },
  { label: '失去焦点', value: 'onBlur' },
  { label: '鼠标移入', value: 'onMouseEnter' },
  { label: '鼠标移出', value: 'onMouseLeave' },
]

const ACTION_OPTIONS = [
  { label: '显示消息', value: 'showMessage' },
  { label: '跳转URL', value: 'navigate' },
]

export default function ComponentEvent() {
  const { curComponent, curComponentId, updateComponentProps } = useComponentsStore()
  const [form] = Form.useForm()

  if (!curComponent || !curComponentId) {
    return (
      <div className="pt-[40px]">
        <Empty description="请先在画布中选择组件" />
      </div>
    )
  }

  const events: any[] = curComponent.props?.events || []

  const handleEventsChange = (newEvents: any[]) => {
    updateComponentProps(curComponentId, { events: newEvents })
  }

  const addEvent = () => {
    const newEvent = {
      id: Date.now(),
      eventType: 'onClick',
      actionType: 'showMessage',
      actionConfig: { message: '' },
    }
    handleEventsChange([...events, newEvent])
  }

  const removeEvent = (eventId: number) => {
    handleEventsChange(events.filter((e: any) => e.id !== eventId))
  }

  const updateEvent = (eventId: number, field: string, value: any) => {
    handleEventsChange(
      events.map((e: any) =>
        e.id === eventId ? { ...e, [field]: value } : e
      )
    )
  }

  const updateActionConfig = (eventId: number, configField: string, value: any) => {
    handleEventsChange(
      events.map((e: any) =>
        e.id === eventId
          ? { ...e, actionConfig: { ...e.actionConfig, [configField]: value } }
          : e
      )
    )
  }

  return (
    <div>
      {events.map((event: any) => (
        <Card
          key={event.id}
          size="small"
          className="mb-[12px]"
          extra={
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => removeEvent(event.id)}
            />
          }
        >
          <Form layout="vertical" size="small">
            <Form.Item label="事件类型">
              <Select
                value={event.eventType}
                options={EVENT_OPTIONS}
                onChange={(v) => updateEvent(event.id, 'eventType', v)}
              />
            </Form.Item>
            <Form.Item label="触发动作">
              <Select
                value={event.actionType}
                options={ACTION_OPTIONS}
                onChange={(v) => updateEvent(event.id, 'actionType', v)}
              />
            </Form.Item>
            {event.actionType === 'showMessage' && (
              <Form.Item label="消息内容">
                <Input
                  value={event.actionConfig?.message}
                  placeholder="请输入提示消息"
                  onChange={(e) =>
                    updateActionConfig(event.id, 'message', e.target.value)
                  }
                />
              </Form.Item>
            )}
            {event.actionType === 'navigate' && (
              <Form.Item label="目标URL">
                <Input
                  value={event.actionConfig?.url}
                  placeholder="请输入跳转地址"
                  onChange={(e) =>
                    updateActionConfig(event.id, 'url', e.target.value)
                  }
                />
              </Form.Item>
            )}
          </Form>
        </Card>
      ))}
      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={addEvent}
      >
        添加事件
      </Button>
    </div>
  )
}
