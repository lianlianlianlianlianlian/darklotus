import { type Variants, motion } from 'framer-motion'
import Translate from '@docusaurus/Translate'
import HeroSvg from './img/hero.svg'
import SocialLinks from '@site/src/components/SocialLinks'
import { MovingButton } from '../../magicui/moving-border'
import styles from './styles.module.css'


// 定义表情符号数组
const emojis = [
  // Smileys
  "🫨", "🎉", "🚀", "🌟", "🔥", "💖", "🌈", "🎶",
  "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆",
  "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙",
  "😚", "😇", "🥰", "😐", "😑", "😶", "🙄", "😏",
  "😣", "😥", "😮", "😯", "😲", "😳", "😱", "😨",
  "😰", "😥", "😢", "😭", "😤", "😠", "😡", "🤬",
  "🤯", "😳", "😵", "😵‍💫", "😷", "🤒", "🤕", "🤢",
  "🤮", "🥴", "😈", "👿", "💀", "☠️", "👻", "👽",
  
  // Animals & Nature
  "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼",
  "🐨", "🐯", "🦁", "🐸", "🐵", "🐔", "🐧", "🐦",
  "🐤", "🐣", "🐥", "🦋", "🐞", "🐌", "🐚", "🌼",
  "🌻", "🌷", "🌹", "🌺", "🌸", "🍀", "🌳", "🌲",
  "🌴", "🌵", "🌾", "🌿", "🍃", "🌊", "🌈", "☀️",
  "🌧️", "⛈️", "🌩️", "🌪️", "🌫️", "🌍", "🌎", "🌏",

  // Food & Drink
  "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇",
  "🍓", "🍈", "🍒", "🍑", "🍍", "🥭", "🥥", "🥑",
  "🍅", "🥕", "🥔", "🌽", "🌶️", "🥬", "🥦", "🍆",
  "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🍜",
  "🍣", "🍱", "🍤", "🍙", "🍚", "🍘", "🥗", "🍦",
  "🍰", "🎂", "🍪", "🍩", "🍫", "🍬", "🍭", "🍮",
  "☕", "🍵", "🍶", "🍺", "🍻", "🥂", "🥃", "🍸",

  // Activity and Sports
  "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🏏",
  "🏹", "🎣", "🎽", "🚴‍♂️", "🚴‍♀️", "🏋️‍♂️", "🏋️‍♀️", "🤼‍♂️",
  "🤼‍♀️", "🤸‍♂️", "🤸‍♀️", "⛷️", "🏂", "🏊‍♂️", "🏊‍♀️", "🚣‍♂️",
  "🚣‍♀️", "🏌️‍♂️", "🏌️‍♀️", "🧗‍♂️", "🧗‍♀️", "🚵‍♂️", "🚵‍♀️", "🏇",
  "🏍️", "🛹", "🛶", "🚤", "🛥️", "⛵", "🏖️", "🏝️",

  // Objects
  "📱", "📲", "💻", "🖥️", "🖨️", "⌨️", "🖱️", "📺",
  "📷", "📸", "📹", "🎥", "📼", "💡", "🔦", "🔌",
  "🔋", "🧯", "🧰", "🧳", "🔑", "🗝️", "🔒", "🔓",
  "💼", "📚", "📖", "📜", "📃", "📑", "📰", "🗞️",
  "✉️", "📧", "📬", "📮", "📦", "📫", "📪", "📮"

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

function getRandomEmoji() {
  // 随机选择一个表情符号
  return emojis[Math.floor(Math.random() * emojis.length)]
}

function Circle() {
  return <div className={styles.circle} />
}

function Name() {
  return (
    <motion.div
      className={styles.hero_text}
      custom={1}
      initial="hidden"
      animate="visible"
      variants={variants}
      onMouseMove={e => {
        e.currentTarget.style.setProperty('--x', `${e.clientX}px`)
        e.currentTarget.style.setProperty('--y', `${e.clientY}px`)
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
      <span className="ml-1">{getRandomEmoji()}</span> {/* 随机显示表情符号 */}
    </motion.div>
  )
}

export default function Hero() {
  return (
    <motion.div className={styles.hero}>
      <div className={styles.intro}>
        <Name />
        <motion.p custom={2} initial="hidden" animate="visible" variants={variants} className="max-lg:px-4">
          <Translate id="homepage.hero.text">
            欢迎来到我的主页，祝你永远不死！
          </Translate>
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
