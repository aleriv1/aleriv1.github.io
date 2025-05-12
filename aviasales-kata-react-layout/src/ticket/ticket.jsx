// import React from 'react';

import styles from './ticket.module.scss'

const Ticket = ({ ticket, index }) => {
  return (
    <div key={index} className={styles.ticket}>
      <div className="header">
        <span className={styles.price}>{ticket.price} Р</span>
        <span className={styles.logo}>{ticket.carrier}</span>
      </div>
      {ticket.segments.map((segment, idx) => (
        <div key={idx} className={styles.segment}>
          <div className={styles.route}>
            {segment.origin} - {segment.destination}
          </div>
          <div className={styles.details}>
            <span>{segment.date}</span>
            <span className={styles.duration}>
              В пути {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
            </span>
            <span className={styles.stops}>
              {segment.stops.length} пересад{segment.stops.length === 1 ? 'ка' : 'ки'}: {segment.stops.join(', ')}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Ticket
