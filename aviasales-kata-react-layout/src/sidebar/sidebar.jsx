import React from 'react'

import styles from './sidebar.module.scss'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>Количество пересадок</h3>
      {/* <div className="checkboxGroup"> */}
      <div className={styles.checkboxGroup}>
        <label>
          {/* <input type="checkbox" /> Все */}
          <input className={styles.customCheckbox} type="checkbox" /> <span className={styles.checkboxLable}>Все</span>
        </label>
        <label>
          <input type="checkbox" className={styles.customCheckbox} checked />{' '}
          <span className={styles.checkboxLable}>Без пересадок</span>
        </label>
        <label>
          <input type="checkbox" className={styles.customCheckbox} checked />{' '}
          <span className={styles.checkboxLable}>1 пересадка</span>
        </label>
        <label>
          <input type="checkbox" className={styles.customCheckbox} checked />{' '}
          <span className={styles.checkboxLable}>2 пересадки</span>
        </label>
        <label>
          <input type="checkbox" className={styles.customCheckbox} />{' '}
          <span className={styles.checkboxLable}>3 пересадки</span>
        </label>
      </div>
    </div>
  )
}

export default Sidebar
