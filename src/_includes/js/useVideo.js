// draft - might need tweaking to make it work
window.addEventListener('DOMContentLoaded', () => {
  const vCover = document.querySelectorAll('video-thumb')
  const videoIframe = (u) => `<iframe src="${u}" title="Video player" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`

  vCover.forEach((c, i) => {
    c.addEventListener('click', () => {
      const video = document.querySelector(`[data-video-id="vid${i}"]`)
      const videoURL = video.dataset.videoUrl
      c.style.display = 'none'
      video.style.display = 'block'
      video.innerHTML = videoIframe(videoURL)
    })
  })
})
