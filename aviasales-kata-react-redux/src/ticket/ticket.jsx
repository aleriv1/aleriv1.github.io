// import React from 'react';

import styles from './ticket.module.scss'

const Ticket = ({ ticket, index }) => {
  // const string = ticket.price.toString()

  // console.log(string)
  // console.log(ticket.price.toString())
  return (
    <div key={index} className={styles.ticket}>
      <div className={styles.header}>
        {/* <span className={styles.price}>{ticket.price} Р</span> */}
        <span className={styles.price}>
          {`${ticket.price.toString().slice(0, 2)} ${ticket.price.toString().slice(2)}`} Р
        </span>
        <span className={styles.logo}>{ticket.carrier}</span>
      </div>
      {ticket.segments.map((segment, idx) => (
        <div key={idx} className={styles.segment}>
          <div className={styles.route}>
            <h3 className={styles.title}>
              {segment.origin} - {segment.destination}
            </h3>
            <span className={styles.details}>{segment.date}</span>
          </div>
          <span className={styles.duration}>
            <h3 className={styles.title}>В пути</h3>{' '}
            <span className={styles.details}>
              {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
            </span>
          </span>
          <span className={styles.stops}>
            <h3 className={styles.title}>
              {segment.stops.length} пересад{segment.stops.length === 1 ? 'ка' : 'ки'}
            </h3>
            <span className={styles.details}>{segment.stops.join(', ')}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

export default Ticket
