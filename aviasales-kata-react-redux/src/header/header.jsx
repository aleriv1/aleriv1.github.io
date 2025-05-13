import logo from '../assets/aviasales-logo.png'

import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="/">
        <img src={logo} alt="logo" />
      </a>
    </header>
  )
}
