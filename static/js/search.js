var indexJsonUrl = "/index.json";
var indexData = null;

// 防抖函数，防止频繁触发搜索
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 加载 index.json 数据，包含错误处理和日志输出
async function loadIndex() {
  if (indexData) return; // 已加载，直接返回缓存数据
  try {
    const response = await fetch(indexJsonUrl);
    if (!response.ok) {
      throw new Error("网络错误，状态码：" + response.status);
    }
    indexData = await response.json();
    console.log("成功加载索引数据:", indexData);
  } catch (error) {
    console.error("加载搜索索引失败：", error);
  }
}

// 简单匹配关键字（不区分大小写），可按需扩展搜索逻辑
function filterData(query) {
  if (!query || !indexData) return [];
  query = query.toLowerCase();
  return indexData.filter(function(post) {
    const title = post.title ? post.title.toLowerCase() : "";
    const content = post.content ? post.content.toLowerCase() : "";
    return title.includes(query) || content.includes(query);
  });
}

// 获得文章摘要：先移除 HTML 标签，再截取前100个字符
function getExcerpt(content) {
  if (!content) return "";
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = content;
  var text = tempDiv.textContent || tempDiv.innerText || "";
  text = text.trim().replace(/\s+/g, " ");
  return text.length > 100 ? text.slice(0, 100) + "..." : text;
}

// 渲染搜索结果到页面
function renderResults(results) {
  var resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = "";

  // 没有搜索结果时，显示提示
  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>没有找到匹配的文章。</p>";
    return;
  }

  // 添加搜索结果标题
  var header = document.createElement("p");
  header.textContent = "搜索结果：";
  header.style.fontWeight = "bold";
  header.style.marginBottom = "1rem";
  resultsContainer.appendChild(header);

  var ul = document.createElement("ul");

  results.forEach(function(post) {
    var li = document.createElement("li");
    li.style.marginBottom = "1.5rem";

    // 标题链接部分
    var titleLink = document.createElement("a");
    titleLink.href = post.url;
    titleLink.textContent = post.title;
    titleLink.style.fontWeight = "bold";
    titleLink.style.fontSize = "1.2rem";
    titleLink.style.color = "#b39ddb";
    titleLink.addEventListener("mouseover", function() {
      titleLink.style.color = "#a182c0";
    });
    titleLink.addEventListener("mouseout", function() {
      titleLink.style.color = "#b39ddb";
    });
    li.appendChild(titleLink);

    // 摘录内容部分
    if (post.content) {
      var excerpt = document.createElement("p");
      excerpt.textContent = getExcerpt(post.content);
      excerpt.style.margin = "0.5rem 0 0";
      excerpt.style.color = "rgba(255,255,255,0.8)";
      li.appendChild(excerpt);
    }

    ul.appendChild(li);
  });
  resultsContainer.appendChild(ul);
}

// 搜索函数
async function search(query) {
  await loadIndex();
  if (!indexData) {
    console.error("无索引数据");
    return;
  }
  var results = filterData(query);
  renderResults(results);
}

// 包装搜索函数，加防抖处理，每300毫秒执行一次
var debouncedSearch = debounce(function(value) {
  search(value);
}, 300);

// 监听 search-input 的键盘输入事件，此处无需内联 onkeyup
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      debouncedSearch(e.target.value);
    });
}


