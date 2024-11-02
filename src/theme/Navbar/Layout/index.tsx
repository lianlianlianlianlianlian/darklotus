import BrowserOnly from '@docusaurus/BrowserOnly'
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

        const lastScrollTop = useRef(window.pageYOffset)
        const wheelDirection = useRef(0)
        const navbar = useRef<HTMLDivElement | null>(null)
        const triggeredByWheel = useRef(false)
        const displayLock = useRef(false) // 持续上滑显示锁定状态

        // 监听鼠标滚轮事件，获取滚动方向
        const handleWheel = (e: WheelEvent) => {
          wheelDirection.current = e.deltaY > 0 ? 1 : -1
          triggeredByWheel.current = true

          // 仅在导航栏隐藏时触发显示锁定
          if (
            hideOnScroll &&
            wheelDirection.current === -1 &&
            navbar.current?.classList.contains(styles.navbarHidden)
          ) {
            navbar.current.classList.remove(styles.navbarHidden)
            displayLock.current = true // 锁定显示状态
          } else if (hideOnScroll && wheelDirection.current === 1) {
            navbar.current.classList.add(styles.navbarHidden)
            displayLock.current = false // 解除锁定
          }
        }

        // 添加点击事件监听，隐藏导航栏
        const handleClick = () => {
          if (displayLock.current) {
            navbar.current?.classList.add(styles.navbarHidden)
            displayLock.current = false // 解除锁定
          }
        }

        // 监听页面滚动事件
        const handleScroll = () => {
          const scrollTop = window.pageYOffset

          // 到顶部时始终显示导航栏
          if (scrollTop === 0) {
            navbar.current?.classList.remove(styles.navbarHidden)
          }
          // 如果向下滚动且未锁定显示状态，隐藏导航栏
          else if (scrollTop > lastScrollTop.current && !displayLock.current) {
            navbar.current?.classList.add(styles.navbarHidden)
          }
          // 向上滚动时显示导航栏
          else if (scrollTop < lastScrollTop.current && !triggeredByWheel.current && !displayLock.current) {
            navbar.current?.classList.add(styles.navbarHidden)
          }

          // 重置滚轮触发标记
          if (scrollTop !== lastScrollTop.current) {
            triggeredByWheel.current = false
          }

          lastScrollTop.current = scrollTop
        }

        useEffect(() => {
          navbar.current = document.querySelector('.navbar')

          window.addEventListener('wheel', handleWheel)
          window.addEventListener('scroll', handleScroll)
          window.addEventListener('click', handleClick) // 监听点击事件

          return () => {
            window.removeEventListener('wheel', handleWheel)
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('click', handleClick) // 清除点击事件监听
          }
        }, [])

        // 路由变化时重置状态
        useEffect(() => {
          displayLock.current = false
          triggeredByWheel.current = false
        }, [location])

        return (
          <nav
            ref={navbarRef}
            aria-label="Main navigation"
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
