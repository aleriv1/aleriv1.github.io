import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../header/header'
import Sidebar from '../sidebar/sidebar'
import TicketList from '../ticket-list/ticket-list'
import Tabs from '../tabs/tabs'
import { fetchSearchId } from '../../store'
import { filterTickets, sortTickets } from '../utils/filter-sort-tickets'

import styles from './app.module.scss'

const App = () => {
  const dispatch = useDispatch()
  const tickets = useSelector((state) => state.tickets.tickets)
  const loading = useSelector((state) => state.ui.loading)
  const filters = useSelector((state) => state.filters)
  const sortType = useSelector((state) => state.tickets.sortType)

  const [visibleTickets, setVisibleTickets] = useState(5)

  useEffect(() => {
    dispatch(fetchSearchId())
  }, [dispatch])

  const handleShowMore = () => {
    setVisibleTickets((prev) => prev + 5)
  }

  const filteredTickets = filterTickets(tickets, filters)
  const sortedTickets = sortTickets(filteredTickets, sortType)

  const displayedTickets = sortedTickets.slice(0, visibleTickets)

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.main}>
          <Tabs />
          {loading && <div className={styles.loader}></div>}
          {tickets.length !== 0 && <TicketList tickets={displayedTickets.slice(0, visibleTickets)} />}
          {Object.values(filters).includes(true) && visibleTickets < tickets.length && (
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
