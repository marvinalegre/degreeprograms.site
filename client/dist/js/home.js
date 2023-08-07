let interval
let searchResults = document.querySelector('.search-results')

document.querySelector('.search-bar').addEventListener('input', (e) => {
  searchResults.innerHTML = ''

  async function run(term) {
    let searchResult = await fetch('/api/search/' + term)
    searchResult = await searchResult.json()

    searchResults.innerHTML = ''

    for (let hit of searchResult) {
      let anchor = document.createElement('a')
      anchor.setAttribute('href', '/' + hit._id)
      anchor.textContent = hit.program
      let p = document.createElement('p')
      p.textContent = hit.institution
      let card = document.createElement('div')
      card.setAttribute('class', 'card')
      card.appendChild(anchor)
      card.appendChild(p)

      searchResults.appendChild(card)
    }
  }

  window.clearTimeout(interval)
  interval = window.setTimeout(() => {
    if (e.target.value !== '') {
      run(e.target.value)
    }
  }, 300)
})
