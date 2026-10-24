---
layout: default
title: "Design Honest Offline and Retry States in Flutter"
date: 2026-12-20 09:00:00 +03:00
excerpt: "Help users understand what is saved, what needs a connection, and what a retry will do when the network disappears."
image: "/images/articles/ui-ux-mastery-component-design/flutter-offline-first-feedback.png"
categories: [ui-ux, networking]
tags: [offline, errors, retry, user-experience]
---
<h1>{{ page.title }}</h1>
<p class="article-date">Published on: {{ page.date | date: "%B %d, %Y" }}</p>

“Something went wrong” is not enough when a user is unsure whether their work was saved. Offline UX starts with being precise about what the app knows and what it has safely stored.

## Separate local work from server confirmation

If a user edits a draft offline, say that it is saved on this device. Do not show “Saved” if the server has not confirmed the change. For a submitted action, distinguish pending, confirmed, and failed states.

A small status message can be more useful than a full-screen network warning:

```dart
Text(
  isSyncing ? 'Syncing changes…' : 'Saved on this device',
  semanticsLabel: isSyncing
      ? 'Syncing changes'
      : 'Changes saved on this device',
)
```

Use wording that matches the actual persistence guarantee. If local storage is volatile, do not imply that the data will survive app removal or device failure.

## Make retry behavior explicit

A retry button should explain the action when it is not obvious. Keep the user's form values and show the result of the retry. For actions that create records or charge money, coordinate with the API on idempotency so a repeated request cannot silently create duplicates.

Do not automatically retry forever in the background. Respect connectivity and server backoff signals, and provide a way to see whether work is still pending.

## Preserve context

Keep already loaded content visible if it is still useful, but label it as possibly out of date when appropriate. Avoid blocking the entire app because one optional panel could not refresh.

When the user returns online, show a quiet confirmation only when the sync outcome matters. Multiple transient banners for every successful request create noise.

## Test real transitions

Turn off connectivity during a read, during an edit, and during submission. Restore it and verify the exact retry or sync behavior. Also test an expired session separately from offline mode; they require different recovery steps.

Trust comes from accurate status. Tell users what is stored, what is waiting, and what they need to do next, then make that next action easy.
