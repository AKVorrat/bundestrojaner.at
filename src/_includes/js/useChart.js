window.addEventListener('DOMContentLoaded', () => {
  const chartSelector = '#chart'
  const chartTarget = document.querySelector(chartSelector)
  const inputData = {
    contra: 0,
    pro: 0
  }

  function getPercentage(n) {
    return (n / (inputData.contra + inputData.pro)) * 100
  }

  document.querySelectorAll('.feedback__item').forEach((e) => {
    const verdict = Number(e.dataset.verdict)

    switch (true) {
      case verdict === 0:
        inputData.contra += 1
        break
      case verdict === 1:
        inputData.pro += 1
        break
    }
  })

  if (chartTarget && chartTarget instanceof HTMLElement) {
    const { PieChart } = Chartist
    const data = {
      labels: ['Pro', 'Contra'],
      series: [
        getPercentage(inputData.pro),
        getPercentage(inputData.contra)
      ]
    }

    new PieChart(chartSelector, data, {
      labelInterpolationFnc: (value) => {
        return `${String(value)} (${data.series[data.labels.indexOf(String(value))]}%)`
      }
    })
  }
})
