export default function decorate(block) {
    const video = document.createElement('video');
    video.src = block.children[0].textContent;
    video.controls = true;
    block.textContent = '';
    block.append(video);
  }
  