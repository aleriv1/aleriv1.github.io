// import React from 'react';
import Ticket from '../ticket/ticket'

// import styles from './ticket-list.module.scss'

const TicketList = ({ tickets }) => {
  return tickets.map((ticket, index) => <Ticket key={index} ticket={ticket} />)
}

export default TicketList
