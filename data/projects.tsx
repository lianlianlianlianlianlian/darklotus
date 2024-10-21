export const projects: Project[] = [
  {
    title: 'DarkLotusIndex',
    description: '由 Docusaurus 构建的个人主页🦖',
    preview: '/img/project/blog.png',
    website: 'https://darklotus.cn',
    source: 'https://github.com/lianlianlianlianlianlian/DarkLotusIndex',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  // toy
  {
    title: '耍',
    description: '耍',
    preview: '/img/project/play.png',
    website: 'https://darklotus.cn',
    source: 'https://github.com/lianlianlianlianlianlian/DarkLotusIndex',
    tags: ['opensource', 'favorite'],
    type: 'toy',
  },
  
 // personal
  {
    title: '这里是标题',
    description: '这里是介绍',
    preview: '/img/project/vscode-extension.png',
    website: 'https://darklotus.cn',
    source: 'https://github.com/lianlianlianlianlianlian/DarkLotusIndex',
    tags: ['opensource'],
    type: 'personal',
  },
 
  
  // other
  {
    title: '待编辑',
    description: '待编辑',
    website: '待编辑',
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
