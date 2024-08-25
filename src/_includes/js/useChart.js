const { PieChart } = Chartist
const data = {
  labels: ['Pro', 'Contra'],
  series: [15, 85]
}

new PieChart('#chart', data, {
  labelInterpolationFnc: value => `${String(value)} (${data.series[data.labels.indexOf(String(value))]}%)`
})
