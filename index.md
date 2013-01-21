---
layout: layout
title: "Home"
---
<p class="hero">
Three guys in Kansas City designing and building web things for companies and people the web over. That's us and we do work as Design is Easy. We want to make your life easier. <a href="/about/#contact">Talk with us</a> about how we can help you do that.
</p>


<ul class="work">
{% for post in site.categories.work %}
 <li>
  <a href="{{ post.url }}">
  <img src="/static/images/work/{{ post.preview-image }}" height="130" width="230" />
  <span class=work-info>
  <span class=work-title>
  {{ post.title }}
  </span>

  <span class=work-desc>
  {{ post.work-desc }}
  </span>
</span>
  </a>
{% endfor %}
</ul>
