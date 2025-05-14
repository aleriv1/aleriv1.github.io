import Header from '../header/header'
import Sidebar from '../sidebar/sidebar'
import TicketLIst from '../ticket-list/ticket-list'
import Tabs from '../tabs/tabs'

import styles from './app.module.scss'

const mockTickets = [
  {
    price: 13400,
    carrier: 'S7',
    segments: [
      { origin: 'MOW', destination: 'HKT', date: '10:45 - 08:00', duration: 1275, stops: ['HKG', 'JNB'] },
      { origin: 'MOW', destination: 'HKT', date: '11:20 - 00:50', duration: 810, stops: ['HKG'] },
    ],
  },
  {
    price: 13400,
    carrier: 'S7',
    segments: [
      { origin: 'MOW', destination: 'HKT', date: '10:45 - 08:00', duration: 1275, stops: ['HKG', 'JNB'] },
      { origin: 'MOW', destination: 'HKT', date: '11:20 - 00:50', duration: 810, stops: ['HKG'] },
    ],
  },
  {
    price: 13400,
    carrier: 'S7',
    segments: [
      { origin: 'MOW', destination: 'HKT', date: '10:45 - 08:00', duration: 1275, stops: ['HKG', 'JNB'] },
      { origin: 'MOW', destination: 'HKT', date: '11:20 - 00:50', duration: 810, stops: ['HKG'] },
    ],
  },
  {
    price: 13400,
    carrier: 'S7',
    segments: [
      { origin: 'MOW', destination: 'HKT', date: '10:45 - 08:00', duration: 1275, stops: ['HKG', 'JNB'] },
      { origin: 'MOW', destination: 'HKT', date: '11:20 - 00:50', duration: 810, stops: ['HKG'] },
    ],
  },
  {
    price: 13400,
    carrier: 'S7',
    segments: [
      { origin: 'MOW', destination: 'HKT', date: '10:45 - 08:00', duration: 1275, stops: ['HKG', 'JNB'] },
      { origin: 'MOW', destination: 'HKT', date: '11:20 - 00:50', duration: 810, stops: ['HKG'] },
    ],
  },
]

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.main}>
          <Tabs />
          <TicketLIst tickets={mockTickets} />
          <button className={styles.button}>Показать еще 5 билетов!</button>
        </main>
      </div>
    </div>
  )
}

export default App
