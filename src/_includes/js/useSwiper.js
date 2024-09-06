window.addEventListener('DOMContentLoaded', () => {
  // we use swiper - docs: https://swiperjs.com/swiper-api
  const swiperFeedback = document.querySelector('.swiper-feedback')
  const swiperVideos = document.querySelector('.swiper-videos')

  if (swiperFeedback && swiperFeedback instanceof HTMLElement) {
    const swiper = new Swiper('.swiper-feedback', {
      autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true
      },
      direction: 'horizontal',
      grabCursor: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        afterInit: function(s) {
          const reducedMotionPref = window.matchMedia('(prefers-reduced-motion: reduce)') === true
            || window.matchMedia('(prefers-reduced-motion: reduce)').matches === true

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
      direction: 'horizontal',
      grabCursor: true,
      loop: true,
      // slidesPerView: 2,
      spaceBetween: 32,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        slideChange: function(s) {
          const videoFrames = document.querySelectorAll('.video__iframe')

          if (videoFrames && videoFrames.length > 0) {
            videoFrames.forEach((f) => {
              if (
                f instanceof HTMLIFrameElement
                && f.closest('.swiper-slide-active') !== null
              ) {
                // changing frame source stops a playing video
                // without having to rely on any 3rd party API
                f.src = f.src
              }
            })
          }

        }
      }
    })
  }
})
