---
layout: default
title: Flutter Code Snippets
no_ads: true
permalink: /snippets/
snippet_tabs: true
---

# Flutter Code Snippets

<section class="snippet-intro" aria-labelledby="snippet-intro-title">
  <p class="snippet-intro-eyebrow">Flutter snippets · Ready to use</p>
  <h2 id="snippet-intro-title">Build faster with practical Flutter code</h2>
  <p class="snippet-intro-description">Choose a pattern, copy it into your project, and make it your own. Each example is a focused starting point for real apps.</p>
  <div class="snippet-intro-steps" aria-label="How to use these snippets">
    <span>Choose a pattern</span>
    <span>Copy the code</span>
    <span>Make it yours</span>
  </div>
</section>

<div class="snippet-tabs" markdown="1">
  <div class="snippet-tablist" role="tablist" aria-label="Code snippet categories">
    <button id="tab-layout" class="snippet-tab is-active" type="button" role="tab" aria-selected="true" aria-controls="panel-layout" tabindex="0">Layout</button>
    <button id="tab-async" class="snippet-tab" type="button" role="tab" aria-selected="false" aria-controls="panel-async" tabindex="-1">Async UI</button>
    <button id="tab-forms" class="snippet-tab" type="button" role="tab" aria-selected="false" aria-controls="panel-forms" tabindex="-1">Forms</button>
  </div>

<section id="panel-layout" class="snippet-panel" role="tabpanel" aria-labelledby="tab-layout" tabindex="0" markdown="1">
<h2>Responsive two-column layout</h2>

<p>Switch between side-by-side panels on wider screens and stacked panels on phones.</p>

```dart
LayoutBuilder(
  builder: (context, constraints) {
    final isWide = constraints.maxWidth >= 700;

    if (isWide) {
      return Row(
        children: [
          Expanded(child: ProfilePanel()),
          Expanded(child: DetailsPanel()),
        ],
      );
    }

    return Column(
      children: [ProfilePanel(), DetailsPanel()],
    );
  },
)
```

<hr class="snippet-divider">

<h3>Grid that adapts to available width</h3>

<p>Show more cards per row on wider screens while keeping the layout compact on phones.</p>

```dart
LayoutBuilder(
  builder: (context, constraints) {
    final columns = constraints.maxWidth >= 700 ? 3 : 2;

    return GridView.count(
      crossAxisCount: columns,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      children: products
          .map((product) => ProductCard(product: product))
          .toList(),
    );
  },
)
```
</section>

<section id="panel-async" class="snippet-panel" role="tabpanel" aria-labelledby="tab-async" tabindex="0" markdown="1">
<h2>Loading, success, and error states</h2>

<p>Handle the common states of a request in one place with <code>FutureBuilder</code>.</p>

```dart
FutureBuilder<User>(
  future: userFuture,
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const Center(child: CircularProgressIndicator());
    }
    if (snapshot.hasError) {
      return const Text('Could not load user');
    }
    if (!snapshot.hasData) {
      return const Text('No user found');
    }
    return Text('Hello, ${snapshot.data!.name}');
  },
)
```

<hr class="snippet-divider">

<h3>Display a live stream</h3>

<p>Render incoming updates and handle loading, errors, and empty results with <code>StreamBuilder</code>.</p>

```dart
StreamBuilder<List<Message>>(
  stream: messagesStream,
  builder: (context, snapshot) {
    if (snapshot.hasError) {
      return const Text('Could not load messages');
    }
    if (!snapshot.hasData) {
      return const Center(child: CircularProgressIndicator());
    }
    if (snapshot.data!.isEmpty) {
      return const Text('No messages yet');
    }

    return ListView(
      children: snapshot.data!
          .map((message) => ListTile(title: Text(message.text)))
          .toList(),
    );
  },
)
```
</section>

<section id="panel-forms" class="snippet-panel" role="tabpanel" aria-labelledby="tab-forms" tabindex="0" markdown="1">
<h2>Validate before saving</h2>

<p>Keep input checks near their fields and save only after the form passes validation.</p>

```dart
final formKey = GlobalKey<FormState>();

Form(
  key: formKey,
  child: TextFormField(
    decoration: const InputDecoration(labelText: 'Email'),
    validator: (value) {
      if (value == null || !value.contains('@')) {
        return 'Enter a valid email';
      }
      return null;
    },
  ),
)

if (formKey.currentState!.validate()) {
  saveProfile();
}
```

<hr class="snippet-divider">

<h3>Require a selection</h3>

<p>Validate a dropdown field so the form cannot be submitted without a category.</p>

```dart
DropdownButtonFormField<String>(
  value: selectedCategory,
  decoration: const InputDecoration(labelText: 'Category'),
  items: categories
      .map(
        (category) => DropdownMenuItem(
          value: category,
          child: Text(category),
        ),
      )
      .toList(),
  validator: (value) =>
      value == null ? 'Choose a category' : null,
  onChanged: (value) {
    setState(() => selectedCategory = value);
  },
)
```
</section>
</div>
