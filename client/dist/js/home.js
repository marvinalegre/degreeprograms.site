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
      if (/compare/.test(window.location.href)) {
        anchor.setAttribute('href', new URL(window.location).search + '-vs-' + hit._id)
      } else {
        anchor.setAttribute('href', '?compare=' + hit._id)
      }
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

    const YEARS = []
    for (let program of programs) {
      for (let year of program.graduates.years) {
        YEARS.push(year)
      }
    }
    let min = Math.min.apply(Math, YEARS)
    let max = Math.max.apply(Math, YEARS)

    // for (let program of programs) {
    //   for (let year of program.graduates.years) {
    //     if (year < min) {
    //       min = year
    //     }

    //     if (year > max) {
    //       max = year
    //     }
    //   }
    // }

    let labels = []
    let z = min
    while (labels[labels.length - 1] !== max || labels.length === 0) {
      labels.push(z)
      z++
    }

    function prepValues(fmin, fmax, years, values) {
      let output = []
      for (let year = fmin; year <= fmax; year++) {
        let i = years.indexOf(year)
        if (i !== -1) {
          output.push(values[i])
        } else {
          output.push(undefined)
        }
      }
      
      return output

    }

    let datasets = programs.map(program => {
      return {
        label: program.program + ' ' + program.institution,
        data: prepValues(min, max, program.graduates.years, program.graduates.values)
      }
    })

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
