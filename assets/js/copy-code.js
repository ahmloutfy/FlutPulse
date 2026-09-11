// Copy Code Button Functionality
document.addEventListener('DOMContentLoaded', function() {
  const codeBlocks = document.querySelectorAll('.article-main-content div.highlighter-rouge');
  
  codeBlocks.forEach((block, index) => {
    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.innerHTML = '📋 Copy';
    copyBtn.setAttribute('data-block-id', index);
    
    // Create wrapper for button positioning
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'copy-btn-wrapper';
    buttonWrapper.appendChild(copyBtn);
    
    // Insert button wrapper at the beginning of code block
    block.insertBefore(buttonWrapper, block.firstChild);
    
    // Get the code content
    const codeContent = block.querySelector('code');
    
    // Copy functionality
    copyBtn.addEventListener('click', function() {
      if (codeContent) {
        const text = codeContent.textContent;
        navigator.clipboard.writeText(text).then(() => {
          // Change button text temporarily
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = '✅ Copied!';
          copyBtn.classList.add('copied');
          
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('copied');
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy:', err);
          copyBtn.innerHTML = '❌ Failed';
          setTimeout(() => {
            copyBtn.innerHTML = '📋 Copy';
          }, 2000);
        });
      }
    });
  });
  
  // Track scroll position for sticky button
  function updateButtonPositions() {
    const codeBlocks = document.querySelectorAll('.article-main-content div.highlighter-rouge');
    
    codeBlocks.forEach((block) => {
      const wrapper = block.querySelector('.copy-btn-wrapper');
      if (!wrapper) return;
      
      const rect = block.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect();
      
      // If code block is in view
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Calculate how much to move the button as user scrolls
        const blockHeight = rect.height;
        const scrollPercentage = Math.min(Math.max(0, -rect.top / blockHeight), 1);
        const maxScroll = Math.max(0, blockHeight - 50); // 50px is button height
        const translateY = scrollPercentage * maxScroll;
        
        wrapper.style.transform = `translateY(${translateY}px)`;
      }
    });
  }
  
  // Update button positions on scroll
  window.addEventListener('scroll', updateButtonPositions, { passive: true });
  window.addEventListener('resize', updateButtonPositions, { passive: true });
  
  // Initial update
  updateButtonPositions();
});
