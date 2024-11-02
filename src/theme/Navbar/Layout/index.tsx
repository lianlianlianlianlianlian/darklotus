import BrowserOnly from '@docusaurus/BrowserOnly'
import { useThemeConfig } from '@docusaurus/theme-common'
import { useHideableNavbar, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import type { Props } from '@theme/Navbar/Layout'
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import styles from './styles.module.css'

function NavbarBackdrop(props: React.ComponentProps<'div'>) {
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

        const handleWheel = (e: WheelEvent) => {
          wheelDirection.current = e.deltaY > 0 ? 1 : -1
          triggeredByWheel.current = true

          if (hideOnScroll) {
            requestAnimationFrame(() => {
              if (wheelDirection.current === -1) {
                if (navbar.current) {
                  navbar.current.style.opacity = '1' // 显示导航栏
                  navbar.current.style.pointerEvents = 'auto' // 启用点击
                }
                displayLock.current = true
              } else {
                if (navbar.current) {
                  navbar.current.style.opacity = '0' // 隐藏导航栏
                  navbar.current.style.pointerEvents = 'none' // 禁用点击
                }
                displayLock.current = false
              }
            })
          }
        }

        const handleScroll = () => {
          const scrollTop = window.pageYOffset

          requestAnimationFrame(() => {
            if (scrollTop === 0) {
              if (navbar.current) {
                navbar.current.style.opacity = '1' // 到顶部时显示导航栏
                navbar.current.style.pointerEvents = 'auto' // 启用点击
              }
            } else if (scrollTop > lastScrollTop.current && !displayLock.current) {
              if (navbar.current) {
                navbar.current.style.opacity = '0' // 向下滚动时隐藏导航栏
                navbar.current.style.pointerEvents = 'none' // 禁用点击
              }
            } else if (scrollTop < lastScrollTop.current && !triggeredByWheel.current && !displayLock.current) {
              if (navbar.current) {
                navbar.current.style.opacity = '0' // 非滚轮触发时隐藏导航栏
                navbar.current.style.pointerEvents = 'none' // 禁用点击
              }
            }

            lastScrollTop.current = scrollTop
            triggeredByWheel.current = false
          })
        }

        useEffect(() => {
          navbar.current = document.querySelector('.navbar') as HTMLDivElement

          window.addEventListener('wheel', handleWheel)
          window.addEventListener('scroll', handleScroll)
          window.addEventListener('click', () => {
            if (displayLock.current) {
              if (navbar.current) {
                navbar.current.style.opacity = '0' // 点击时隐藏导航栏
                navbar.current.style.pointerEvents = 'none' // 禁用点击
              }
              displayLock.current = false
            }
          })

          return () => {
            window.removeEventListener('wheel', handleWheel)
            window.removeEventListener('scroll', handleScroll)
          }
        }, [])

        return (
          <nav
            ref={navbarRef}
            aria-label="Main navigation"
            className={clsx(
              'navbar',
              'navbar--fixed-top',
              isHomePage && 'bg-transparent',
              hideOnScroll && styles.navbarHideable,
              {
                'navbar--dark': style === 'dark',
                'navbar--primary': style === 'primary',
                'navbar-sidebar--show': mobileSidebar.shown,
              },
            )}
            style={{ transition: 'opacity 0.3s ease-in-out, pointer-events 0.3s ease-in-out' }} // 添加过渡效果
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
