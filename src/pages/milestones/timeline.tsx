import useIsBrowser from '@docusaurus/useIsBrowser'
import { mdiCheckboxBlankCircle, mdiCheckboxMarkedCircle } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'

export type Item = {
  icon: string
  iconColor: string
  title: string
  description?: string
  link?: { url: string; text: string }
  done?: boolean
  getDateLabel: (language: string) => string // 日期标签函数
}

interface Props {
  items: Item[]
}

export function Timeline({ items }: Props): JSX.Element {
  const isBrowser = useIsBrowser()

  // 添加数据检查，防止传入空数组或 undefined
  if (!items || items.length === 0) {
    return <div>No timeline items available</div>
  }

  return (
    <ul className="flex flex-col pl-4">
      {items.map((item, index) => {
        const isFirst = index === 0
        const isLast = index === items.length - 1
        const done = item.done ?? true
        const dateLabel = item.getDateLabel(isBrowser ? navigator.language : 'zh-CN')
        const timelineIcon = done ? mdiCheckboxMarkedCircle : mdiCheckboxBlankCircle
        const cardIcon = item.icon

        return (
          <li key={index} className={`flex min-h-24 w-[700px] max-w-[90vw] ${done ? '' : 'italic'}`}>
            {/* 日期标签 */}
            <div className="mr-8 hidden w-36 items-center justify-start text-[#ff8080] md:flex dark:text-[#adcbfa]">
              {dateLabel}
            </div>

            {/* 连接线部分 */}
            <div className={`${isFirst && 'relative top-[50%]'}${isLast && 'relative bottom-[50%]'}`}>
              <div
                className={`h-full border-4 border-[#ff8080] border-solid dark:border-[#adcbfa] ${
                  isFirst && 'rounded rounded-t-full'
                }${isLast && 'rounded rounded-b-full'}`}
              ></div>
            </div>

            {/* 图标部分 */}
            <div className="relative top-[50%] left-[-3px] z-10 flex h-8 w-8 translate-x-[-50%] translate-y-[-50%] items-center rounded-full border-2 border-solid bg-[#ff8080] text-white shadow-lg dark:bg-[#adcbfa]">
              {<Icon path={timelineIcon} size={1.25} color="#ffffff" />} {/* 图标设为白色，确保与背景形成对比 */}
            </div>

            {/* 项目卡片部分 */}
            <section className="my-2 flex w-full flex-row gap-2 rounded-2xl border border-gray-200 border-solid bg-gray-100 p-4 transition-all hover:bg-[#ff8080]/10 md:ml-4 dark:bg-[#212121] dark:hover:bg-[#adcbfa]/10">
              {/* 标题和描述 */}
              <div className="flex flex-grow flex-col justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Icon path={cardIcon} size={1} color={item.iconColor || '#ff8080'} className="dark:fill-[#adcbfa]" />
                  <p className="m-0 mt-1 flex place-items-center items-start gap-2 text-lg">
                    <span>{item.title}</span>
                  </p>
                </div>
                <p className="m-0 text-gray-600 text-sm dark:text-gray-300">{item.description}</p>
              </div>

              {/* 链接和日期 */}
              <div className="flex flex-col items-end justify-between">
                {item.link && (
                  <a href={item.link.url} target="_blank" rel="noopener" className="text-[#ff8080] dark:text-[#adcbfa]">
                    [{item.link.text}]
                  </a>
                )}
                <div className="text-right text-sm md:hidden">{dateLabel}</div>
              </div>
            </section>
          </li>
        )
      })}
    </ul>
  )
}

export default Timeline
