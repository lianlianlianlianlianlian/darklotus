import Translate, { translate } from '@docusaurus/Translate'
import { Icon } from '@iconify/react'
import OpenSourceSvg from '@site/static/svg/undraw_open_source.svg'
import SpiderSvg from '@site/static/svg/undraw_spider.svg'
import WebDeveloperSvg from '@site/static/svg/undraw_web_developer.svg'

export type FeatureItem = {
  title: string | React.ReactNode
  description: string | React.ReactNode
  header: React.ReactNode
  icon?: React.ReactNode
}

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.feature.developer',
      message: '设计开发',
    }),
    description: (
      <Translate>
        {translate({
          id: 'homepage.feature.developer.description',
          message: '我热衷于设计作品和开发网站，喜欢将创意转化为实际的体验。通过不断学习新技术，努力提升自己的技能，创造出既美观又实用的网站和作品。',
        })}
      </Translate>
    ),
    header: <WebDeveloperSvg className={'h-auto w-full'} height={150} role="img" />,
    icon: <Icon icon="logos:typescript-icon" className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: translate({
      id: 'homepage.feature.one',
      message: '头号玩家',
    }),
    description: (
      <Translate>
        {translate({
          id: 'homepage.feature.one.description',
          message: '我喜欢折腾各种新鲜玩具，探索它们的潜力。享受配置设备和优化性能的过程，这让我对技术有了更深入的理解，我不是头号玩家，谁是？',
        })}
      </Translate>
    ),
    header: <SpiderSvg className={'h-auto w-full'} height={150} role="img" />,
  },
  {
    title: translate({
      id: 'homepage.feature.enthusiast',
      message: '开源爱好者',
    }),
    description: (
      <Translate>
        {translate({
          id: 'homepage.feature.enthusiast.description',
          message: '作为一名开源爱好者，积极参与开源社区，为开源项目贡献代码，希望有生之年能够构建出一个知名的开源项目，但目前只会改别人的开源代码。',
        })}
      </Translate>
    ),
    header: <OpenSourceSvg className={'h-auto w-full'} height={150} role="img" />,
  },
]

export default FEATURES
