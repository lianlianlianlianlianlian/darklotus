import { translate } from '@docusaurus/Translate'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import { usePluralForm } from '@docusaurus/theme-common'
import { useDateTimeFormat } from '@docusaurus/theme-common/internal'
import { cn } from '@site/src/lib/utils'
import type { Props } from '@theme/BlogPostItem/Header/Info'

import { Icon } from '@iconify/react'
import Tag from '@site/src/theme/Tag'

// 用于处理复数形式的 Hook
function useReadingTimePlural() {
  const { selectMessage } = usePluralForm()
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat)
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          message: 'One min read|{readingTime} min read',
        },
        { readingTime },
      ),
    )
  }
}

// 阅读时间组件
export function ReadingTime({ readingTime }: { readingTime: number }) {
  const readingTimePlural = useReadingTimePlural()
  return <span className="truncate">{readingTimePlural(readingTime)}</span>
}

// 日期时间组件
function DateTime({ date, formattedDate }: { date: string; formattedDate: string }) {
  return (
    <time dateTime={date} itemProp="datePublished" className="truncate">
      {formattedDate}
    </time>
  )
}

export default function BlogPostItemHeaderInfo({ className }: Props): JSX.Element {
  const { metadata } = useBlogPost()
  const { date, tags, readingTime, authors } = metadata // 提取 authors 信息

  const tagsExists = tags.length > 0

  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

  const formatDate = (blogDate: string) => dateTimeFormat.format(new Date(blogDate))

  return (
    <div className={cn('inline-flex flex-wrap gap-1.5 text-base', 'margin-bottom--md', className)}>
      <div className="inline-flex items-center gap-1">
        <Icon icon="ri:calendar-line" />
        <DateTime date={date} formattedDate={formatDate(date)} />
      </div>
      {tagsExists && (
        <div className="inline-flex items-center gap-1">
          <Icon icon="ri:price-tag-3-line" />
          <div className={cn('truncate', 'inline-flex text-center')}>
            {tags.slice(0, 3).map(({ label, description, permalink: tagPermalink }, index) => {
              return (
                <div key={tagPermalink}>
                  {index !== 0 && '/'}
                  <Tag
                    label={label}
                    permalink={tagPermalink}
                    className={'tag !border-0 px-0.5 py-0.5 text-text hover:text-link'}
                    description={description}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
      {typeof readingTime !== 'undefined' && (
        <div className="inline-flex items-center gap-1">
          <Icon icon="ri:time-line" />
          <ReadingTime readingTime={readingTime} />
        </div>
      )}
      {authors &&
        authors.length > 0 && ( // 检查 authors 信息并显示
          <div className="inline-flex items-center gap-1">
            <Icon icon="ri:user-line" />
            <span className="truncate">
              {authors.map((author, index) => (
                <span key={author.url}>
                  <a
                    href={author.url}
                    className="author-link" // 使用 CSS 类
                    style={{ color: 'inherit', textDecoration: 'none' }} // 默认样式
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#ff8080' // 悬停时颜色
                      e.currentTarget.style.textDecoration = 'underline' // 悬停时下划线
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'inherit' // 还原颜色
                      e.currentTarget.style.textDecoration = 'none' // 还原下划线
                    }}
                  >
                    {author.name}
                  </a>
                  {index < authors.length - 1 && ', '} {/* 在作者之间添加逗号 */}
                </span>
              ))}
            </span>
          </div>
        )}
    </div>
  )
}
