---
layout: default
title: "Contact FlutPulse"
permalink: /contact/
no_ads: true
---

<div class="about-container" style="max-width: 800px; margin: 0 auto; padding: 40px 20px; font-family: 'Poppins', sans-serif; color: #ffffff;">
  {% assign web3forms_key = site.web3forms_access_key | default: "" %}
  {% assign form_ready = false %}
  {% if web3forms_key != "" %}
    {% assign form_ready = true %}
  {% endif %}
  <section class="page-intro" aria-labelledby="contact-title">
    <p class="page-intro-eyebrow">Get in touch</p>
    <h1 id="contact-title">Let's talk Flutter</h1>
    <p class="page-intro-description">
      Have a question, suggestion, or collaboration idea? Send a message and we'll get back to you by email.
    </p>
    <div class="page-intro-links">
      <a href="mailto:flutpulse@proton.me" class="btn btn-secondary">Email Us Directly</a>
    </div>
  </section>

  <div style="background: #121821; border: 1px solid #263345; border-radius: 12px; padding: 24px;">
    <form id="contact-form"
          action="https://api.web3forms.com/submit"
          method="POST"
          style="display: grid; gap: 16px;">
      <input type="hidden" name="access_key" {% if form_ready %}value="{{ web3forms_key }}"{% else %}value=""{% endif %}>
      <input type="hidden" name="subject" value="New Contact Message - FlutPulse">
      <input type="hidden" name="from_name" value="FlutPulse Contact Form">

      <label for="name" style="font-weight: 600; color: #d6dee9;">Name</label>
      <input id="name"
             name="name"
             type="text"
             required
             style="padding: 12px 14px; border-radius: 8px; border: 1px solid #304055; background: #0b0f14; color: #ffffff;">

      <label for="email" style="font-weight: 600; color: #d6dee9;">Email</label>
      <input id="email"
             name="email"
             type="email"
             required
             style="padding: 12px 14px; border-radius: 8px; border: 1px solid #304055; background: #0b0f14; color: #ffffff;">

      <label for="message" style="font-weight: 600; color: #d6dee9;">Message</label>
      <textarea id="message"
                name="message"
                rows="7"
                required
                style="padding: 12px 14px; border-radius: 8px; border: 1px solid #304055; background: #0b0f14; color: #ffffff; resize: vertical;"></textarea>

      <button type="submit"
              {% unless form_ready %}disabled{% endunless %}
              style="margin-top: 6px; border: none; cursor: pointer; padding: 12px 18px; border-radius: 8px; font-weight: 700; color: #1a202c; background: linear-gradient(90deg, #7ED957, #FFDE59);">
        Send Message
      </button>
    </form>
  </div>

  {% comment %}
  {% unless form_ready %}
    <p style="text-align: center; margin-top: 16px; color: #9ca9bb; font-size: 0.95rem;">
      To activate this form, update <code style="color:#FFDE59;">formspree_endpoint</code> in
      <code style="color:#FFDE59;">_config.yml</code> with your Formspree form URL.
    </p>
  {% endunless %}
  {% endcomment %}

  <p style="text-align: center; margin-top: 10px; color: #9ca9bb; font-size: 0.95rem;">
    You can also email us directly at <a href="mailto:flutpulse@proton.me" style="color:#7ED957;">flutpulse@proton.me</a>.
  </p>
</div>

{% if form_ready %}
<script>
  (function () {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const formData = new FormData(form);
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        const data = await response.json();
        if (response.ok && data.success) {
          window.location.href = "{{ '/contact/thanks/' | relative_url }}";
          return;
        }
        const errorMessage = (data && data.message) || 'Message could not be sent right now. Please try again later or email flutpulse@proton.me.';
        alert(errorMessage);
      } catch (error) {
        console.error(error);
        alert('Message could not be sent right now. Please try again later or email flutpulse@proton.me.');
      }
    });
  })();
</script>
{% endif %}
