import Chart from 'chart.js/auto'

let id = window.location.pathname.split('/')[2]

async function run() {
  let program = await fetch('/api/program/' + id)
  program = await program.json()

  document.querySelector('.program-name').textContent = program.program
  document.querySelector('.institution').textContent = program.institution

  new Chart(
    document.getElementById('chart'),
    {
      type: 'line',
      data: {
        labels: program.graduates.years,
        datasets: [
          {
            label: program.program + ' ' + program.institution,
            data: program.graduates.values
          }
        ]
      },
    },
  );
}
run().catch(console.log)
