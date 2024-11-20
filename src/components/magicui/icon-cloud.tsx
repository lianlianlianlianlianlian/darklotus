'use client'

import { useColorMode } from '@docusaurus/theme-common' // 引入Docusaurus主题的颜色模式
import { useEffect, useMemo, useState } from 'react' // 引入React钩子
import { Cloud, ICloud, SimpleIcon, fetchSimpleIcons, renderSimpleIcon } from 'react-icon-cloud' // 引入react-icon-cloud库

// 配置Cloud组件的属性，设置样式和选项
export const cloudProps: Omit<ICloud, 'children'> = {
  containerProps: {
    style: {
      display: 'flex', // 使用flex布局
      justifyContent: 'center', // 水平居中
      alignItems: 'center', // 垂直居中
      width: '100%', // 容器宽度100%
    },
  },
  options: {
    reverse: true, // 图标显示顺序反转
    depth: 1, // 图标深度
    wheelZoom: false, // 禁用滚轮缩放
    imageScale: 2, // 图标缩放系数
    activeCursor: 'default', // 鼠标光标默认
    tooltip: 'native', // 使用原生提示
    initial: [0.1, -0.1], // 初始位置
    clickToFront: 500, // 点击图标后转到前面
    tooltipDelay: 0, // 提示延迟时间
    outlineColour: '#0000', // 无边框
    maxSpeed: 0.04, // 最大速度
    minSpeed: 0.02, // 最小速度
    // dragControl: false, // 禁用拖拽控制
  },
}

// 渲染自定义图标，根据当前主题设置图标的背景色和对比度
export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  // 根据主题设置背景色和后备色
  const bgHex = theme === 'light' ? '#f3f2ef' : '#080510'
  const fallbackHex = theme === 'light' ? '#6e6e73' : '#ffffff'
  // 设置最小对比度，深色模式下要求更高对比度
  const minContrastRatio = theme === 'dark' ? 2 : 1.2

  // 渲染图标，返回自定义样式
  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42, // 设置图标大小
    aProps: {
      href: undefined, // 禁用链接
      target: undefined, // 禁用新窗口
      rel: undefined, // 禁用关系属性
      onClick: (e: any) => e.preventDefault(), // 禁用点击事件
    },
  })
}

// 定义动态图标云组件的属性类型
export type DynamicCloudProps = {
  iconSlugs: string[] // 图标标识符数组
}

// 获取异步数据类型，包含简单图标
type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>

// 图标云组件
export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null) // 存储获取到的图标数据
  const { colorMode: theme } = useColorMode() // 获取当前主题（深色或浅色）

  // 使用useEffect来加载图标数据
  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData) // 获取图标数据并更新状态
  }, [iconSlugs]) // 每次图标标识符数组更新时重新加载数据

  // 使用useMemo避免不必要的重复渲染
  const renderedIcons = useMemo(() => {
    if (!data) return null // 如果没有数据，返回null

    // 渲染所有图标
    return Object.values(data.simpleIcons).map(icon => renderCustomIcon(icon, theme || 'light'))
  }, [data, theme]) // 依赖于数据和主题更新

  return (
    // @ts-ignore 忽略ts类型检查，传递Cloud组件所需的属性
    <Cloud {...cloudProps}>
      <>{renderedIcons}</> {/* 渲染图标 */}
    </Cloud>
  )
}
