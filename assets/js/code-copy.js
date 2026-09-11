(function() {
  'use strict';

  // SVG Icons
  const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`;
  
  const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

  function initializeCodeCopy() {
    // Get all code blocks
    const codeBlocks = document.querySelectorAll('pre > code');
    
    if (codeBlocks.length === 0) return;

    codeBlocks.forEach((codeBlock) => {
      // Wrap code block with container if not already wrapped
      const preBlock = codeBlock.parentElement;
      
      if (preBlock.parentElement.classList.contains('code-copy-wrapper')) {
        return; // Already initialized
      }

      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'code-copy-wrapper';
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-btn';
      copyButton.type = 'button';
      copyButton.setAttribute('aria-label', 'Copy code');
      copyButton.innerHTML = copyIcon;
      copyButton.title = 'Copy code';

      // Insert wrapper and button
      preBlock.parentElement.insertBefore(wrapper, preBlock);
      wrapper.appendChild(preBlock);
      wrapper.appendChild(copyButton);

      // Add copy functionality
      copyButton.addEventListener('click', async function(e) {
        e.preventDefault();
        
        try {
          // Get code text
          const codeText = codeBlock.innerText;
          
          // Copy to clipboard
          await navigator.clipboard.writeText(codeText);
          
          // Visual feedback
          copyButton.innerHTML = checkIcon;
          copyButton.classList.add('copied');
          copyButton.title = 'Copied!';
          
          // Reset after 2 seconds
          setTimeout(() => {
            copyButton.innerHTML = copyIcon;
            copyButton.classList.remove('copied');
            copyButton.title = 'Copy code';
          }, 2000);
          
        } catch (err) {
          console.error('Failed to copy code:', err);
          copyButton.title = 'Failed to copy';
          
          // Reset after 2 seconds
          setTimeout(() => {
            copyButton.title = 'Copy code';
          }, 2000);
        }
      });

      // Keyboard support
      copyButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          copyButton.click();
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCodeCopy);
  } else {
    initializeCodeCopy();
  }

  // Re-initialize if new content is dynamically added
  if (window.MutationObserver) {
    const observer = new MutationObserver(initializeCodeCopy);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();
