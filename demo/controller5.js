xController(function (xDivEl) {
  const initialContent = xDivEl.innerHTML;
  xDivEl.innerHTML = '<p><em>' + initialContent + '</em></p>';
});
