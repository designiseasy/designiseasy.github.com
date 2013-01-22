---
layout: layout
title: "Home"
---
<p class="hero">
Three guys in Kansas City designing and building web things for companies and people the web over. We are Design is Easy. We want to make your life easier. <a href="/about/#contact">Talk with us</a> about how we can help you do that.
</p>


<ul class="work">
{% for post in site.categories.work %}
 <li>
  <a href="{{ post.url }}">
    <span class=work-img>
      <span class=screen></span>
      <!--<img src="/static/images/work/{{ post.preview-image }}" height="130" width="230" />-->
      <img src="http://placehold.it/460x260/E8117F/ffffff/&text=FPO" height="130" width="230" />
    </span>
    <span class=work-title> {{ post.title }} </span>
    <span class=work-desc> {{ post.work-desc }} </span>
  </a>
{% endfor %}
</ul>
