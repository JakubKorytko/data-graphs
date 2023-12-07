const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
const randomColor = (alpha: number) => {
return `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, ${alpha})`;
}

const chartColors = (length: number) => {
    return [...Array(length).keys()].map(val => randomColor(1));
}

export default chartColors;