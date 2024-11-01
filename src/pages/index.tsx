import useDocusaurusContext from '@docusaurus/useDocusaurusContext' // 导入 Docusaurus 上下文钩子，用于获取站点配置
import Layout from '@theme/Layout' // 导入布局组件，用于包裹页面内容
import BackToTopButton from '../components/BackToTopButton/BackToTopButton' // 导入返回顶部按钮组件
import BlogSection from '../components/landing/BlogSection' // 导入博客部分组件
import FeaturesSection from '../components/landing/FeaturesSection' // 导入功能部分组件
import Hero from '../components/landing/Hero' // 导入英雄部分组件
import ProjectSection from '../components/landing/ProjectSection' // 导入项目部分组件
import Particles from '../components/magicui/particles' // 导入粒子效果组件

// 定义主页组件
export default function Home() {
  // 使用 Docusaurus 上下文获取站点配置
  const {
    siteConfig: { customFields, tagline }, // 解构获取自定义字段和标语
  } = useDocusaurusContext()

  // 从自定义字段中获取描述
  const { description } = customFields as { description: string }

  // 返回页面布局
  return (
    <Layout title={tagline} description={description}>
      {' '}
      {/* 设置页面标题和描述 */}
      <main>
        {' '}
        {/* 主内容区域 */}
        <Hero /> {/* 渲染英雄部分 */}
        <Particles className="absolute inset-0" quantity={100} ease={80} color={'#ffffff'} refresh />{' '}
        {/* 渲染粒子效果 */}
        <div className="relative">
          {' '}
          {/* 相对定位的容器 */}
          <div className="mx-auto max-w-7xl bg-background lg:px-8">
            {' '}
            {/* 设置最大宽度和背景 */}
            <BlogSection /> {/* 渲染博客部分 */}
            <ProjectSection /> {/* 渲染项目部分 */}
            <FeaturesSection /> {/* 渲染功能部分 */}
          </div>
          <div
            className="-z-50 absolute inset-0 bg-grid-slate-50 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.3))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" // 背景样式
            style={{ backgroundPosition: '10px 10px;' }} // 设置背景位置
          />
        </div>
        <BackToTopButton /> {/* 在这里添加返回顶部按钮 */}
      </main>
    </Layout>
  )
}
