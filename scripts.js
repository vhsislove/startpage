/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"Ym1SYKws1gj3odji","label":"𝐔𝐬𝐞𝐥𝐞𝐬𝐬","bookmarks":[{"id":"bnYWpkUV71Vs6mZx","label":"youtube","url":"https://youtube.com"},{"id":"W9NmNUl4NZNulUw2","label":"vk","url":"https://vk.com"}]},{"id":"TdHOI0U2tgf1P2NJ","label":"𝐑𝐞𝐝𝐝𝐢𝐭","bookmarks":[{"id":"3AZWUOOxvJYhepsZ","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"w6hzbiEW0ktqoFJa","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"RwJlYRcDMqkTm3gd","label":"r/linuxmemes","url":"https://www.reddit.com/r/linuxmemes/"}]},{"id":"KDzS7J1rlsPhBixr","label":"𝐌𝐛 𝐔𝐬𝐞𝐟𝐮𝐥","bookmarks":[{"id":"Y50UYLwvWQt5LlQQ","label":"monkeytype","url":"https://monkeytype.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
