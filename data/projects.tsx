export const projects: Project[] = [
  {
    title: 'DarkLotus',
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
    title: 'TypechoBlog',
    description: '由 Typecho 构建的个人博客🧣',
    preview: '/img/project/blog.avif',
    website: 'https://blog.darklotus.cn',
    source: 'https://typecho.org/',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
    button: '官网', // 自定义按钮文本
    emoji: '🚀', // 自定义 emoji 图标
  },

  {
    title: '2DxRandom',
    description: '由 PHP 创建的动漫随机图API🎁',
    preview: '/img/project/2dxrandom.avif',
    website: 'https://img.darklotus.cn',
    source: 'https://github.com/lianlianlianlianlianlian/2DxRandom',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
    button: '源码', // 自定义按钮文本
    emoji: '🎉', // 自定义 emoji 图标
  },

  {
    title: 'Chevereto',
    description: '由 Chevereto 构建的图床🧸',
    preview: '/img/project/chevereto.avif',
    website: 'https://i.darklotus.cn',
    source: 'https://chevereto.com/',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
    button: '官网', // 自定义按钮文本
    emoji: '📷', // 自定义 emoji 图标
  },

  {
    title: 'EasyImages',
    description: '由 EasyImages 构建的图床🎀',
    preview: '/img/project/easyimages.avif',
    website: 'https://image.darklotus.cn',
    source: 'https://github.com/icret/EasyImages2.0',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
    button: '源码', // 自定义按钮文本
    emoji: '📷', // 自定义 emoji 图标
  },

  {
    title: 'Gallery',
    description: '由 Hugo 构建的画廊🎨',
    preview: '/img/project/gallery.avif',
    website: 'https://gallery.darklotus.cn',
    source: 'https://github.com/nicokaiser/hugo-theme-gallery',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
    button: '开源', // 自定义按钮文本
    emoji: '🚀', // 自定义 emoji 图标
  },

  {
    title: 'Liuli',
    description: '由 Hugo 构建的画廊🪄',
    preview: '/img/project/liuli.avif',
    website: 'https://liuli.darklotus.cn',
    source: 'https://github.com/Sped0n/bridget',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
    button: '开源', // 自定义按钮文本
    emoji: '🎞', // 自定义 emoji 图标
  },

  // toy
  {
    title: 'MacBookPro',
    description: '我的电脑',
    preview: '/img/project/mac.avif',
    website: 'https://apple.com.cn/macbook-pro',
    source: 'https://apple.com.cn/macbook-pro',
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
    source: 'https://nas.darklotus.cn',
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
    button: '编辑', // 添加按钮文本
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
  web: '网站',
  app: '应用',
  commerce: '商业',
  personal: '个人',
  toy: '玩具',
  other: '其他',
}

export type Project = {
  title: string;
  description: string;
  preview?: string; 
  website: string;
  source?: string | null; 
  tags: TagType[];
  type: ProjectType;
  button?: string; 
  emoji?: string; 
};

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
