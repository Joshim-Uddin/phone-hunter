//Global variable selector
let phones;
const displayContainer = document.getElementById('cards');
const showAllBtn =  document.getElementById('show-all')


const loader = document.getElementById('loader');
let url = `https://openapi.programming-hero.com/api/phones?search=iphone`
const fetchPhoneData = (url)=>{
    fetch(url)
    .then (res=> res.json())
    .then (data=>displayPhoneData(data.data))

}

const displayPhoneData = (data)=>{
  displayContainer.innerHTML = '';
  if(data.length == 0){
    displayContainer.innerHTML = `
    <p class="text-center w-75 mx-auto fw-bold fs-3 text-warning">Sorry!! The phone you searching for is not Found!</p>`
    showAllBtn.innerHTML = '';
  }else{
 
//Display 10 phones for a particular search 
 showFewOrMore(data);
// Display All phones for a particular search
 showAll(data)
  }

  //Hiding spinner when data appended
  loader.classList.add('d-none')   
}
fetchPhoneData(url);

const searchBtn= document.getElementById('search-btn');
searchBtn.addEventListener('click', ()=>{
  const inputField = document.getElementById('input-field');
  const inputFieldValue = inputField.value;
  url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`
  fetchPhoneData(url);
  inputField.value = '';
  loader.classList.remove('d-none');
})

const enterBtn = document.addEventListener('keypress', (event)=>{
  if(event.key==='Enter'){
    const inputField = document.getElementById('input-field');
    const inputFieldValue = inputField.value;
    url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`
    fetchPhoneData(url);
    inputField.value = '';
    loader.classList.remove('d-none');
  }
  
})


//displaying 10 phones result from the data
const showFewOrMore = (data)=>{
  const phones = data.slice(0,10);
  appendPhoneCard(phones);
  showAllBtn.innerHTML = '';
  showAllBtn.innerHTML = `
  <button id="show-all-btn" class="btn btn-primary my-3">Show All</button>
  `
  return phones;
}

const showAll = (data)=>{
  document.getElementById('show-all-btn').addEventListener('click',()=>{
   const phones = data.slice(0);
   appendPhoneCard(phones)
   showAllBtn.innerHTML = '';
  })
}

const appendPhoneCard = (phones)=>{
    phones.forEach(phone=>{
    const col = document.createElement('div');
    col.classList.add('col')
    col.innerHTML= `
                          <div class="card p-3">
                            <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
                            <div class="card-body">
                              <h5 class="card-title">${phone.phone_name}</h5>
                              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                              <div class="text-center mb-0"><button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick="fetchPhoneDetails('${phone.slug}')" data-bs-target="#showPhoneDetails">
                              Show Details
                            </button></div>
                              
                            </div>
                          </div>
                          
    ` 
    displayContainer.appendChild(col) 

})
}

//showing details in modals

const fetchPhoneDetails = id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
  .then(res=> res.json())
  .then(details=> displayPhoneDetials(details.data))

}
const displayPhoneDetials = (data)=>{
   const phoneDetailsTitle = document.getElementById('phoneDetailsTitle');
  phoneDetailsTitle.innerHTML = `${data.name}`
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
  <img src="${data.image}" class="w-25">
  <p>Release : ${data.releaseDate?data.releaseDate:'No Release Date'}</p>
  <p>Bluetooth: ${data.others.Bluetooth?data.others.Bluetooth:'No bluetooth'}</p>
  <p>Storage: ${data.mainFeatures.storage?data.mainFeatures.storage:'No storage Data'}</p>
  `
}

