function useDebounce(callback, wait) {
  let timeout

  return function(...args) {
    const context = this

    clearTimeout(timeout)

    timeout = setTimeout(
      () => callback.apply(context, args),
      wait
    )
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // BTT button
  const btnBtt = document.querySelector('.btn-btt')

  if (btnBtt && btnBtt instanceof HTMLElement) {
    window.addEventListener('scroll', useDebounce(() => {
      const wScrollY = window.scrollY

      if (wScrollY > 1440) {
        btnBtt.classList.add('shown')
      } else {
        btnBtt.classList.remove('shown')
      }
    }))
  }

  // Arguments: expand/collapse button
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
