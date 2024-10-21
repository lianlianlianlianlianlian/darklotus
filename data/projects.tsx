export const projects: Project[] = [
  {
    title: 'DarkLotusIndex',
    description: '由 Docusaurus 构建的个人主页🦖',
    preview: '/img/project/index.avif',
    website: 'https://darklotus.cn',
    source: 'https://github.com/lianlianlianlianlianlian/darklotus',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
    button: '源码', // 自定义按钮文本
    emoji: '💗', // 自定义 emoji 图标
  },

  {
    title: 'DarkLotusBlog',
    description: '由 Typecho 构建的个人博客🦖',
    preview: '/img/project/blog.avif',
    website: 'https://darklotus.cn',
    source: 'https://github.com/lianlianlianlianlianlian/DarkLotusIndex',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
    button: '源码', // 自定义按钮文本
    emoji: '💗', // 自定义 emoji 图标
  },

  // toy
  {
    title: 'MacBookPro',
    description: '我的电脑',
    preview: '/img/project/mac.avif',
    website: 'https://darklotus.cn',
    source: 'https://github.com/lianlianlianlianlianlian/DarkLotusIndex',
    tags: ['favorite'],
    type: 'toy',
    button: '设备', // 自定义按钮文本
    emoji: '💻', // 自定义 emoji 图标
  },
  
 // personal
  {
    title: 'Synology',
    description: '我的Nas',
    preview: '/img/project/nas.avif',
    website: 'https://nas.darklotus.cn',
    source: 'https://github.com/lianlianlianlianlianlian/DarkLotusIndex',
    tags: ['favorite'],
    type: 'personal',
    button: '设备', // 自定义按钮文本
    emoji: '💥', // 自定义 emoji 图标
  },
 
  
  // other
  {
    title: '待编辑',
    description: '待编辑',
    website: 'https://nas.darklotus.cn',
    tags: ['opensource', 'personal'],
    type: 'other',
  },

]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType = 'favorite' | 'opensource' | 'product' | 'design' | 'large' | 'personal'

export type ProjectType = 'web' | 'app' | 'commerce' | 'personal' | 'toy' | 'other'

export const projectTypeMap = {
  web: 'Web',
  app: 'App',
  commerce: 'Cmmerce',
  personal: 'Personal',
  toy: 'Toy',
  other: 'Other',
}

export type Project = {
  title: string
  description: string
  preview?: string
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce(
  (group, project) => {
    const { type } = project
    group[type] = group[type] ?? []
    group[type].push(project)
    return group
  },
  {} as Record<ProjectType, Project[]>,
)
