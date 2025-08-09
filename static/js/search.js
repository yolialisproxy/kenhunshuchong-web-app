var lunrIndex = lunr(function () {
  this.field('title');
  this.field('content');
  this.ref('id');
});

var store = {};

{% for page in site.pages %}
  lunrIndex.add({
    id: '{{ page.url }}',
    title: '{{ page.title }}',
    content: '{{ page.content | strip_html | truncate(200) }}'
  });
  store['{{ page.url }}'] = {
    title: '{{ page.title }}',
    url: '{{ page.url }}'
  };
{% endfor %}

function search(query) {
  var results = lunrIndex.search(query);
  var resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';
  results.forEach(function(result) {
    var resultItem = document.createElement('div');
    resultItem.className = 'search-result';
    resultItem.innerHTML = `<a href="${store[result.ref].url}">${store[result.ref].title}</a>`;
    resultsContainer.appendChild(resultItem);
  });
}
