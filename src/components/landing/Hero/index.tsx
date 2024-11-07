import Translate from '@docusaurus/Translate'
import { Icon } from '@iconify/react'
import SocialLinks from '@site/src/components/SocialLinks'
import { type Variants, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { MovingButton } from '../../magicui/moving-border'
import HeroSvg from './img/hero.svg'
import styles from './styles.module.css'

// 定义 Iconify 图标名称数组
const icons = [
  'streamline-emojis:pouting-cat-face',
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
  'devicon:windows11',
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
  'twemoji:lotus',
  'twemoji:laptop',
  'token-branded:popcat',
  'token-branded:bai',
]

const variants: Variants = {
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
      duration: 0.3,
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0, y: 30 },
}

function getRandomIcon() {
  return icons[Math.floor(Math.random() * icons.length)]
}

function isIconValid(icon) {
  // 检查图标是否有效
  // 这里可以添加加载图标的逻辑，比如尝试加载图标并查看是否成功
  return true; // 假设所有图标都有效
}

function Circle() {
  return <div className={styles.circle} />
}

function Name() {
  const [currentIcon, setCurrentIcon] = useState(getRandomIcon())

  useEffect(() => {
    const interval = setInterval(() => {
      let newIcon;
      do {
        newIcon = getRandomIcon();
      } while (!isIconValid(newIcon)); // 确保新图标有效
      setCurrentIcon(newIcon);
    }, 2000) // 每隔两秒切换图标

    return () => clearInterval(interval) // 清理副作用
  }, [])

  return (
    <motion.div
      className={styles.hero_text}
      custom={1}
      initial="hidden"
      animate="visible"
      variants={variants}
      onMouseMove={e => {
        e.currentTarget.style.setProperty('--x', `${e.clientX}px`)
        e.currentTarget.style.setProperty('--y', `${e.currentTarget.clientY}px`)
      }}
    >
      <Translate id="homepage.hero.greet">Hello! 我是</Translate>
      <span
        className={styles.name}
        onMouseMove={e => {
          const bounding = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--mouse-x', `${bounding.x}px`)
          e.currentTarget.style.setProperty('--mouse-y', `${bounding.y}px`)
        }}
      >
        <Translate id="homepage.hero.name">Lian</Translate>
      </span>
      <span className="ml-1">
        <Icon icon={currentIcon} /> {/* 显示当前图标 */}
      </span>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <motion.div className={styles.hero}>
      <div className={styles.intro}>
        <Name />
        <motion.p custom={2} initial="hidden" animate="visible" variants={variants} className="max-lg:px-4">
          <Translate id="homepage.hero.text">欢迎来到我的主页，祝你永远不死！</Translate>
        </motion.p>
        <motion.div custom={3} initial="hidden" animate="visible" variants={variants}>
          <SocialLinks />
        </motion.div>
        <motion.div className="mt-4 flex gap-2" custom={4} initial="hidden" animate="visible" variants={variants}>
          <MovingButton
            borderRadius="1.25rem"
            className="relative z-10 flex items-center rounded-2xl border border-neutral-200 border-solid bg-background px-5 py-3 text-center font-semibold text-base dark:border-neutral-800"
          >
            <a href={'/about'} className="font-semibold">
              <Translate id="hompage.hero.introduce">自我介绍</Translate>
            </a>
          </MovingButton>
        </motion.div>
      </div>
      <motion.div className={styles.background}>
        <HeroSvg />
        <Circle />
      </motion.div>
    </motion.div>
  )
}