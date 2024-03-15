/**
 * DO NOT USE import someModule from '...';
 *
 * @issue-url https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/160
 *
 * Chrome extensions don't support modules in content scripts.
 * If you want to use other modules in content scripts, you need to import them via these files.
 *
 */
// import('@pages/content/injected/toggleTheme');

const YOUTUBE = 'https://www.youtube.com';
console.log('\n\n\nLoaded\n\n\n');

const handleYoutube = () => {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const shortsContainer = document.getElementsByTagName('ytd-reel-shelf-renderer');
        shortsContainer.item(0)?.remove();
        if (window.location.href === 'https://www.youtube.com/') {
          const contents = document.getElementById('contents');
          if (contents) {
            contents.hidden = true;
          }
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

if (window.location.href.startsWith(YOUTUBE)) {
  handleYoutube();
}
