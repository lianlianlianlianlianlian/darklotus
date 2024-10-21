export const Friends: Friend[] = [
  {
    title: 'TEST',
    description: 'TEST',
    website: 'https://TEST.cn',
    avatar: '/img/friend/test.png',
  },

]

export type Friend = {
  title: string
  description: string
  website: string
  avatar?: string
}
