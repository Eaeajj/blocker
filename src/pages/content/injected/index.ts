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
const isYoutubeHomeUrl = (url: string) => url === `${YOUTUBE}/`;

// ============================= dynamic styles ===========================================
let isShownPageManagerStyles = false;
const pageManagerStyles = document.createElement('style');
const setPageManagerVisibility = (show: boolean) => {
  isShownPageManagerStyles = show;
  pageManagerStyles.innerHTML = `
      #page-manager {
        visibility: ${show ? 'visible' : 'hidden'};
      }
  `;
};

// ============================= static styles ===========================================
const shortsStyles = document.createElement('style');
shortsStyles.innerHTML = `
  ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer {
    display: none;
  }
`;

const rightSideRecommendationsColumnWhileWatching = document.createElement('style');
rightSideRecommendationsColumnWhileWatching.innerHTML = `
  #secondary {
    display: none;
  }
`;

const nextVideoRecommendationOverVideoInTheEnd = document.createElement('style');
nextVideoRecommendationOverVideoInTheEnd.innerHTML = `
  #movie_player > div.ytp-ce-element.ytp-ce-video.ytp-ce-large-round.ytp-ce-bottom-left-quad.ytp-ce-size-1280.ytp-ce-element-show {
    display: none;
  }
`;
const endVideoVideoWallRecommendations = document.createElement('style');
endVideoVideoWallRecommendations.innerHTML = `
#movie_player > div.html5-endscreen.ytp-player-content.videowall-endscreen.ytp-show-tiles {
  display: none;
}
`;
// ==================================== Injection ========================================

// Inject styles to documentElement because head is null on document_start execution time
document.documentElement.appendChild(pageManagerStyles);
document.documentElement.appendChild(shortsStyles);
document.documentElement.appendChild(rightSideRecommendationsColumnWhileWatching);
document.documentElement.appendChild(nextVideoRecommendationOverVideoInTheEnd);
document.documentElement.appendChild(endVideoVideoWallRecommendations);

// ============================= handling dynamic styles ==================================
// I can't subscribe to popstate event in the content script
// contexts of the content scripts are not the same as the contexts of the page

// tracking the URL via MutationObserver leading have disandvatages
// & flickering when the URL have changed but content of the page have not
// & it fires too often

const handleYoutube = () => {
  setPageManagerVisibility(!isYoutubeHomeUrl(window.location.href));

  // now seems like the best solution, but it rarely still flickering...
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'URL_CHANGE') {
      if (window.location.href !== message.url) {
        return;
        // when redirecting from '/channel' to '/'
        // there first event coming is redirect to '/channel' and the second is '/'
      }
      console.log('\n\nURL_CHANGE\n\n', message.url);

      if (isYoutubeHomeUrl(message.url)) {
        if (isShownPageManagerStyles) {
          setPageManagerVisibility(false);
          console.log('\n\n\nAllo privet!\n\n');
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
