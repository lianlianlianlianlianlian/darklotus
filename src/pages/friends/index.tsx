import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import { Friend, Friends } from '@site/data/friends'
import Comment from '@site/src/components/Comment'
import CodeBlock from '@theme/CodeBlock'
import Layout from '@theme/Layout'
import { motion } from 'framer-motion'
import { memo, useRef, useState } from 'react'
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton' // 导入返回顶部按钮组件
import styles from './styles.module.css'

const TITLE = translate({
  id: 'theme.friends.title',
  message: '友链',
})
const DESCRIPTION = translate({
  id: 'theme.friends.description',
  message: '倾听、学习，并分享自己的见解，保持谦虚，而不是一味地展示自己',
})
const ADD_FRIEND_URL = 'https://github.com/lianlianlianlianlianlian/darklotus/edit/main/data/friends.tsx'
const SITE_INFO = `
title: 'Lian'
description: '耍起嘛耍起'
website: 'https://darklotus.cn'
avatar: 'https://darklotus.cn/img/logo.png'
`
const friends = Friends

function SiteInfo() {
  return (
    <div className="w-96 rounded-[var(--ifm-pre-border-radius)] border border-black border-solid border-opacity-10 text-left text-sm leading-none">
      <CodeBlock language="yaml" title="本站信息" className={styles.codeBlock}>
        {SITE_INFO}
      </CodeBlock>
    </div>
  )
}

function FriendHeader({ onApplyClick, showFooter }: { onApplyClick: () => void; showFooter: boolean }) {
  return (
    <section className="margin-top--lg margin-bottom--lg text-center">
      <h1>{TITLE}</h1>
      <p>{DESCRIPTION}</p>
      {showFooter ? (
        <button className="button button--primary" onClick={onApplyClick}>
          {translate({
            id: 'theme.friends.applyLink',
            message: '申请友链',
            description: 'Button text for applying to become a friend link',
          })}
        </button>
      ) : (
        <a href={ADD_FRIEND_URL} target="_blank" rel="noopener noreferrer" className="button button--primary">
          {translate({
            id: 'theme.friends.applyLink',
            message: '申请友链',
            description: 'Button text for applying to become a friend link',
          })}
        </a>
      )}
    </section>
  )
}

const FriendCard = memo(({ friend }: { friend: Friend }) => (
  <li className="relative flex min-h-24 cursor-pointer flex-row items-center overflow-hidden rounded-card bg-card px-4 py-1 transition-all duration-300 hover:translate-y-[-5px] hover:scale-[1.01] hover:bg-[rgba(229,231,235,0.3)] hover:shadow-[0_3px_10px_0_rgba(164,190,217,0.3)]">
    <img
      src={typeof friend.avatar === 'string' ? friend.avatar : friend.avatar.src.src}
      alt={friend.title}
      className="size-16 min-w-16 rounded-full object-contain"
    />
    <div className="pl-4">
      <div className="mb-1 flex items-center">
        <h4 className="mb-0 flex-1">
          <Link
            to={friend.website}
            className="bg-[0%_100%] bg-[length:0%_1px] bg-gradient-to-b from-ifm-color-primary to-ifm-color-primary bg-no-repeat no-underline transition-[background-size] duration-200 ease-out hover:bg-[length:100%_1px] focus:bg-[length:100%_1px]"
          >
            {friend.title}
          </Link>
        </h4>
      </div>
      <p className="m-0 line-clamp-2 w-full overflow-hidden text-sm leading-[1.66]">{friend.description}</p>
    </div>
  </li>
))

function FriendCards() {
  return (
    <section className="mt-8 mb-8">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <ul className="grid grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {friends.map(friend => (
            <FriendCard key={friend.avatar} friend={friend} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function FriendLink(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const commentRef = useRef<HTMLDivElement>(null)
  const [showFooter, setShowFooter] = useState(true) // false关闭 true开启 控制按钮是否跳转到页脚

  const scrollToComment = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Layout title={TITLE} description={DESCRIPTION} wrapperClassName="bg-background">
      <motion.main ref={ref} className="my-4">
        <FriendHeader onApplyClick={scrollToComment} showFooter={showFooter} />
        <FriendCards />
        <motion.div drag dragConstraints={ref} className="sticky bottom-4 left-4 inline-flex cursor-move text-right">
          <SiteInfo />
        </motion.div>
      </motion.main>
      <BackToTopButton />
      <div ref={commentRef} className={styles.commentContainer}>
        <Comment />
      </div>
    </Layout>
  )
}
