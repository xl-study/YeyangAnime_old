import { getNavList } from './config'
import classNames from 'classnames'
import style from './index.module.scss'
import { useState } from 'react'
import { useEventListener } from '../../utils/hooks/useEventListener'
import { throttle } from '../../utils/common'
import Icon from '../../components/Icon'

interface navProps {
  navShow?: boolean
  setNavShow?: Function
  mode?: number
  setMode?: Function
}

interface MenuItemProps {
  name: string
  to: string
  icon: string
  subMenu?: MenuItemProps[]
}

const navArr = getNavList()

const getItem = ({ name, to, icon, subMenu }: MenuItemProps) => {
  const children = subMenu?.map((item: MenuItemProps) => ({
    label: item.name,
    key: item.to,
    icon: <Icon icon={item.icon} />,
  }))

  return {
    label: name,
    key: to,
    icon: <Icon icon={icon} />,
    children,
  }
}

const items = navArr.map((item: MenuItemProps) => {
  return getItem(item)
})

const Header: React.FC<navProps> = () => {
  const [navShow, setNavShow] = useState(true)

  let pre = document.documentElement.scrollTop || document.body.scrollTop
  useEventListener(
    'scroll',
    throttle(() => {
      let now = document.documentElement.scrollTop || document.body.scrollTop
      let up = pre >= now
      pre = now
      setNavShow(up)
    }, 500)
  )

  return (
    <>
      <nav
        className={classNames(style.navWrap, { [style.hidden]: !navShow })}
      >
        <h2>椰羊动漫</h2>
      </nav>
    </>
  )
}

export default Header
