const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomColor = (alpha: number) => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, ${alpha})`;

const chartColors = (length: number) => [...Array(length).keys()].map(() => randomColor(1));

export default chartColors;
