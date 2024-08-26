window.addEventListener('DOMContentLoaded', function() {
  const id = 'c05e2728-ce97-4926-9e8c-45ef267e3db2'
  // const id = 'a8870f8d-31f2-4e8f-8ec1-cb8e5429cc82' // prod campaign
  const signaturesLimit = 10

  document.getElementById('campaign1-form').src = `https://campaign.epicenter.works/de/campaign/${id}`
  iframeResize({
    license: 'GPLv3',
    waitForLoad: true,
  }, '#campaign1-form')

  document.getElementById('campaign1-count').src = `https://campaign.epicenter.works/de/campaign/${id}/count`
  iframeResize({
    license: 'GPLv3',
    waitForLoad: true,
  }, '#campaign1-count')

  document.getElementById('campaign1-signatures').src = `https://campaign.epicenter.works/de/campaign/${id}/signatures?limit=${signaturesLimit}`
  iframeResize({
    license: 'GPLv3',
    waitForLoad: true,
  }, '#campaign1-signatures')
})
