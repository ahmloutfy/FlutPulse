---
layout: default
title: Home
---

<section class="hero">
  <div class="hero-text">
    <h1>Solve. Learn. <span>Build.</span></h1>
    <p>Fix Flutter issues with clear, practical solutions.</p>
    <a href="{{ '/#latest-articles' | relative_url }}" class="btn btn-primary" data-track-cta="browse_articles" data-track-location="home_hero">Browse Articles</a>
    <a href="{{ '/#categories-overview' | relative_url }}" class="btn btn-secondary" data-track-cta="explore_categories" data-track-location="home_hero">Explore Categories</a>
  </div>
  <div class="hero-logo">
    <img src="flutpulse_logo.png" alt="FlutPulse" loading="eager" decoding="async">
  </div>
</section>

{% comment %} Ad block hidden while preserving its original code.
<div style="text-align: center; margin: 30px auto; max-width: 100%; padding: 0 15px; box-sizing: border-box;">
  <div style="background: #121821; padding: 15px; border-radius: 8px; border: 1px dashed #263345; display: inline-block; width: 100%; max-width: 760px; box-sizing: border-box; position: relative; overflow: hidden;">
    <span style="color: #444; font-size: 11px; display: block; margin-bottom: 8px;">Advertisement</span>

    <div style="width: 100%; max-width: 728px; min-height: 90px; margin: 0 auto; position: relative; background: #080c11; border-radius: 4px; box-sizing: border-box;">
      <ins class="adsbygoogle"
           style="display: block; width: 100%; min-height: 90px;"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="TOP_HOME_SLOT"></ins>
      <script>(window.adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  </div>
</div>
{% endcomment %}

<div id="latest-articles" class="container" style="text-align: center;">
  <h2>Latest Articles</h2>
  {% assign featured_post = site.posts | first %}
  {% if featured_post %}
  <article class="featured-article">
    {% if featured_post.image %}
    <a class="featured-article-image" href="{{ featured_post.url | relative_url }}" aria-label="Read: {{ featured_post.title | escape }}">
      <img src="{{ featured_post.image | relative_url }}" alt="" loading="lazy" decoding="async">
    </a>
    {% endif %}
    <div class="featured-article-content">
      <p class="featured-article-eyebrow">Latest article</p>
      <p class="featured-article-meta">{{ featured_post.date | date: "%B %d, %Y" }}{% if featured_post.content_path %}{% for content_path in site.data.content_paths %}{% if content_path.slug == featured_post.content_path %} <span aria-hidden="true">·</span> {{ content_path.title }}{% endif %}{% endfor %}{% endif %}</p>
      <h3><a href="{{ featured_post.url | relative_url }}">{{ featured_post.title }}</a></h3>
      <p class="featured-article-excerpt">{{ featured_post.excerpt | strip_html | strip_newlines | truncate: 220 }}</p>
      <a href="{{ featured_post.url | relative_url }}" class="btn btn-primary" data-track-cta="read_article" data-track-location="home_featured_article">Read the Latest Article</a>
    </div>
  </article>
  {% endif %}

  {% assign latest_posts = site.posts | shift | slice: 0, 5 %}
  {% if latest_posts.size > 0 %}
  <h3 class="latest-articles-subheading">More practical Flutter guides</h3>
  <div class="grid">
    {% for post in latest_posts %}
    <div class="card">
      {% if post.image %}
        <img src="{{ post.image | relative_url }}" class="card-img" alt="{{ post.title }}" loading="lazy" decoding="async">
      {% endif %}
      <h3>{{ post.title }}</h3>
      <p>{{ post.excerpt }}</p>
      <a href="{{ post.url | relative_url }}" class="btn btn-primary" data-track-cta="read_article" data-track-location="home_latest_articles">Read More</a>
    </div>
    {% endfor %}
  </div>
  {% endif %}
  {% if site.posts.size > 6 %}
  <div style="margin-top: 25px;">
    <a href="{{ site.baseurl }}/categories/" class="btn btn-secondary" data-track-cta="view_all_articles" data-track-location="home_latest_articles">View All Articles ({{ site.posts.size }})</a>
  </div>
  {% endif %}
</div>

<div id="categories-overview" class="container" style="text-align: center;">
  <h2>Categories</h2>
  <div class="categories-container">
    {% for content_path in site.data.content_paths %}
    <a href="{{ site.baseurl }}/categories/#{{ content_path.slug }}" class="category-btn" data-track-cta="category_open" data-track-location="home_categories">
      {{ content_path.title }}
    </a>
    {% endfor %}
  </div>
  <a href="{{ '/snippets/' | relative_url }}" class="snippet-promo" data-track-cta="browse_code_snippets" data-track-location="home_categories">
    <span class="snippet-promo-label">Ready-to-use examples</span>
    <span class="snippet-promo-title">Need a quick code starting point?</span>
    <span class="snippet-promo-description">Browse practical Flutter snippets for layouts, async UI, and forms.</span>
    <span class="snippet-promo-link">Explore Code Snippets <span aria-hidden="true">→</span></span>
  </a>
</div>

<div class="container" style="text-align: center; margin-top: 40px;">
  <h2>About FlutPulse</h2>
  <p style="max-width: 600px; margin: 0 auto; color: #aaa; line-height: 1.6;">
    FlutPulse is a technical blog focused on solving real-world Flutter problems 
    with clear, practical, and developer-friendly solutions.
  </p>
  <div style="margin-top: 20px;">
    <a href="mailto:flutpulse@proton.me?subject=FlutPulse%20Newsletter%20Subscription" class="btn btn-primary" data-track-cta="newsletter_signup" data-track-location="home_about">Get Weekly Flutter Tips</a>
  </div>
</div>

{% comment %} Ad block hidden while preserving its original code.
<div style="text-align: center; margin: 40px auto 20px auto; max-width: 100%; padding: 0 15px; box-sizing: border-box;">
  <div style="background: #121821; padding: 15px; border-radius: 8px; border: 1px dashed #263345; display: inline-block; width: 100%; max-width: 760px; box-sizing: border-box; position: relative; overflow: hidden;">
    <span style="color: #444; font-size: 11px; display: block; margin-bottom: 8px;">Advertisement</span>

    <div style="width: 100%; max-width: 728px; min-height: 90px; margin: 0 auto; position: relative; background: #080c11; border-radius: 4px; box-sizing: border-box;">
      <ins class="adsbygoogle"
           style="display: block; width: 100%; min-height: 90px;"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="BOTTOM_HOME_SLOT"></ins>
      <script>(window.adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  </div>
</div>
{% endcomment %}
