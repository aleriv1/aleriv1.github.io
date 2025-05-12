import React from 'react'

import styles from './tabs.module.scss'

const Tabs = () => {
  return (
    <div className={styles.tabs}>
      <button className={styles.active}>Самый дешевый</button>
      <button>Самый быстрый</button>
      <button>Оптимальный</button>
    </div>
  )
}

export default Tabs
