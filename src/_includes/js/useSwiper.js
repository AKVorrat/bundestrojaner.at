window.addEventListener('DOMContentLoaded', () => {
  const swiperFeedback = document.querySelector('.swiper-feedback')
  const swiperVideos = document.querySelector('.swiper-videos')

  if (swiperFeedback && swiperFeedback instanceof HTMLElement) {
    const swiper = new Swiper('.swiper-feedback', {
      // Optional parameters
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
