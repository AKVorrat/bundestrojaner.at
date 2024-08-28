document.addEventListener('DOMContentLoaded', () => {
  const btnExpandArgs = document.getElementById('expand-args')
  const itemsArgs = document.querySelectorAll('.section-args__item')

  if (
    btnExpandArgs
    && btnExpandArgs instanceof HTMLButtonElement
    &&  itemsArgs.length > 0
  ) {
    btnExpandArgs.addEventListener('click', (e) => {
      itemsArgs.forEach((el) => {
        el.setAttribute('open', '')
      })

      e.target.blur()
    })
  }
})
