import Translate from '@docusaurus/Translate' // 引入 Docusaurus 的 Translate 组件，用于国际化翻译
import { Icon } from '@iconify/react' // 从 Iconify 导入图标组件
import SocialLinks from '@site/src/components/SocialLinks' // 导入社交链接组件
import { type Variants, motion } from 'framer-motion' // 从 framer-motion 导入动画相关的类型和组件
import React, { useEffect, useState } from 'react' // 引入 React 的 Hooks（useEffect 和 useState）
import { MovingButton } from '../../magicui/moving-border' // 导入自定义的 MovingButton 组件
import HeroSvg from './img/hero.svg' // 导入背景 SVG 图片
import styles from './styles.module.css' // 导入组件的 CSS 模块

// 定义 Iconify 图标名称数组
const icons = [
  'streamline-emojis:pouting-cat-face', // 这些是使用的图标名称
  'streamline-emojis:watermelon-2',
  'streamline-emojis:zzz',
  'streamline-emojis:wrench',
  'streamline-emojis:strawberry-1',
  'streamline-emojis:shaved-ice',
  'streamline-emojis:shortcake-2',
  'streamline-emojis:soft-ice-cream-1',
  'streamline-emojis:panda-face',
  'streamline-emojis:weary-cat-face',
  'streamline-emojis:television',
  'streamline-emojis:water-wave',
  'streamline-emojis:sparkling-heart',
  'streamline-emojis:right-anger-bubble',
  'streamline-emojis:rocket',
  'streamline-emojis:palm-tree',
  'streamline-emojis:poultry-leg',
  'streamline-emojis:meat-on-bone',
  'streamline-emojis:heart-with-arrow',
  'streamline-emojis:koala',
  'streamline-emojis:hamburger-3',
  'streamline-emojis:hot-beverage-2',
  'streamline-emojis:honey-pot',
  'streamline-emojis:paw-prints',
  'streamline-emojis:high-voltage',
  'streamline-emojis:goat',
  'streamline-emojis:grapes',
  'streamline-emojis:fire',
  'streamline-emojis:fuel-pump',
  'streamline-emojis:ewe-1',
  'streamline-emojis:doughnut-1',
  'streamline-emojis:collision',
  'streamline-emojis:cherries',
  'streamline-emojis:birthday-cake-3',
  'devicon:windows11', // devicon 系列图标
  'devicon:vuejs',
  'devicon:vscode',
  'devicon:safari',
  'devicon:react',
  'devicon:redis',
  'devicon:renpy',
  'devicon:mysql',
  'devicon:netlify',
  'devicon:linux',
  'devicon:homebrew',
  'devicon:docker',
  'devicon:cloudflare',
  'twemoji:lotus', // twemoji 系列图标
  'twemoji:laptop',
  'token-branded:popcat',
  'token-branded:bai',
]

// 动画变体（Variants）定义
const variants: Variants = {
  visible: i => ({
    opacity: 1, // 当可见时，设置透明度为 1
    y: 0, // 设置垂直位移为 0
    transition: {
      type: 'spring', // 使用弹簧动画
      damping: 25, // 弹簧的阻尼
      stiffness: 100, // 弹簧的刚度
      duration: 0.3, // 动画持续时间
      delay: i * 0.3, // 动画延迟，根据索引调整
    },
  }),
  hidden: { opacity: 0, y: 30 }, // 当不可见时，透明度为 0，垂直位移为 30
}

// 获取一个随机图标
function getRandomIcon() {
  return icons[Math.floor(Math.random() * icons.length)]
}

// 检查图标是否有效
function isIconValid(icon: string) {
  return true // 假设所有图标都是有效的
}

// 圆形背景组件
function Circle() {
  return <div className={styles.circle} />
}

// 主要的名字显示组件
function Name() {
  const [currentIcon, setCurrentIcon] = useState(getRandomIcon()) // 存储当前的图标

  useEffect(() => {
    // 每 2 秒更新一次图标
    const interval = setInterval(() => {
      let newIcon
      do {
        newIcon = getRandomIcon()
      } while (!isIconValid(newIcon)) // 保证新图标是有效的
      setCurrentIcon(newIcon) // 更新当前图标
    }, 2000) // 每 2 秒更新一次

    return () => clearInterval(interval) // 清除定时器（组件卸载时）
  }, [])

  return (
    <motion.div
      className={styles.hero_text} // 应用样式
      custom={1} // 自定义动画索引
      initial="hidden" // 初始状态为隐藏
      animate="visible" // 动画状态为可见
      variants={variants} // 应用动画变体
      onMouseMove={e => {
        e.currentTarget.style.setProperty('--x', `${e.clientX}px`)
        e.currentTarget.style.setProperty('--y', `${e.clientY}px`)
      }}
    >
      <Translate id="homepage.hero.greet">Hello! 我是</Translate> {/* 国际化问候语 */}
      <span
        className={styles.name} // 应用样式
        onMouseMove={e => {
          const bounding = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--mouse-x', `${bounding.x}px`)
          e.currentTarget.style.setProperty('--mouse-y', `${bounding.y}px`)
        }}
      >
        <Translate id="homepage.hero.name">Lian</Translate> {/* 国际化姓名 */}
      </span>
      {/* 这个 span 包裹图标，确保响应同样的鼠标事件 */}
      <span
        className={styles.icon_wrap} // 图标样式
        onMouseMove={e => {
          const bounding = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--mouse-x', `${bounding.x}px`)
          e.currentTarget.style.setProperty('--mouse-y', `${bounding.y}px`)
        }}
      >
        <Icon icon={currentIcon} /> {/* 显示随机图标 */}
      </span>
    </motion.div>
  )
}

// Hero 组件
export default function Hero() {
  return (
    <motion.div className={styles.hero}>
      {' '}
      {/* Hero 整体容器 */}
      <div className={styles.intro}>
        {' '}
        {/* 介绍部分 */}
        <Name /> {/* 显示姓名和图标 */}
        <motion.p custom={2} initial="hidden" animate="visible" variants={variants} className="max-lg:px-4">
          <Translate id="homepage.hero.text">欢迎来到我的主页，祝你永远不死！</Translate> {/* 国际化欢迎文本 */}
        </motion.p>
        <motion.div custom={3} initial="hidden" animate="visible" variants={variants}>
          <SocialLinks /> {/* 社交链接部分 */}
        </motion.div>
        <motion.div className="mt-4 flex gap-2" custom={4} initial="hidden" animate="visible" variants={variants}>
          <MovingButton
            borderRadius="1.25rem"
            className="relative z-10 flex items-center rounded-2xl border border-neutral-200 border-solid bg-background px-5 py-3 text-center font-semibold text-base dark:border-neutral-800"
          >
            <a href={'/about'} className="font-semibold">
              <Translate id="hompage.hero.introduce">自我介绍</Translate> {/* 国际化按钮文本 */}
            </a>
          </MovingButton>
        </motion.div>
      </div>
      <motion.div className={styles.background}>
        {' '}
        {/* 背景部分 */}
        <HeroSvg /> {/* 显示背景 SVG */}
        <Circle /> {/* 显示圆形背景 */}
      </motion.div>
    </motion.div>
  )
}
