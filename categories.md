---
layout: default
title: Categories
permalink: /categories/
---

<style>
  .custom-category-wrapper {
    max-width: 900px;
    margin: 35px auto;
    padding: 0 16px;
    box-sizing: border-box;
  }
  .custom-category-intro { margin-bottom: 32px; }
  .custom-category-block {
    margin-bottom: 22px;
    padding: 24px;
    border: 1px solid var(--border-light);
    border-radius: 12px;
    background: var(--card-bg);
    box-sizing: border-box;
  }
  .custom-category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0 0 18px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-light);
    color: var(--accent-primary);
    font-size: 1.3rem;
  }
  .custom-category-count {
    padding: 4px 12px;
    border-radius: 999px;
    background: var(--bg-primary);
    color: var(--text-muted);
    font-size: 0.78rem;
    font-weight: 500;
  }
  .custom-links-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .custom-article-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 14px 16px;
    border: 1px solid var(--border-light);
    border-radius: 8px;
    background: var(--bg-primary);
    text-decoration: none;
    transition: border-color 160ms ease, transform 160ms ease;
    box-sizing: border-box;
  }
  .custom-article-item:hover,
  .custom-article-item:focus-visible {
    border-color: var(--accent-primary);
    transform: translateY(-2px);
    outline: none;
  }
  .custom-item-title {
    color: var(--text-primary);
    font-size: 0.98rem;
    font-weight: 700;
    text-align: left;
  }
  .custom-item-date {
    flex: 0 0 auto;
    color: var(--text-muted);
    font-family: monospace;
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    .custom-category-block { padding: 17px; }
    .custom-article-item { align-items: flex-start; flex-direction: column; }
    .custom-item-date { align-self: flex-end; }
  }
</style>

<div class="custom-category-wrapper">
  <section class="page-intro custom-category-intro" aria-labelledby="categories-title">
    <p class="page-intro-eyebrow">Find your next solution</p>
    <h1 id="categories-title">Explore Flutter by Category</h1>
    <p class="page-intro-description">Browse practical articles by topic and jump straight to the guidance you need.</p>
  </section>

  {% for content_path in site.data.content_paths %}
    {% assign category_name = content_path.title %}
    {% assign path_posts = site.posts | where: "content_path", content_path.slug %}

    <section class="custom-category-block" id="{{ content_path.slug }}" aria-labelledby="category-{{ content_path.slug }}">
      <h2 class="custom-category-header" id="category-{{ content_path.slug }}">
        <span>{{ category_name }}</span>
        <span class="custom-category-count">
          {{ path_posts.size }} {% if path_posts.size == 1 %}Article{% else %}Articles{% endif %}
        </span>
      </h2>

      <div class="custom-links-list">
        {% for post in path_posts %}
          <a href="{{ post.url | relative_url }}" class="custom-article-item">
            <span class="custom-item-title">{{ post.title }}</span>
            <span class="custom-item-date">{{ post.date | date: "%b %d, %Y" }} <span aria-hidden="true">→</span></span>
          </a>
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</div>
