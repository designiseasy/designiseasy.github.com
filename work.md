---
layout: work
permalink: work/
body-class: work
categories: nav
title: "Work"
---

Check out all of our cool work

{% for post in site.categories.work %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
