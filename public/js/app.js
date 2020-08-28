
// fetch('https://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data)=> {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/index/?address=Bangalore').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
        
//     })
// })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')



//msgOne.textContent = ''
weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = searchElement.value
    const msgOne = document.querySelector('#msg1')
    const msgTwo = document.querySelector('#msg2')
    
    fetch('/index/?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgOne.textContent = data.error
            msgTwo.textContent = ''
        }
        else{
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast 
        }
        
    })
})
    console.log('listening')
    console.log(location)
})