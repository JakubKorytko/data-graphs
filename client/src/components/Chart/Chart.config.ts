export const options = {
  plugins: {
    datalabels: {
      color: "#FFF", font: {
        size: 15,
      },
      formatter: (value: number, context: any) => {
       if (value === 0) return '';
      },
      textStrokeColor: 'black',
      textStrokeWidth: 2,
      textShadowColor: 'black',
      textShadowBlur: 2,
      display: "auto"
    }
  }
}

export const data = (data: false | any[], colors: string[]) => {

  const config = {
    labels: data ? data.map(item => item.name) : [],
    datasets: [
      {
        label: 'Number of clients',
        data: data ? data.map(item => item.clients) : [],
        backgroundColor: colors,
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return config;
}