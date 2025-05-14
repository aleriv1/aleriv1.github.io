import styles from './ticket.module.scss'

const formatTime = (date, duration) => {
  const departure = new Date(date)
  const arrival = new Date(departure.getTime() + duration * 60 * 1000)

  const format = (d) => `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`

  return `${format(departure)} - ${format(arrival)}`
}

const Ticket = ({ ticket, index }) => {
  return (
    <div key={index} className={styles.ticket}>
      <div className={styles.header}>
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
            <span className={styles.details}>{formatTime(segment.date, segment.duration)}</span>
          </div>
          <span className={styles.duration}>
            <h3 className={styles.title}>В пути</h3>{' '}
            <span className={styles.details}>
              {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
            </span>
          </span>
          <span className={styles.stops}>
            <h3 className={styles.title}>
              {segment.stops.length ? segment.stops.length : 'Без'} пересад
              {segment.stops.length === 0 ? 'ок' : segment.stops.length === 1 ? 'ка' : 'ки'}
            </h3>
            <span className={styles.details}>{segment.stops.join(', ')}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

export default Ticket
