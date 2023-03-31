export default function decorate(block) {
    // '/' delim means replace with <br>
    // '-' delim means subheading, create new div
    const heading = block.querySelector('h1');
    const headings = heading.textContent.split(' - ');
    heading.textContent = headings[0];
    heading.innerHTML = heading.innerHTML.replaceAll(' / ', '<br>');
    headings.splice(0, 1);

    headings.forEach((h) => {
        const subhead = document.createElement('div');
        subhead.textContent = h;
        subhead.className = 'subhead';
        heading.parentNode.append(subhead);
    });

    const btn = document.createElement('a');
    btn.href = '#';
    btn.textContent = 'Join Us';
    btn.className = 'join-us';
    heading.parentNode.append(btn);
}
