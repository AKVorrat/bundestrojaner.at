window.addEventListener('DOMContentLoaded', () => {
  const swiperFeedback = document.querySelector('.swiper-feedback')
  const swiperVideos = document.querySelector('.swiper-videos')

  if (swiperFeedback && swiperFeedback instanceof HTMLElement) {
    const swiper = new Swiper('.swiper-feedback', {
      // Optional parameters
      autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true
      },
      direction: 'horizontal',
      grabCursor: true,
      loop: true,
      // If we need pagination
      pagination: {
        el: '.swiper-pagination'
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        afterInit: function(s) {
          const reducedMotionPref = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true
            || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true

          if (!!reducedMotionPref) {
            s.autoplay.stop()
          } else {
            s.autoplay.start()
          }
        }
      }
    })
  }

  if (swiperVideos && swiperVideos instanceof HTMLElement) {
    const swiper2 = new Swiper('.swiper-videos', {
      // Optional parameters
      direction: 'horizontal',
      grabCursor: true,
      loop: true,
      spaceBetween: 40,
      // If we need pagination
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true
      // },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })
  }
})
