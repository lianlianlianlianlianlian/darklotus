import React, { useEffect, useState, useRef } from 'react' // 引入React库及相关钩子
import ReactDOM from 'react-dom' // 引入ReactDOM用于渲染到DOM节点
import { usePopper } from 'react-popper' // 引入react-popper用于实现弹出式提示框（Tooltip）的定位
import styles from './styles.module.css' // 引入CSS模块样式

// 定义Tooltip组件的属性类型
interface Props {
  anchorEl?: HTMLElement | string // 锚点元素，可以是HTMLElement或者元素的选择器字符串
  id: string // Tooltip的唯一ID
  text: string // Tooltip显示的文本
  delay?: number // 延迟显示的时间，默认300ms
  children: React.ReactElement // Tooltip触发的子元素
}

// Tooltip组件
export default function Tooltip({ children, id, anchorEl, text, delay }: Props): JSX.Element {
  const [open, setOpen] = useState(false) // 控制Tooltip是否打开
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null) // 存储锚点元素
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null) // 存储弹出框元素
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null) // 存储箭头元素
  const [container, setContainer] = useState<Element | null>(null) // 存储Tooltip的容器元素
  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    // 使用usePopper来定位Tooltip
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowElement, // 设置Tooltip的箭头元素
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8], // 设置Tooltip的偏移量
        },
      },
    ],
  })

  const timeout = useRef<number | null>(null) // 用于存储setTimeout的ID
  const tooltipId = `${id}_tooltip` // 生成Tooltip的ID

  // 在组件挂载后，设置Tooltip的容器元素
  useEffect(() => {
    if (anchorEl) {
      if (typeof anchorEl === 'string') {
        setContainer(document.querySelector(anchorEl)) // 如果anchorEl是字符串，查找对应的DOM元素
      } else {
        setContainer(anchorEl) // 如果是HTMLElement，直接使用
      }
    } else {
      setContainer(document.body) // 默认容器为document.body
    }
  }, [anchorEl])

  // 控制Tooltip的显示和隐藏
  useEffect(() => {
    const showEvents = ['mouseenter', 'focus'] // 显示Tooltip的事件
    const hideEvents = ['mouseleave', 'blur'] // 隐藏Tooltip的事件

    const handleOpen = () => {
      // 如果Tooltip文本为空，不显示Tooltip
      if (text === '') {
        return
      }

      // 移除元素的原生title属性，避免显示两个Tooltip
      referenceElement?.removeAttribute('title')

      // 延迟显示Tooltip
      timeout.current = window.setTimeout(() => {
        setOpen(true) // 设置Tooltip为打开状态
      }, delay || 300) // 使用传入的delay，默认300ms
    }

    const handleClose = () => {
      clearInterval(timeout.current!) // 清除setTimeout
      setOpen(false) // 设置Tooltip为关闭状态
    }

    // 如果有referenceElement，绑定事件监听器
    if (referenceElement) {
      showEvents.forEach(event => {
        referenceElement.addEventListener(event, handleOpen) // 绑定显示事件
      })

      hideEvents.forEach(event => {
        referenceElement.addEventListener(event, handleClose) // 绑定隐藏事件
      })
    }

    // 组件卸载时移除事件监听器
    return () => {
      if (referenceElement) {
        showEvents.forEach(event => {
          referenceElement.removeEventListener(event, handleOpen) // 移除显示事件
        })

        hideEvents.forEach(event => {
          referenceElement.removeEventListener(event, handleClose) // 移除隐藏事件
        })
      }
    }
  }, [referenceElement, text, delay]) // 依赖于referenceElement、text和delay

  return (
    <>
      {/* 渲染Tooltip的触发元素，传递ref和aria-describedby属性 */}
      {React.cloneElement(children, {
        ref: setReferenceElement, // 设置ref来获取锚点元素
        'aria-describedby': open ? tooltipId : undefined, // 当Tooltip打开时，添加aria-describedby属性
      })}
      {/* 如果容器元素存在，使用ReactDOM.createPortal渲染Tooltip */}
      {container
        ? ReactDOM.createPortal(
            open && (
              <div
                id={tooltipId} // 设置Tooltip的ID
                role="tooltip" // 设置角色为tooltip
                ref={setPopperElement} // 设置ref来获取Popper元素
                className={styles.tooltip} // 使用样式
                style={popperStyles.popper} // 使用Popper的定位样式
                {...attributes.popper} // 传递Popper的属性
              >
                {text} {/* 显示Tooltip的文本 */}
                <span ref={setArrowElement} className={styles.tooltipArrow} style={popperStyles.arrow} />{' '}
                {/* 显示Tooltip箭头 */}
              </div>
            ),
            container, // 渲染到指定的容器元素
          )
        : container}
    </>
  )
}
