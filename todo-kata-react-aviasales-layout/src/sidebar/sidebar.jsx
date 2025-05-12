import React from 'react'

import styles from './sidebar.module.scss'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h3>Количество пересадок</h3>
      {/* <div className="checkboxGroup"> */}
      <div className={styles.checkboxGroup}>
        <label>
          <input type="checkbox" /> Все
        </label>
        <label>
          <input type="checkbox" checked /> Без пересадок
        </label>
        <label>
          <input type="checkbox" checked /> 1 пересадка
        </label>
        <label>
          <input type="checkbox" checked /> 2 пересадки
        </label>
        <label>
          <input type="checkbox" /> 3 пересадки
        </label>
      </div>
    </div>
  )
}

export default Sidebar
