import Ticket from '../ticket/ticket'

import styles from './ticket-list.module.scss'

const TicketList = ({ tickets }) => {
  if (tickets.length === 0) {
    return <div className={styles.noTickets}>Рейсов, подходящих под заданные фильтры, не найдено</div>
  }

  return tickets.map((ticket, index) => (
    <Ticket
      key={`${ticket.carrier}-${ticket.price}-${ticket.segments[0].date}-${index}`}
      ticket={ticket}
      index={index}
    />
  ))
}

export default TicketList
