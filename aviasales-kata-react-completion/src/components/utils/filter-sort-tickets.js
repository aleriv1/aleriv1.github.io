export const filterTickets = (tickets, filters) => {
  return tickets.filter((ticket) => {
    const segmentStops = ticket.segments.map((segment) => segment.stops.length)
    const minStops = Math.min(...segmentStops)

    return (
      (filters.noStops && minStops === 0) ||
      (filters.oneStop && minStops === 1) ||
      (filters.twoStops && minStops === 2) ||
      (filters.threeStops && minStops === 3)
    )
  })
}

export const sortTickets = (filteredTickets, sortType) => {
  return [...filteredTickets].sort((a, b) => {
    if (sortType === 'cheapest') {
      return a.price - b.price
    }
    if (sortType === 'fastest') {
      const durationA = a.segments.reduce((sum, seg) => sum + seg.duration, 0)
      const durationB = b.segments.reduce((sum, seg) => sum + seg.duration, 0)
      return durationA - durationB
    }
    if (sortType === 'optimal') {
      const scoreA = a.price + a.segments.reduce((sum, seg) => sum + seg.duration * 500, 0)
      const scoreB = b.price + b.segments.reduce((sum, seg) => sum + seg.duration * 500, 0)
      return scoreA - scoreB
    }
    return 0
  })
}
