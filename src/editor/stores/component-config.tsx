import { create } from "zustand";
import ContainerDev from "../materials/Container/dev";
import ContainerProd from "../materials/Container/prod";
import ButtonDev from "../materials/Button/dev";
import ButtonProd from "../materials/Button/prod";
import PageDev from "../materials/Page/dev";
import PageProd from "../materials/Page/prod";
import InputDev from "../materials/Input/dev";
import InputProd from "../materials/Input/prod";
import ImageDev from "../materials/Image/dev";
import ImageProd from "../materials/Image/prod";

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  dev: any;
  prod: any;
}

export interface State {
  componentConfig: {[key: string]: ComponentConfig}
}

export interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void
}

export const useComponentConfigStore = create<State & Action>(
  (set) => ({
    componentConfig: {
      Container: {
        name: 'Container',
        defaultProps: {},
        desc: '容器',
        dev: ContainerDev,
        prod: ContainerProd,
        stylesSetter: [
          {
            name: 'width',
            label: '宽度',
            type: 'inputNumber',
          },
          {
            name: 'height',
            label: '高度',
            type: 'inputNumber',
          },
          {
            name: 'backgroundColor',
            label: '背景色',
            type: 'input',
          },
          {
            name: 'padding',
            label: '内边距',
            type: 'input',
          },
          {
            name: 'margin',
            label: '外边距',
            type: 'input',
          },
          {
            name: 'borderRadius',
            label: '圆角',
            type: 'inputNumber',
          },
        ],
      },
      Button: {
        name: 'Button',
        defaultProps: {
          type: 'primary',
          text: '按钮'
        },
        desc: '按钮',
        dev: ButtonDev,
        prod: ButtonProd,
        setter: [
          {
            name: 'type',
            label: '按钮类型',
            type: 'select',
            options: [
              { label: '主要按钮', value: 'primary' },
              { label: '次要按钮', value: 'default' },
            ]
          },
          {
            name: 'text',
            label: '文本',
            type: 'input'
          }
        ],
        stylesSetter: [
          {
            name: 'width',
            label: '宽度',
            type: 'inputNumber',
          },
          {
            name: 'height',
            label: '高度',
            type: 'inputNumber',
          },
        ]
      },
      Input: {
        name: 'Input',
        defaultProps: {
          text: '请输入',
        },
        desc: '输入框',
        dev: InputDev,
        prod: InputProd,
        setter: [
          {
            name: 'text',
            label: '占位文本',
            type: 'input',
          },
        ],
        stylesSetter: [
          {
            name: 'width',
            label: '宽度',
            type: 'inputNumber',
          },
          {
            name: 'height',
            label: '高度',
            type: 'inputNumber',
          },
        ],
      },
      Image: {
        name: 'Image',
        defaultProps: {
          url: '',
        },
        desc: '图片',
        dev: ImageDev,
        prod: ImageProd,
        setter: [
          {
            name: 'url',
            label: '图片地址',
            type: 'input',
          },
        ],
        stylesSetter: [
          {
            name: 'width',
            label: '宽度',
            type: 'inputNumber',
          },
          {
            name: 'height',
            label: '高度',
            type: 'inputNumber',
          },
        ],
      },
      Page: {
        name: 'Page',
        defaultProps: {},
        desc: '页面',
        dev: PageDev,
        prod: PageProd,
        stylesSetter: [
          {
            name: 'backgroundColor',
            label: '背景色',
            type: 'input',
          },
          {
            name: 'minHeight',
            label: '最小高度',
            type: 'input',
          },
        ],
      }
    },

    registerComponent: (name, componentConfig) => {
      set((state) => {
        return {
          ...state,
          componentConfig: {
            ...state.componentConfig,
            [name]: componentConfig
          }
        }
      })
    }
  })
)
