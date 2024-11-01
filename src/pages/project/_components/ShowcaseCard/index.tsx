import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import { Icon } from '@iconify/react' // 导入 Iconify 组件
import { type Project, type Tag, TagList, type TagType, Tags } from '@site/data/projects'
import Tooltip from '@site/src/components/Tooltip'
import { MagicCard } from '@site/src/components/magicui/magic-card'
import { cn } from '@site/src/lib/utils'
import Image from '@theme/IdealImage'
import React, { memo } from 'react'
import styles from './styles.module.css'

const TagComp = React.forwardRef<HTMLLIElement, Tag>(({ label, color, description }, ref) => (
  <li ref={ref} className={styles.tag} title={description}>
    <span className={styles.textLabel}>{label.toLowerCase()}</span>
    <span className={styles.colorLabel} style={{ backgroundColor: color }} />
  </li>
))

function ShowcaseCardTag({ tags }: { tags: TagType[] }) {
  return (
    <>
      {tags.map((tag, index) => {
        const tagData = Tags[tag]
        return (
          <Tooltip key={index} text={tagData.description} anchorEl="#__docusaurus" id={`showcase_card_tag_${tag}`}>
            <TagComp label={tagData.label} color={tagData.color} description={tagData.description} />
          </Tooltip>
        )
      })}
    </>
  )
}

const ShowcaseCard = memo(({ project }: { project: Project }) => {
  return (
    <MagicCard key={project.title} className={cn('card', styles.showcaseCard)}>
      {project.preview && (
        <div className={cn('card__image', styles.showcaseCardImage)}>
          <Image src={project.preview} alt={project.title} img={project.preview} />
        </div>
      )}
      <div className="card__body">
        <div className={cn(styles.showcaseCardHeader)}>
          <h4 className={styles.showcaseCardTitle}>
            <Link href={project.website}>{project.title}</Link>
          </h4>

          {/* 使用自定义图标大小 */}
          <Icon icon={project.icon} style={{ fontSize: project.iconSize }} className="text-neutral-500" />

          {project.button && project.source && (
            <Link
              href={project.source}
              className={cn('button button--secondary button--sm', styles.showcaseCardSrcBtn)}
            >
              {project.button}
            </Link>
          )}
        </div>
        <p className={styles.showcaseCardBody}>{project.description}</p>
      </div>
      <ul className={cn('card__footer', styles.cardFooter)}>
        <ShowcaseCardTag tags={project.tags} />
      </ul>
    </MagicCard>
  )
})

export default ShowcaseCard
