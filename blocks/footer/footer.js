import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;
    decorateIcons(footer);
  
    const grid = footer.children[0].children[0];
    const left = grid.children[0];
    left.className = 'footer-left';

    const leftTitle = left.children[0];
    leftTitle.className = 'footer-title';

    const leftContent = left.children[1];
    {
      const icon = document.createElement('div');
      const iconName = leftContent.children[0].textContent;
      icon.className = `i-${iconName}`;

      const name = leftContent.children[1].textContent;
      
      leftContent.textContent = '';
      leftContent.className = 'footer-left-content';
      leftContent.append(icon);
      leftContent.append(name);
    }

    const right = grid.children[1];
    right.className = 'footer-right';

    const rightTitle = right.children[0];
    rightTitle.className = 'footer-title';

    const rightContent = right.children[1];
    const rightContents = rightContent.children;
    const newRightContent = document.createElement('div');

    for (let i = 0; i < rightContents.length; i += 2) {
      const iconName = rightContents[i + 0].textContent;
      const aHref    = rightContents[i + 1].textContent;
      
      const icon = document.createElement('div');
      icon.className = `i-${iconName}`;

      const a = document.createElement('a');
      a.href = aHref;
      a.className = 'vertcentered';
      a.append(icon);

      newRightContent.append(a);
    }
    rightContent.className = 'footer-right-content';
    rightContent.innerHTML = newRightContent.innerHTML;

    const copyright = footer.children[0].children[1];
    const links = footer.children[0].children[2];
    copyright.parentNode.removeChild(copyright);
    links.parentNode.removeChild(links);
    // wrap copyright and links in div
    const wrapper = document.createElement('div');
    wrapper.className = 'footer-copyright';
    wrapper.append(copyright, links);

    block.append(footer, wrapper);
  }
}
