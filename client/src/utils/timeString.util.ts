const timeToString = (timeInMs: number): string => {
  if (timeInMs < 1000) return 'less than a second ago';
  if (timeInMs < 60000) return `${Math.floor(timeInMs / 1000)} seconds ago`;
  if (timeInMs < 3600000) return `${Math.floor(timeInMs / 60000)} minutes ago`;
  if (timeInMs < 86400000) return `${Math.floor(timeInMs / 3600000)} hours ago`;
  return 'more than a day ago';
};

const generateTime = (launchedTime: number) => {
  const diff = Date.now() - launchedTime;
  return timeToString(diff);
};

export default generateTime;
