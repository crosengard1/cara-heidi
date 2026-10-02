// Screenshot-only preview: render at up to 2x for readable exports.
// Keep the app's logical viewport fixed; fit the whole device with one scale.
const deviceViewport = document.querySelector('.device-viewport');
const deviceFrame = deviceViewport.querySelector('.phone-frame');
const devicePreviewObserver = new ResizeObserver(([entry]) => {
  const scale = Math.min(
    2,
    entry.contentRect.width / deviceFrame.offsetWidth,
    entry.contentRect.height / deviceFrame.offsetHeight
  );
  deviceFrame.style.setProperty('--preview-scale', String(scale));
});
devicePreviewObserver.observe(deviceViewport);
