(function () {
  'use strict';

  function initializeSnippetTabs() {
    document.querySelectorAll('.snippet-tablist').forEach(function (tablist) {
      var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
      if (!tabs.length) return;
      var tabsWrapper = tablist.parentElement;

      function activateTab(tab, moveFocus) {
        tabs.forEach(function (item) {
          var selected = item === tab;
          item.setAttribute('aria-selected', selected ? 'true' : 'false');
          item.tabIndex = selected ? 0 : -1;
          item.classList.toggle('is-active', selected);

          var panel = document.getElementById(item.getAttribute('aria-controls'));
          if (panel) {
            panel.classList.toggle('is-active', selected);
            panel.setAttribute('aria-hidden', selected ? 'false' : 'true');
          }
        });

        tabsWrapper.classList.add('is-ready');

        if (moveFocus) tab.focus();
      }

      tabs.forEach(function (tab, index) {
        tab.addEventListener('click', function () {
          activateTab(tab, false);
        });

        tab.addEventListener('keydown', function (event) {
          var nextIndex;
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            nextIndex = (index + 1) % tabs.length;
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            nextIndex = (index - 1 + tabs.length) % tabs.length;
          } else if (event.key === 'Home') {
            nextIndex = 0;
          } else if (event.key === 'End') {
            nextIndex = tabs.length - 1;
          } else {
            return;
          }

          event.preventDefault();
          activateTab(tabs[nextIndex], true);
        });
      });

      var selectedTab = tabs.find(function (tab) {
        return tab.getAttribute('aria-selected') === 'true';
      }) || tabs[0];
      activateTab(selectedTab, false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSnippetTabs);
  } else {
    initializeSnippetTabs();
  }
}());
