import { Channel } from 'utils/api.util.type';

export const options = {
  plugins: {
    datalabels: {
      color: '#FFF',
      font: {
        size: 15,
      },
      formatter: (value: number) => {
        if (value === 0) return '';
        return value;
      },
      textStrokeColor: 'black',
      textStrokeWidth: 2,
      textShadowColor: 'black',
      textShadowBlur: 2,
      display: 'auto',
    },
  },
};

export const data = (channels: false | Channel[], colors: string[]) => ({
  labels: channels ? channels.map((item) => item.name) : [],
  datasets: [
    {
      label: 'Number of clients',
      data: channels ? channels.map((item) => item.clients) : [],
      backgroundColor: colors,
      borderColor: 'black',
      borderWidth: 1,
    },
  ],
});
