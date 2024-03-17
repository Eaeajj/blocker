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
const isYoutubeUrl = (url: string) => url === `${YOUTUBE}/`;

let isShownPageManagerStyles = false;
const pageManagerStyles = document.createElement('style');
const setPageManagerVisibility = (show: boolean) => {
  isShownPageManagerStyles = show;
  pageManagerStyles.innerHTML = `
      ytd-page-manager#page-manager {
        visibility: ${show ? 'visible' : 'hidden'};
      }
  `;
};

if (isYoutubeUrl(window.location.href)) {
  setPageManagerVisibility(false);
}

const shortsStyles = document.createElement('style');
shortsStyles.innerHTML = `
  ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer {
    display: none;
  }
`;

// Inject styles to documentElement because head is null on document_start execution time
document.documentElement.appendChild(pageManagerStyles);
document.documentElement.appendChild(shortsStyles);

// I can't subscribe to popstate event in the content script
// contexts of the content scripts are not the same as the contexts of the page

// tracking the URL via MutationObserver leading have disandvatages
// & flickering when the URL have changed but content of the page have not
// & it fires too often

const handleYoutube = () => {
  console.log('\n\nHandle youtube script running...\n\n');

  // now seems like the best solution, but it still flickering...
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'URL_CHANGE') {
      console.log('\n\nURL_CHANGE\n\n', message.url);

      if (isYoutubeUrl(message.url)) {
        if (isShownPageManagerStyles) {
          setPageManagerVisibility(false);
        }
      } else {
        setTimeout(() => {
          setPageManagerVisibility(true);
        }, 700);
      }
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.href.startsWith(YOUTUBE)) {
    handleYoutube();
  }
});
