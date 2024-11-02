import BrowserOnly from '@docusaurus/BrowserOnly'
import { translate } from '@docusaurus/Translate'
import { useThemeConfig } from '@docusaurus/theme-common'
import { useHideableNavbar, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import type { Props } from '@theme/Navbar/Layout'
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar'
import clsx from 'clsx'
import { type ComponentProps, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import styles from './styles.module.css'

function NavbarBackdrop(props: ComponentProps<'div'>) {
  return <div role="presentation" {...props} className={clsx('navbar-sidebar__backdrop', props.className)} />
}

export default function NavbarLayout({ children }: Props): JSX.Element {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const {
          navbar: { hideOnScroll, style },
        } = useThemeConfig()
        const mobileSidebar = useNavbarMobileSidebar()
        const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll)

        const location = useLocation()
        const isHomePage = location.pathname === '/' || location.pathname === '/en/'

        // 用于记录滚动和滚轮状态
        const lastScrollTop = useRef(window.pageYOffset)
        const wheelDirection = useRef(0)

        // 监听鼠标滚轮事件，获取滚动方向
        const handleWheel = e => {
          wheelDirection.current = e.deltaY > 0 ? 1 : -1
        }

        // 监听页面滚动事件，根据鼠标滚轮方向和页面滚动控制导航栏显示或隐藏
        const handleScroll = () => {
          const scrollTop = window.pageYOffset
          const navbar = document.querySelector('.navbar')

          if (hideOnScroll) {
            if (wheelDirection.current === -1 && scrollTop > 0) {
              // 仅当鼠标滚轮向上滚动时显示导航栏
              navbar.classList.remove(styles.navbarHidden)
            } else if (wheelDirection.current === 1 || scrollTop !== 0) {
              // 向下滚动或者点击跳转时保持隐藏
              navbar.classList.add(styles.navbarHidden)
            } else if (scrollTop === 0) {
              // 页面滚动到顶部时显示导航栏
              navbar.classList.remove(styles.navbarHidden)
            }
          }

          lastScrollTop.current = scrollTop
        }

        useEffect(() => {
          window.addEventListener('wheel', handleWheel)
          window.addEventListener('scroll', handleScroll)

          return () => {
            window.removeEventListener('wheel', handleWheel)
            window.removeEventListener('scroll', handleScroll)
          }
        }, [])

        return (
          <nav
            ref={navbarRef}
            aria-label={translate({
              id: 'theme.NavBar.navAriaLabel',
              message: 'Main',
              description: 'The ARIA label for the main navigation',
            })}
            className={clsx(
              'navbar',
              'navbar--fixed-top',
              isHomePage && 'bg-transparent',
              hideOnScroll && [styles.navbarHideable, !isNavbarVisible && styles.navbarHidden],
              {
                'navbar--dark': style === 'dark',
                'navbar--primary': style === 'primary',
                'navbar-sidebar--show': mobileSidebar.shown,
              },
            )}
          >
            {children}
            <NavbarBackdrop onClick={mobileSidebar.toggle} />
            <NavbarMobileSidebar />
          </nav>
        )
      }}
    </BrowserOnly>
  )
}
