(function () {
  'use strict';

  var copyIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  var checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"></path></svg>';
  var errorIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="10"></circle></svg>';

  function getLanguage(block) {
    var languageClass = Array.prototype.find.call(block.classList, function (className) {
      return className.indexOf('language-') === 0;
    });

    return languageClass
      ? languageClass.replace('language-', '').replace(/[-_]/g, ' ')
      : 'Code';
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      return document.execCommand('copy') ? Promise.resolve() : Promise.reject(new Error('Copy command was rejected'));
    } catch (error) {
      return Promise.reject(error);
    } finally {
      document.body.removeChild(textarea);
    }
  }

  function setFeedback(button, state) {
    button.classList.remove('copied', 'copy-failed');
    button.classList.add(state === 'success' ? 'copied' : 'copy-failed');
    button.innerHTML = state === 'success' ? checkIcon : errorIcon;
    button.setAttribute('aria-label', state === 'success' ? 'Code copied' : 'Unable to copy code');
    button.title = state === 'success' ? 'Copied' : 'Unable to copy';

    window.setTimeout(function () {
      button.classList.remove('copied', 'copy-failed');
      button.innerHTML = copyIcon;
      button.setAttribute('aria-label', 'Copy code');
      button.title = 'Copy code';
    }, 1600);
  }

  function initializeCodeCopy() {
    document.querySelectorAll('.article-main-content div.highlighter-rouge').forEach(function (block) {
      if (block.dataset.copyReady === 'true') return;

      var code = block.querySelector('pre code');
      if (!code) return;

      block.dataset.copyReady = 'true';

      var toolbar = document.createElement('div');
      toolbar.className = 'code-block-toolbar';
      var language = document.createElement('span');
      language.className = 'code-block-language';
      language.textContent = getLanguage(block);

      var button = document.createElement('button');
      button.className = 'code-copy-btn';
      button.type = 'button';
      button.setAttribute('aria-label', 'Copy code');
      button.title = 'Copy code';
      button.innerHTML = copyIcon;
      button.addEventListener('click', function () {
        copyText(code.textContent).then(function () {
          setFeedback(button, 'success');
        }).catch(function () {
          setFeedback(button, 'error');
        });
      });

      toolbar.appendChild(language);
      toolbar.appendChild(button);
      block.insertBefore(toolbar, block.firstChild);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCodeCopy);
  } else {
    initializeCodeCopy();
  }
}());
