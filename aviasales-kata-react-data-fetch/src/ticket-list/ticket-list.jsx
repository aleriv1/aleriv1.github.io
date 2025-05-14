import { useSelector } from 'react-redux'

import Ticket from '../ticket/ticket'

const TicketList = ({ tickets }) => {
  const filters = useSelector((state) => state.filters)

  const filteredTickets = tickets.filter((ticket) => {
    const segmentStops = ticket.segments.map((segment) => segment.stops.length)
    // const maxStops = Math.max(...segmentStops)
    // const minStops = Math.min(...segmentStops)

    return (
      // (filters.noStops && minStops === 0) ||
      // (filters.oneStop && minStops === 1) ||
      // (filters.twoStops && minStops === 2) ||
      // (filters.threeStops && minStops === 3)
      (filters.noStops && segmentStops.every((v) => v === 0)) ||
      (filters.oneStop && segmentStops.every((v) => v === 1)) ||
      (filters.twoStops && segmentStops.every((v) => v === 2)) ||
      (filters.threeStops && segmentStops.every((v) => v === 3))
    )
  })

  return filteredTickets.map((ticket, index) => <Ticket key={index} ticket={ticket} index={index} />)
}

export default TicketList
