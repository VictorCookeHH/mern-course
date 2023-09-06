import { useState } from 'react'

import BarChartComp from './BarChart'
import Wrapper from '../assets/wrappers/ChartsContainer'
import AreaChartComp from './AreaChartComp'

// eslint-disable-next-line react/prop-types
const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true)
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChartComp data={data} /> : <AreaChartComp data={data} />}
    </Wrapper>
  )
}

export default ChartsContainer
