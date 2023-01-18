
//--------- Declare Variables --------------
let ingObject
let liqObject

let ingN = 0
let liqN = 0
let toolN = 0
let glassN = 0

//------------- Get API Data ----------------
axios({
  method: 'GET',
  url: '/api/ingredients',
  //params: 'URL parameters to be sent with the request'
})
  .then(response => {
    ingObject = response
    console.log(ingObject)
  })
  .catch(err => {
    console.log(err)
  });

  axios({
    method: 'GET',
    url: '/api/liquors',
    //params: 'URL parameters to be sent with the request'
  })
    .then(response => {
      liqObject = response
    })
    .catch(err => {
      console.log(err)
    });
  
//------- Set Number of items (for Edit to work) --------
  window.addEventListener(`load`, (event) => {
    setN()
    console.log(`There are ${ingN} ingredients`)
    console.log(`There are ${liqN} liqours`)
    console.log(`There are ${toolN} tools`)
    console.log(`There are ${glassN} glasswears`)
  })

  function setN(){
    ingN = document.querySelectorAll(`.ingRecord`).length
    document.getElementById(`ingN`).value = ingN;
    liqN = document.querySelectorAll(`.liqRecord`).length
    document.getElementById(`liqN`).value = liqN;
    toolN = document.querySelectorAll(`.toolRecord`).length
    document.getElementById(`toolN`).value = toolN;
    glassN = document.querySelectorAll(`.glassRecord`).length
    document.getElementById(`glassN`).value = glassN;
  }

// ------- Remove and Add line functions ------------- 
  function removeLine(recordID){
    document.getElementById(`${recordID}`).remove();
    setN()
  }

function addIngLine(tableName){

    const type = document.querySelector(`#ingTypesSelect`).value;
    const nameID = document.querySelector(`#ingSelect`).value;
    const name = ingObject.data.find(ing => ing._id === nameID).name
    const quantity = document.querySelector(`#ingQuantity`).value;
    //price = Number(price).toFixed(2);

    console.log(nameID)
    console.log(name)
    console.log(ingObject)
  
  const htmlString = `
  <td class="typeColumn">
    <select disabled>
    <option value="${type}">${type}</option>
    </select>
  </td>
  <td class="ingColumn">
    <select name="ingObj${ingN}">
    <option value="${nameID}">${name}</option>
    </select>
  </td>
  <td class="quantityColumn">
    <input type="text" name="ingQnt${ingN}" value="${quantity}">
  </td>
  <td class="actionColumn">
    <a href="#" onclick="removeLine('recordIng${ingN}')" class="btn-remove">Remove</a>
  </td>
  <td class="htmlIDColumn">
    <input type="text" name="ingHtmlID${ingN}" value="${ingN}" style="display: none;">
  </td>`


  const newRow = document.createElement("tr");
  newRow.classList.add(`ingRecord`);
  newRow.setAttribute("id",`recordIng${ingN}`)
  newRow.innerHTML = htmlString;
  document.getElementById(`${tableName}`).appendChild(newRow);
  
    document.getElementById(`ingTypesSelect`).value = '';
    document.getElementById(`ingSelect`).value = '';
    document.getElementById(`ingQuantity`).value = '';
    
  setN()
  }

  function addLiqLine(tableName){

    const type = document.querySelector(`#liqTypesSelect`).value;
    const nameID = document.querySelector(`#liqSelect`).value;
    const name = liqObject.data.find(liq => liq._id === nameID).name
    const quantity = document.querySelector(`#liqQuantity`).value;
    //price = Number(price).toFixed(2);
  
  const htmlString = `
  <td class="typeColumn">
    <select disabled>
    <option value="${type}">${type}</option>
    </select>
  </td>
  <td class="liqColumn" >
    <select name="liqObj${liqN}">
    <option value="${nameID}">${name}</option>
    </select>
  </td>
  <td class="quantityColumn">
    <input type="text" name="liqQnt${liqN}" value="${quantity}">
  </td>
  <td class="actionColumn">
    <a href="#" onclick="removeLine('recordLiq${liqN}')" class="btn-remove">Remove</a>
  </td>
  <td class="htmlIDColumn">
    <input type="text" name="liqHtmlID${liqN}" value="${liqN}" style="display: none;">
  </td>`
  
  const newRow = document.createElement("tr");
  newRow.classList.add(`liqRecord`);
  newRow.setAttribute("id",`recordLiq${liqN}`)
  newRow.innerHTML = htmlString;
  document.getElementById(`${tableName}`).appendChild(newRow);
  
    document.getElementById(`liqTypesSelect`).value = '';
    document.getElementById(`liqSelect`).value = '';
    document.getElementById(`liqQuantity`).value = '';
    
  setN()
  }

  function addToolLine(tableName){

    const tool = document.querySelector(`#tools`).value;
  
  const htmlString = `
  <td class="toolColumn" >
    <select name="toolObj${toolN}">
    <option value="${tool}">${tool}</option>
    </select>
  <td class="actionColumn">
    <a href="#" onclick="removeLine('recordTool${toolN}')" class="btn-remove">Remove</a>
  </td>
  <td class="htmlIDColumn">
    <input type="text" name="toolHtmlID${toolN}" value="${toolN}" style="display: none;">
  </td>`
  
  const newRow = document.createElement("tr");
  newRow.classList.add(`toolRecord`);
  newRow.setAttribute("id",`recordTool${toolN}`)
  newRow.innerHTML = htmlString;
  document.getElementById(`${tableName}`).appendChild(newRow);
  
    document.getElementById(`tools`).value = '';
    
  setN()
  }
  
  function addGlassLine(tableName){

    const glass = document.querySelector(`#glasswear`).value;
  
  const htmlString = `
  <td class="glassColumn" >
    <select name="glassObj${glassN}">
    <option value="${glass}">${glass}</option>
    </select>
  <td class="actionColumn">
    <a href="#" onclick="removeLine('recordGlass${glassN}')" class="btn-remove">Remove</a>
  </td>
  <td class="htmlIDColumn">
    <input type="text" name="glassHtmlID${glassN}" value="${glassN}" style="display: none;">
  </td>`
  
  const newRow = document.createElement("tr");
  newRow.classList.add(`glassRecord`);
  newRow.setAttribute("id",`recordGlass${glassN}`)
  newRow.innerHTML = htmlString;
  document.getElementById(`${tableName}`).appendChild(newRow);
  
    document.getElementById(`glasswear`).value = '';
    
  setN()
  }

  document.querySelector('#liqTypesSelect').addEventListener('change', (event) =>{
    let filterList = liqObject.data.filter(res=>res.type === event.target.value)

    document.querySelector('#liqSelect').innerHTML = ''
    let htmlString = '<option value="" selected disabled hidden></option>'

    for(i=0;filterList.length>i;i++){

      htmlString += `
      <option value ="${filterList[i]._id}">${filterList[i].name}</option>`
     }
     document.querySelector('#liqSelect').innerHTML = htmlString
    console.log(filterList)
  })

  document.querySelector('#ingTypesSelect').addEventListener('change', (event) =>{
    let filterList = ingObject.data.filter(res=>res.type === event.target.value)

    document.querySelector('#ingSelect').innerHTML = ''
    let htmlString = '<option value="" selected disabled hidden></option>'

    for(i=0;filterList.length>i;i++){

      htmlString += `
      <option value ="${filterList[i]._id}">${filterList[i].name}</option>`
     }
     document.querySelector('#ingSelect').innerHTML = htmlString
    console.log(filterList)
  })


