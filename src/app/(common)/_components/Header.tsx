'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import useStore from '@/status/store'
import styles from './header.module.scss'
import HeaderInput from './HeaderInput'
import MainMenu from './MainMenu'

const Header = (): React.JSX.Element => {
  const { isDark, toggleDarkMode } = useStore()
  const [hydrated, setHydrated] = useState(false)
  const [color, setColor] = useState(false)
  const [isClicked, setIsClicked] = useState(false);

  const onClickDarkMode = (): void => {
    toggleDarkMode(!isDark)
  }

  const isdarkMode = () => {
    const DOM_EL: HTMLElement = document.documentElement
    isDark
      ? DOM_EL.setAttribute('data-theme', 'dark')
      : DOM_EL.setAttribute('data-theme', 'light')
  }

  const renderThemeToggle = () => {
    if (hydrated) {
      return (
        <img
          style={{ width: '2rem' }}
          src={`/assets/header_${isDark ? 'moon' : 'sun'}.svg`}
          alt=""
        />
      )
    }
  }

  const toggleMainMenu = () => {
    setIsClicked(!isClicked);
  }

  useEffect(() => {
    setHydrated(true)
    isdarkMode()
    setColor(isDark)
  }, [isDark])

  return (
    <header className={styles.header}>
      <div className={styles.innerBox}>
        <h1>
          <Link href="/" style={{ display: 'flex' }}>
            <img src="/assets/header_logo_symbol.svg" alt="logo" />
            <img
              className={styles.logo}
              src={`/assets/header_logo${color ? '_white' : ''}.svg`}
              alt="logo"
            />
          </Link>
        </h1>
        <ul className={styles.navi}>
          <li>
            <button onClick={toggleMainMenu}>크리스마스</button>
          </li>
          <li>
            <Link href="/meetup">촛불모임</Link>
          </li>
          <li>
            <Link href="/developers">개발자</Link>
          </li>
        </ul>
        {isClicked && (
          <MainMenu />
        )}
        <HeaderInput />
        <button className={styles.darkModeIcon} onClick={onClickDarkMode}>
          {renderThemeToggle()}
        </button>
        <div className={styles.account}>
          <Link href="signIn">
            <span>로그인</span>
          </Link>
          <p className={styles.line}>|</p>
          <Link href="signUp">
            <span>회원가입</span>
          </Link>
        </div>
        <FontAwesomeIcon className={styles.barIcon} icon={faBars} />
      </div>
    </header>
  )
}
export default Header
