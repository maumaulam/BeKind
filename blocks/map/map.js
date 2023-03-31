export default function decorate(block) {
  /* change to iframe */
  const iframe = document.createElement('iframe');
  iframe.src = block.children[0].textContent;
  iframe.className = 'map-body';
  block.textContent = '';
  block.append(iframe);
}
