import { Form, Input, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useComponentConfigStore } from '../../stores/component-config';
import type { ComponentSetter } from '../../stores/component-config';
import { useComponentsStore } from '../../stores/components';
import CssEditor from './CssEditor';
import { debounce } from 'lodash-es';
import styleToObject from 'style-to-object';

export default function ComponentStyle() {

  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentStyles } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [css, setCss] = useState<string>(`.comp{\n\n}`);

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(curComponent?.styles || {})
    setCss(toCSSStr(curComponent?.styles!))
  }, [curComponent])

  function toCSSStr(css: Record<string, any> | undefined) {
    if (!css) return `.comp {\n\n}`
    let str = `.comp {\n`
    for (let key in css) {
      let value = css[key]
      if (!value) continue
      if (['width', 'height', 'minHeight', 'borderRadius', 'padding', 'margin'].includes(key) && !value.toString().endsWith('px') && !isNaN(Number(value))) {
        value += 'px'
      }
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      str += `\t${cssKey}: ${value};\n`
    }
    str += `}`
    return str
  }

  if (!curComponentId || !curComponent) return null;

  function renderFormElememt(setting: ComponentSetter) {
    const { type, options } = setting;
  
    if (type === 'select') {
      return <Select options={options} />
    } else if (type === 'input') {
      return <Input />
    } else if (type === 'inputNumber') {
        return <InputNumber />
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
        updateComponentStyles(curComponentId, changeValues);
    }
  }

  const handleEditorChange = debounce((value: string | undefined) => {
    if (!value) return
    setCss(value)

    const css: Record<string, any> = {}

    try {
      const cssStr = value
        .replace(/\/\*[\s\S]*?\*\//g, '')  // 移除所有块注释
        .replace(/\/\/.*/g, '')             // 移除所有行注释
        .replace(/[^{]*\{/, '')             // 移除选择器 {
        .replace(/\}/, '')                  // 移除 }
        .trim()

      styleToObject(cssStr, (name, value) => {
        css[name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value
      })

      updateComponentStyles(curComponentId, { ...form.getFieldsValue(), ...css })
    } catch (_) { /* CSS 解析失败时忽略 */ }
  }, 500)

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      {
        componentConfig[curComponent.name]?.stylesSetter?.map(setter => (
          <Form.Item key={setter.name} name={setter.name} label={setter.label}>
            {renderFormElememt(setter)}
          </Form.Item>
        ))
      }
      <div className='h-[200px] border-[1px] border-[#ccc] z-10'>
        <CssEditor value={ css } onChange={handleEditorChange}/>
      </div>
    </Form>
  )
}