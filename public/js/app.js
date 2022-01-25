/*console.log('client side javascript file')

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}
)*/



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const Message1 =  document.querySelector('#message-1')
const Message2 =  document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
   e.preventDefault()
 
   Message1.textContent = "Loading Message"
   Message2.textContent = ""

   fetch('/weather?address=' + search.value).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            Message1.textContent = data.error
        }
        else
        {
            Message1.textContent = data.Location
            Message2.textContent = data.Forcast
        }
    })
   })

} )
