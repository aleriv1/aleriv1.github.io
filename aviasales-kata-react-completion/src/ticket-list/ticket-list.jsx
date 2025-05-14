import { useSelector } from 'react-redux'

import Ticket from '../ticket/ticket'

const TicketList = ({ tickets }) => {
  const filters = useSelector((state) => state.filters)
  const sortType = useSelector((state) => state.sortType)

  const hasActiveFilters = filters.noStops || filters.oneStop || filters.twoStops || filters.threeStops

  const filteredTickets = tickets.filter((ticket) => {
    const segmentStops = ticket.segments.map((segment) => segment.stops.length)
    const minStops = Math.min(...segmentStops)

    return (
      (filters.noStops && minStops === 0) ||
      (filters.oneStop && minStops === 1) ||
      (filters.twoStops && minStops === 2) ||
      (filters.threeStops && minStops === 3)
    )
  })

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortType === 'cheapest') {
      return a.price - b.price
    }
    if (sortType === 'fastest') {
      const durationA = a.segments.reduce((sum, seg) => sum + seg.duration, 0)
      const durationB = b.segments.reduce((sum, seg) => sum + seg.duration, 0)
      return durationA - durationB
    }
    if (sortType === 'optimal') {
      const scoreA = a.price + a.segments.reduce((sum, seg) => sum + seg.duration * 15, 0)
      const scoreB = b.price + b.segments.reduce((sum, seg) => sum + seg.duration * 15, 0)
      return scoreA - scoreB
    }
    return 0
  })

  if (!hasActiveFilters || sortedTickets.length === 0) {
    return <div>Рейсов, подходящих под заданные фильтры, не найдено</div>
  }

  return sortedTickets.map((ticket, index) => (
    <Ticket
      key={`${ticket.carrier}-${ticket.price}-${ticket.segments[0].date}-${index}`}
      ticket={ticket}
      index={index}
    />
  ))
}

export default TicketList
