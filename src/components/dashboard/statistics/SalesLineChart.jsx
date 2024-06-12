import { Chart } from 'react-google-charts'
import { PropTypes } from 'prop-types';
import Loader from '../../shared/Loader';


const SalesLineChart = ({ data, title }) => {

    
const options = {
    // title: 'Sales Over Time',
    title: `${title}`,
    curveType: 'function',
    legend: { position: 'bottom' },
    series: [{ color: '#F43F5E' }],
}
    console.log(data, title)
    return (
        <>
            {
                data.length > 1 ? <Chart chartType='LineChart' width='100%' data={data} options={options} />
                    : <>
                        <Loader />
                        <p>Not Enough Data</p>
                    </>
            }
        </>
    )
}

SalesLineChart.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
}

export default SalesLineChart