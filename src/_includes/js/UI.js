document.addEventListener('DOMContentLoaded', () => {
  const btnExpandArgs = document.getElementById('expand-args')
  const itemsArgs = document.querySelectorAll('.section-args__item')
  const state = {
    expanded: false
  }

  if (
    btnExpandArgs
    && btnExpandArgs instanceof HTMLButtonElement
    &&  itemsArgs.length > 0
  ) {
    btnExpandArgs.addEventListener('click', (e) => {
      if (!state.expanded) {
        itemsArgs.forEach((el) => {
          el.setAttribute('open', '')
        })

        e.target.blur()
        e.target.innerText = 'Alle zuklappen'

        state.expanded = true
      } else {
        itemsArgs.forEach((el) => {
          el.removeAttribute('open')
        })

        e.target.blur()
        e.target.innerText = 'Alle aufklappen'

        state.expanded = false
      }
    })
  }
})
