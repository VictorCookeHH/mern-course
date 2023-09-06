/* eslint-disable react/prop-types */
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'
import StatItem from './StatItem'

const StatsContainer = ({ stats }) => {
  const statistics = [
    {
      title: 'pending applications',
      count: stats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bgc: '#fef3c7',
    },
    {
      title: 'interviews scheduled',
      count: stats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bgc: '#e0e8f9',
    },
    {
      title: 'declined applications',
      count: stats?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bgc: '#ffeeee',
    },
  ]
  return (
    <Wrapper>
      {statistics.map((item) => {
        return <StatItem key={item.title} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer
