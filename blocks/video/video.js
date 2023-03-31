export default function decorate(block) {
    // const video = document.createElement('video');
    // video.src = block.children[0].textContent;
    // video.controls = true;
    // video.className = 'video';
    // block.textContent = '';
    // block.append(video);
    const video = document.createElement('iframe');
    video.src = block.children[0].textContent;
    video.className = 'video';
    block.textContent = '';
    block.append(video);
  }
  