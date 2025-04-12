// const xhr=new XMLHttpRequest();

// xhr.addEventListener('load',()=>{
//   console.log(xhr.response)
// });

// xhr.open('GET', 'https://supersimplebackend.dev/greeting');
// xhr.send();

// const xhr =new XMLHttpRequest
// xhr.addEventListener('load',()=>{
//   console.log(xhr.response)
// })
// xhr.open('GET', 'https://supersimplebackend.dev/greeting')
// xhr.send()

 async function fetchgreeting(){ 
  const response= await fetch('https://supersimplebackend.dev/greeting');

  const greet= await response.text()
   console.log(greet);
}

fetchgreeting();

async function loadMyName(){
  const response=await fetch('https://supersimplebackend.dev/greeting',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      name:'Adeshina'
    })
  });
  const result=await response.text()
  console.log(result)
}
loadMyName()

fetch('https://amazon.com').then((response)=>{
  return response.json()
}).then((answer)=>{
  console.log(answer)
}).catch(()=>{
  console.log('CORS error,your request was blocked by the backend')
})

async function loadError(){
  try{

    const response=await fetch('https://supersimplebackend.dev',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
    });

  }catch(error){
    if(error.status === 400){
      const failure=await error.json()
      console.log(failure)
    }else{
      console.log('Network error.Please try again later')
    }
  }
}
loadError()