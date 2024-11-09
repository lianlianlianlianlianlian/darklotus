import { translate } from '@docusaurus/Translate'
import { Icon } from '@iconify/react' // 引入Iconify图标库
import Layout from '@theme/Layout' // Docusaurus页面布局组件
import React from 'react'
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton' // 导入返回顶部按钮组件
import { Item, Timeline } from './timeline' // 自定义Timeline组件和Item类型

// 定义版本号及其发布日期
const releases = {
  'v1.0.0': new Date(2024, 9, 21),
  // ...其他版本
}

// 特殊版本标签
const weirdTags = {
  'v1.0.0': 'v1.41.1_64-dev',
  // ...其他版本的特殊标签
}

// 工具函数：根据语言返回日期
const withLanguage = (date: Date) => (language: string) => {
  return language === 'zh-CN' ? date.toLocaleDateString('zh-CN') : date.toLocaleDateString('en-US')
}

// 用于生成包含版本信息的函数
type Base = { icon: string; iconColor?: React.CSSProperties['color']; title: string; description: string }
const withRelease = ({
  icon,
  iconColor,
  title,
  description,
  release: version,
}: Base & { release: keyof typeof releases }) => {
  return {
    icon,
    iconColor: iconColor ?? 'gray',
    title,
    description,
    link: {
      url: `https://github.com/lianlianlianlianlianlian/darklotus/releases/${weirdTags[version] ?? version}`,
      text: version,
    },
    getDateLabel: withLanguage(releases[version]),
    //   customLink: { url: 'https://example.com/custom', text: '自定义链接' }, // 示例自定义链接
  }
}

// 定义产品的未来规划列表（roadmap）
const roadmap: Item[] = [
  {
    done: false,
    icon: 'simple-icons:kfc',
    iconColor: 'red',
    title: translate({ id: 'roadmap.title1', message: '吃肯德基' }),
    description: translate({ id: 'roadmap.description1', message: '疯狂星期四V我50' }),
    getDateLabel: () => translate({ id: 'roadmap.date1', message: '计划于2025年' }),
    customLink: { url: 'https://kfcapp.cn/', text: '💴V你50💰' }, // 自定义链接
  },
  {
    done: false,
    icon: 'simple-icons:burgerking',
    iconColor: '#FF8800',
    title: translate({ id: 'roadmap.title1', message: '吃汉堡王' }),
    description: translate({ id: 'roadmap.description1', message: '没有人比我更懂汉堡王' }),
    getDateLabel: () => translate({ id: 'roadmap.date1', message: '计划于2025年' }),
    customLink: { url: 'https://www.bkchina.cn/', text: '🍔吃起嘛吃起🍟' }, // 自定义链接
  },
  {
    done: false,
    icon: 'simple-icons:mcdonalds',
    iconColor: 'gold',
    title: translate({ id: 'roadmap.title2', message: '吃麦当劳' }),
    description: translate({ id: 'roadmap.description2', message: '麦门永存' }),
    getDateLabel: () => translate({ id: 'roadmap.date2', message: '计划于2025年' }),
    customLink: { url: 'https://www.mcdonalds.com.cn/', text: '🥤带你去吃🐔' }, // 自定义链接
  },
  // ...其他规划项
]

// 已发布版本和里程碑
const milestones: Item[] = [
  {
    icon: 'twemoji:bullseye',
    iconColor: 'gray',
    title: translate({ id: 'milestones.title2', message: '增加里程碑' }),
    description: translate({ id: 'milestones.description2', message: '主页增加里程碑页面' }),
    getDateLabel: withLanguage(new Date(2024, 10, 9)),
//    customLink: { url: '', text: '6️⃣6️⃣6️⃣' }, // 自定义链接
  },
  withRelease({
    icon: 'noto-v1:party-popper',
    iconColor: 'deeppink',
    title: translate({ id: 'release.title', message: '首次提交' }),
    description: translate({ id: 'release.description', message: '在GitHub上的首次提交，黑暗之莲诞生。' }),
    release: 'v1.0.0',
    customLink: { url: 'https://github.com/lianlianlianlianlianlian/darklotus', text: '项目主页' }, // 自定义链接
  }),
  // ...其他里程碑...
]

// 页面组件，展示里程碑与路线图
export default function MilestonePage(): JSX.Element {
  const allItems = [...roadmap, ...milestones]
  const sortedItems = allItems.sort((a, b) => {
    const dateA = a.getDateLabel('zh-CN')
    const dateB = b.getDateLabel('zh-CN')
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })

  return (
    <Layout
      title={translate({ id: 'milestonePage.title', message: '里程碑' })}
      description={translate({ id: 'milestonePage.description', message: 'DarkLotus的历史' })}
    >
      <section className="my-8">
        <h1 className="mb-10 px-2 text-center text-[#ff8080] md:text-6xl dark:text-[#adcbfa]">
          {translate({ id: 'milestonePage.title', message: '里程碑' })}
        </h1>
        <p className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400 bg-clip-text px-2 text-center font-semibold text-transparent text-xl transition-all duration-1000 ease-in-out hover:opacity-70">
          {translate({
            id: 'milestonePage.descriptionText',
            message: '一个包含未来计划和目标的列表，以及过去的成就和里程碑。',
          })}
        </p>
        <div className="mt-8 flex w-full max-w-full justify-around">
          <Timeline items={sortedItems} />
        </div>
      </section>
      <BackToTopButton />
    </Layout>
  )
}
