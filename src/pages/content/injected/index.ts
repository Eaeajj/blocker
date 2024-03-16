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
setPageManagerVisibility(false);

const shortsStyles = document.createElement('style');
shortsStyles.innerHTML = `
  ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer {
    display: none;
  }
`;

// Inject styles to documentElement because head is null on document_start execution time
document.documentElement.appendChild(pageManagerStyles);
document.documentElement.appendChild(shortsStyles);

const handleYoutube = () => {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        if (window.location.href === `${YOUTUBE}/`) {
          if (isShownPageManagerStyles) {
            setPageManagerVisibility(false);
          }
        } else {
          setPageManagerVisibility(true);
        }
      }
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.href.startsWith(YOUTUBE)) {
    handleYoutube();
  }
});
