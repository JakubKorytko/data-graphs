import {
  ArcElement, Chart as ChartJS, Legend, Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { DataContext } from 'components/Wrappers/Context';
import { data, options } from 'components/Chart/Chart.config';

ChartJS.register(ChartDataLabels);
ChartJS.register(ArcElement, Tooltip, Legend);

function Chart() {
  const context = useContext(DataContext).data;

  const channels = context ? context.channels.data : false;
  const colors = context ? context.chartColors : [];

  return <Pie data={data(channels, colors)} options={options} />;
}

export default Chart;
