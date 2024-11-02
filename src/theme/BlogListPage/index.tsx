import { HtmlClassNameProvider, PageMetadata, ThemeClassNames } from '@docusaurus/theme-common'
import { cn } from '@site/src/lib/utils'
import BackToTopButton from '@theme/BackToTopButton'
import type { Props } from '@theme/BlogListPage'
import BlogListPaginator from '@theme/BlogListPaginator'
import BlogPostItems from '@theme/BlogPostItems'
import SearchMetadata from '@theme/SearchMetadata'

import Translate from '@docusaurus/Translate'
import { Icon } from '@iconify/react'
import { type ViewType } from '@site/src/hooks/useViewType'
import BlogPostGridItems from '../BlogPostGridItems'

import { useEffect, useState } from 'react'
import MyLayout from '../MyLayout'

function BlogListPageMetadata(props: Props): JSX.Element {
  const { metadata } = props
  const { blogDescription } = metadata

  return (
    <>
      <PageMetadata title="Blog" description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  )
}

function ViewTypeSwitch({
  viewType,
  toggleViewType,
}: {
  viewType: ViewType
  toggleViewType: (viewType: ViewType) => void
}): JSX.Element {
  return (
    <div className="my-4 flex items-center justify-center">
      <Icon
        icon="ph:list"
        width="24"
        height="24"
        onClick={() => toggleViewType('list')}
        color={viewType === 'list' ? 'var(--ifm-color-primary)' : '#ccc'}
        className="cursor-pointer transition duration-500"
      />
      <Icon
        icon="ph:grid-four"
        width="24"
        height="24"
        onClick={() => toggleViewType('grid')}
        color={viewType === 'grid' ? 'var(--ifm-color-primary)' : '#ccc'}
        className="cursor-pointer transition duration-500"
      />
    </div>
  )
}

function BlogListPageContent(props: Props) {
  const { metadata, items } = props

  // 从 localStorage 中获取初始 viewType，默认是 'list'
  const [viewType, setViewType] = useState<ViewType>('list')

  useEffect(() => {
    const storedViewType = localStorage.getItem('viewType') as ViewType
    if (storedViewType) {
      setViewType(storedViewType)
    }
  }, [])

  // 更新视图模式并存储到 localStorage
  const toggleViewType = (newViewType: ViewType) => {
    setViewType(newViewType)
    localStorage.setItem('viewType', newViewType)
  }

  const isListView = viewType === 'list'
  const isGridView = viewType === 'grid'

  return (
    <MyLayout>
      <h2 className="h2 mb-4 flex items-center justify-center text-center">
        <Translate id="theme.blog.title.new">博客</Translate>
      </h2>
      <p className="mb-4 text-center">
        <a href="https://Blog.DarkLotus.CN" target="_blank">
          Blog.DarkLotus.CN
        </a>
      </p>
      <ViewTypeSwitch viewType={viewType} toggleViewType={toggleViewType} />
      <div className="row">
        <div className={'col col--12'}>
          <>
            {isListView && (
              <div className="mb-4">
                <BlogPostItems items={items} />
              </div>
            )}
            {isGridView && <BlogPostGridItems items={items} />}
          </>
          <BlogListPaginator metadata={metadata} />
        </div>
      </div>
      <BackToTopButton />
    </MyLayout>
  )
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider className={cn(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}>
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  )
}
