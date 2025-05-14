import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setSortType } from '../store'

import styles from './tabs.module.scss'

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('cheapest')
  const dispatch = useDispatch()

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    dispatch(setSortType(tab))
  }

  return (
    <div className={styles.tabs}>
      <button className={activeTab === 'cheapest' ? styles.active : ''} onClick={() => handleTabChange('cheapest')}>
        Самый дешевый
      </button>
      <button className={activeTab === 'fastest' ? styles.active : ''} onClick={() => handleTabChange('fastest')}>
        Самый быстрый
      </button>
      <button className={activeTab === 'optimal' ? styles.active : ''} onClick={() => handleTabChange('optimal')}>
        Оптимальный
      </button>
    </div>
  )
}

export default Tabs
