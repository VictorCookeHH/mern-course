import { useQuery } from '@tanstack/react-query'
import { ChartsContainer, StatsContainer } from '../components'
import { statsQuery } from './queryFunctions'

const Stats = () => {
  const { data } = useQuery(statsQuery)

  const { stats, monthlyApplications } = data
  return (
    <>
      <StatsContainer stats={stats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  )
}

export default Stats
