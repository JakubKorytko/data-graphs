import chartColors from 'utils/chartColors.util';

test('chart colors should be proper rgba strings', () => {
  const colors = chartColors(5);
  expect(colors).toHaveLength(5);
  colors.forEach((color: string) => {
    expect(color).toMatch(/^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), 1\)$/);
  });
});

export {}; // this file needs to be a module
