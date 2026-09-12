---
layout: default
title: Categories
permalink: /categories/
---

<style>
  .custom-category-wrapper {
    max-width: 800px;
    margin: 40px auto;
    padding: 0 20px;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }
  .custom-category-title {
    text-align: center;
    color: #ffffff !important;
    margin-bottom: 40px;
    font-size: 32px;
    font-weight: bold;
    border: none !important;
  }
  .custom-category-block {
    background: #121821 !important;
    padding: 25px;
    border-radius: 8px !important;
    border: 1px solid #1e2733 !important;
    margin-bottom: 35px;
    display: block !important;
  }
  .custom-category-header {
    color: #6cff6c !important;
    margin: 0 0 20px 0 !important;
    border-bottom: 1px solid #263345 !important;
    padding-bottom: 12px !important;
    font-size: 22px !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
  }
  .custom-category-count {
    color: #888888 !important;
    font-size: 14px !important;
    font-weight: normal !important;
    background: #0b0f14 !important;
    padding: 4px 12px !important;
    border-radius: 6px !important;
  }
  .custom-links-list {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
    width: 100% !important;
  }
  .custom-article-item {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 16px 20px !important;
    background: #0b0f14 !important;
    border: 1px solid #1e2733 !important;
    border-radius: 6px !important;
    text-decoration: none !important;
    transition: all 0.2s ease !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  .custom-article-item:hover {
    border-color: #6cff6c !important;
    background: #161f2b !important;
  }
  .custom-item-title {
    color: #ffffff !important;
    font-size: 16px !important;
    font-weight: bold !important;
    text-align: left !important;
  }
  .custom-item-date {
    color: #a0a0a0 !important;
    font-size: 13px !important;
    font-family: monospace !important;
  }
</style>

<div class="custom-category-wrapper">
  <h1 class="custom-category-title">Articles by Category</h1>

  {% for content_path in site.data.content_paths %}
    {% assign category_name = content_path.title %}
    {% assign path_posts = site.posts | where: "content_path", content_path.slug %}
    
    <div class="custom-category-block" id="{{ content_path.slug }}">
      
      <h2 class="custom-category-header">
        <span>📁 {{ category_name }}</span>
        <span class="custom-category-count">
          {{ path_posts | size }} {% if path_posts | size == 1 %}Article{% else %}Articles{% endif %}
        </span>
      </h2>
      
      <div class="custom-links-list">
        {% for post in path_posts %}
          <a href="{{ post.url | relative_url }}" class="custom-article-item">
            <span class="custom-item-title">📄 {{ post.title }}</span>
            <span class="custom-item-date">
              {{ post.date | date: "%b %d, %Y" }}
              <span style="color: #6cff6c !important; margin-left: 8px;">→</span>
            </span>
          </a>
        {% endfor %}
      </div>

    </div>
  {% endfor %}
</div>
