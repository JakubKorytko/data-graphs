import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { DataContext } from '../Wrappers/Context';
import { options, data } from './Chart.config';

ChartJS.register(ChartDataLabels);
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {

  const context = useContext(DataContext).data;

  const channels = context ? context.channels.data: false;
  const colors = context ? context.chartColors: [];

  console.log(channels);
  console.log(colors);

  return <Pie data={data(channels, colors)} options={options} />;
}

export default Chart;
