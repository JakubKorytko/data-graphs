import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartProps } from '../types/props';

ChartJS.register(ChartDataLabels);
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = (props: ChartProps) => {

  const generateConfig = () => {
    const colors = props.colors ? props.colors : [];

    const config = {
      labels: props.data ? props.data.map(item => item.name) : [],
      datasets: [
        {
          label: 'Number of clients',
          data: props.data ? props.data.map(item => item.clients) : [],
          backgroundColor: colors,
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    };

    return config;
  }

  return <Pie data={generateConfig()} options={{
    plugins: {
      datalabels: {
        color: "#FFF", font: {
          size: 15,
        },
        formatter: (value: number, context: any) => {
          if (value === 0) return '';
          return value;
      },
    textStrokeColor: 'black',
    textStrokeWidth: 2,
    textShadowColor: 'black',
    textShadowBlur: 2,}
    }
  }} />;
}

export default Chart;
