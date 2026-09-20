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

<div id="latest-articles" class="container" style="text-align: center;">
  <h2>Latest Articles</h2>
  <div class="grid">
    {% for post in site.posts %}
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
