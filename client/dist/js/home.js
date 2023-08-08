import Chart from 'chart.js/auto'

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
      anchor.setAttribute('href', '/?compare=' + hit._id)
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

let programsString = new URL(window.location).searchParams.get('compare')
if (programsString) {
  async function run() {
    let programs = await fetch(`/api/datasets/${programsString}`)
    programs = await programs.json()
    let min = programs[0].graduates.years[0]
    let max = programs[0].graduates.years[0]
    for (let program of programs) {
      for (let year of program.graduates.years) {
        if (year < min) {
          min = year
        }

        if (year > max) {
          max = year
        }
      }
    }

    let labels = []
    while (labels[labels.length - 1] !== max || labels.length === 0) {
      labels.push(min)
      min++
    }

    let datasets = programs.map(program => {
      return {
        label: program.program + ' ' + program.institution,
        data: program.graduates.values
      }
    })
    console.log(datasets) //////////////////

    new Chart(
      document.getElementById('chart'),
      {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
          
          // [
          //   {
          //     label: program.program + ' ' + program.institution,
          //     data: program.graduates.values
          //   }
          // ]
        },
      },
    );
  }
  run().catch(console.log)
}
