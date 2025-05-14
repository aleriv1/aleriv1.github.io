import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleFilter, toggleAllFilters } from '../store'

import styles from './sidebar.module.scss'

const Sidebar = () => {
  const filters = useSelector((state) => state.filters)
  const dispatch = useDispatch()

  const handleFilterChange = (filter) => {
    if (filter === 'all') {
      dispatch(toggleAllFilters(!filters.all))
    } else {
      dispatch(toggleFilter(filter))
    }
  }

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>Количество пересадок</h3>
      <div className={styles.checkboxGroup}>
        <label>
          <input
            className={styles.customCheckbox}
            type="checkbox"
            checked={filters.all}
            onChange={() => handleFilterChange('all')}
          />
          <span className={styles.checkboxLable}>Все</span>
        </label>
        <label>
          <input
            className={styles.customCheckbox}
            type="checkbox"
            checked={filters.noStops}
            onChange={() => handleFilterChange('noStops')}
          />
          <span className={styles.checkboxLable}>Без пересадок</span>
        </label>
        <label>
          <input
            className={styles.customCheckbox}
            type="checkbox"
            checked={filters.oneStop}
            onChange={() => handleFilterChange('oneStop')}
          />
          <span className={styles.checkboxLable}>1 пересадка</span>
        </label>
        <label>
          <input
            className={styles.customCheckbox}
            type="checkbox"
            checked={filters.twoStops}
            onChange={() => handleFilterChange('twoStops')}
          />
          <span className={styles.checkboxLable}>2 пересадки</span>
        </label>
        <label>
          <input
            className={styles.customCheckbox}
            type="checkbox"
            checked={filters.threeStops}
            onChange={() => handleFilterChange('threeStops')}
          />
          <span className={styles.checkboxLable}>3 пересадки</span>
        </label>
      </div>
    </div>
  )
}

export default Sidebar
