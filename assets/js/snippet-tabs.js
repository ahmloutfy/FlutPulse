(function () {
  'use strict';
  function initialize() {
    document.querySelectorAll('.snippet-tabs').forEach(function (root) {
      var tabs = Array.from(root.querySelectorAll('[role="tab"]'));
      var panels = tabs.map(function (tab) { return document.getElementById(tab.getAttribute('aria-controls')); }).filter(Boolean);
      var search = root.querySelector('.snippet-search');
      var previous = root.querySelector('.snippet-previous');
      var next = root.querySelector('.snippet-next');
      var counter = root.querySelector('.snippet-counter');
      var dots = root.querySelector('.snippet-dots');
      var activeTab = 0, activeSnippet = 0, snippets = [], savedSnippets = Object.create(null);
      function stateKey() { return String(activeTab); }
      function visibleSnippets(query) {
        return snippets.filter(function (item) {
          return item.tab === activeTab && (!query || item.text.indexOf(query) !== -1);
        });
      }
      panels.forEach(function (panel, tabIndex) {
        Array.from(panel.querySelectorAll('h2, h3')).forEach(function (heading) {
          var codeBlock = heading.nextElementSibling;
          while (codeBlock && !codeBlock.matches('.highlight, .highlighter-rouge, pre')) codeBlock = codeBlock.nextElementSibling;
          if (!codeBlock) return;
          var description = heading.nextElementSibling;
          if (description === codeBlock) description = null;
          snippets.push({ tab: tabIndex, panel: panel, heading: heading, description: description, code: codeBlock,
            text: (heading.textContent + ' ' + (description ? description.textContent : '') + ' ' + codeBlock.textContent).toLowerCase() });
        });
      });
      function update() {
        var query = search ? search.value.trim().toLowerCase() : '';
        var filtered = visibleSnippets(query);
        var key = stateKey();
        var savedIndex = filtered.indexOf(savedSnippets[key]);
        if (savedIndex >= 0) activeSnippet = savedIndex;
        if (activeSnippet >= filtered.length) activeSnippet = Math.max(0, filtered.length - 1);
        savedSnippets[key] = filtered[activeSnippet] || null;
        panels.forEach(function (panel, i) {
          panel.hidden = i !== activeTab;
          panel.classList.toggle('is-active', i === activeTab);
        });
        tabs.forEach(function (tab, i) {
          var selected = i === activeTab;
          tab.classList.toggle('is-active', selected);
          tab.setAttribute('aria-selected', String(selected));
          tab.tabIndex = selected ? 0 : -1;
        });
        snippets.forEach(function (item) {
          var visible = filtered[activeSnippet] === item;
          item.heading.hidden = !visible;
          if (item.description) item.description.hidden = !visible;
          item.code.hidden = !visible;
        });
        if (counter) counter.textContent = filtered.length ? (activeSnippet + 1) + ' / ' + filtered.length : 'No matching snippets';
        if (previous) previous.disabled = activeSnippet <= 0 || !filtered.length;
        if (next) next.disabled = activeSnippet >= filtered.length - 1 || !filtered.length;
        if (dots) dots.textContent = filtered.length ? '● '.repeat(activeSnippet) + '●' + ' ○'.repeat(Math.max(0, filtered.length - activeSnippet - 1)) : '';
        root.classList.add('is-ready');
      }
      tabs.forEach(function (tab, i) { tab.addEventListener('click', function () { activeTab = i; activeSnippet = 0; update(); }); });
      if (search) search.addEventListener('input', function () { activeSnippet = 0; update(); });
      if (previous) previous.addEventListener('click', function () { if (activeSnippet > 0) { activeSnippet--; savedSnippets[stateKey()] = visibleSnippets(search ? search.value.trim().toLowerCase() : '')[activeSnippet] || null; update(); } });
      if (next) next.addEventListener('click', function () { var list = visibleSnippets(search ? search.value.trim().toLowerCase() : ''); if (activeSnippet < list.length - 1) { activeSnippet++; savedSnippets[stateKey()] = list[activeSnippet]; update(); } });
      update();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize); else initialize();
}());
