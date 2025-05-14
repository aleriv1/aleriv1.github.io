import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../header/header'
import Sidebar from '../sidebar/sidebar'
import TicketList from '../ticket-list/ticket-list'
import Tabs from '../tabs/tabs'
import { fetchSearchId } from '../store'

import styles from './app.module.scss'

const App = () => {
  const dispatch = useDispatch()
  const tickets = useSelector((state) => state.tickets)

  useEffect(() => {
    dispatch(fetchSearchId())
  }, [dispatch])

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.main}>
          <Tabs />
          {/* <TicketList tickets={tickets} /> */}
          <TicketList tickets={tickets.slice(0, 5)} />
          <button className={styles.button}>Показать еще 5 билетов!</button>
        </main>
      </div>
    </div>
  )
}

export default App
