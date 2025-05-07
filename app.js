import calculateUnits from './server.js'
const form = document.getElementById('convert_form')

const units = document.querySelectorAll('.units').forEach((unitButton)=>{
  const unitInput = document.getElementById('unit');
  unitButton.addEventListener('click', (event)=>{
    unitInput.value = event.currentTarget.innerText
  })
})

form.addEventListener('submit', (event)=>{
  event.preventDefault();
  const formData = new FormData(form);
  console.log('hi')
  const data = Object.fromEntries(formData.entries());
  const results = calculateUnits(data);
  console.log(results)

  if(results.message === undefined){
    document.getElementById('results').innerHTML = `<p>${results.oldLength} ${results.unit_to_convert_from} = ${results.length} ${results.unit_to_convert_to}</p>`
  }
})