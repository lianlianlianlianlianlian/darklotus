import { useThemeConfig } from '@docusaurus/theme-common';
import { useHideableNavbar, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import type { Props } from '@theme/Navbar/Layout';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './styles.module.css';

function NavbarBackdrop(props: React.ComponentProps<'div'>) {
  return <div role="presentation" {...props} className={clsx('navbar-sidebar__backdrop', props.className)} />;
}

export default function NavbarLayout({ children }: Props): JSX.Element {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);

  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/en/';

  const lastScrollTop = useRef(0);
  const wheelDirection = useRef(0);
  const navbar = useRef<HTMLDivElement | null>(null);
  const triggeredByWheel = useRef(false);
  const displayLock = useRef(false); // 锁定显示状态

  // 处理鼠标滚轮事件，决定是显示还是隐藏导航栏
  const handleWheel = (e: WheelEvent) => {
    wheelDirection.current = e.deltaY > 0 ? 1 : -1; // 滚轮方向
    triggeredByWheel.current = true; // 标记为滚轮触发

    if (hideOnScroll) {
      requestAnimationFrame(() => {
        if (wheelDirection.current === -1) {
          // 向上滚动
          if (navbar.current) {
            navbar.current.style.opacity = '1'; // 显示导航栏
            navbar.current.style.pointerEvents = 'auto'; // 启用点击
          }
          displayLock.current = true; // 锁定显示状态
        } else {
          // 向下滚动
          if (navbar.current) {
            navbar.current.style.opacity = '0'; // 隐藏导航栏
            navbar.current.style.pointerEvents = 'none'; // 禁用点击
          }
          displayLock.current = false; // 解除锁定
        }
      });
    }
  };

  // 处理页面滚动事件，决定导航栏的显示状态
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;

    requestAnimationFrame(() => {
      if (scrollTop === 0) {
        // 滚动到顶部时显示导航栏
        if (navbar.current) {
          navbar.current.style.opacity = '1';
          navbar.current.style.pointerEvents = 'auto';
        }
      } else if (scrollTop > lastScrollTop.current && !displayLock.current) {
        // 向下滚动且未锁定时隐藏
        if (navbar.current) {
          navbar.current.style.opacity = '0';
          navbar.current.style.pointerEvents = 'none';
        }
      } else if (scrollTop < lastScrollTop.current && !triggeredByWheel.current && !displayLock.current) {
        // 非滚轮触发且未锁定时隐藏
        if (navbar.current) {
          navbar.current.style.opacity = '0';
          navbar.current.style.pointerEvents = 'none';
        }
      }

      lastScrollTop.current = scrollTop;
      triggeredByWheel.current = false; // 重置滚轮触发标记
    });
  };

  // 处理点击事件，解除锁定并隐藏导航栏（如果不在顶部）
  const handleClick = () => {
    if (displayLock.current && window.pageYOffset !== 0) {
      // 如果锁定且不在顶部，隐藏导航栏
      if (navbar.current) {
        navbar.current.style.opacity = '0';
        navbar.current.style.pointerEvents = 'none';
      }
      displayLock.current = false;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 确保只在客户端执行
      navbar.current = document.querySelector('.navbar') as HTMLDivElement;

      // 绑定事件监听器
      window.addEventListener('wheel', handleWheel);
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('click', handleClick);

      // 清理事件监听器
      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('click', handleClick);
      };
    }
  }, []);

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
      style={{
        transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), pointer-events 0.5s 0.1s ease-in', // 添加过渡效果
      }}
    >
      {children}
      <NavbarBackdrop onClick={mobileSidebar.toggle} />
      <NavbarMobileSidebar />
    </nav>
  );
}