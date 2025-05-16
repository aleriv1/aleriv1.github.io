import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../header/header'
import Sidebar from '../sidebar/sidebar'
import TicketList from '../ticket-list/ticket-list'
import Tabs from '../tabs/tabs'
import { fetchSearchId } from '../../store'

import styles from './app.module.scss'

const App = () => {
  const dispatch = useDispatch()
  const tickets = useSelector((state) => state.tickets.tickets)
  const loading = useSelector((state) => state.ui.loading)
  const [visibleTickets, setVisibleTickets] = useState(5)

  useEffect(() => {
    dispatch(fetchSearchId())
  }, [dispatch])

  const handleShowMore = () => {
    setVisibleTickets((prev) => prev + 5)
  }

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.main}>
          <Tabs />
          {loading && <div className={styles.loader}>Загрузка билетов...</div>}
          {tickets.length === 0 && !loading && (
            <div className={styles.noTickets}>Рейсов, подходящих под заданные фильтры, не найдено</div>
          )}
          <TicketList tickets={tickets.slice(0, visibleTickets)} />
          {visibleTickets < tickets.length && (
            <button className={styles.button} onClick={handleShowMore}>
              Показать еще 5 билетов!
            </button>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
