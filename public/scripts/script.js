function logoutButton() {
    document.getElementById(`logout`).submit();
}

function changeText() {
    document.getElementById(`inactivateUserSection`).style.display = 'none'
    document.getElementById(`confirmInactivation`).style.display = 'block'
}


axios({
    method: 'GET',
    url: '/api/ingredients',
    //params: 'URL parameters to be sent with the request'
  })
    .then(response => {
      ingObject = response
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

function filterList(table, category){

    document.querySelector(".listOver").innerHTML =''

    let apiData
    let htmlString = ''

    if(table === 'ingredient'){
        apiData = ingObject
    } else if (table === 'liquor'){
        apiData = liqObject
    } else if (table === 'drink'){
        console.log("would set apidata")
    }

    let ZapiData = apiData.data.filter(res=>res.type === category)

    for(i=0;ZapiData.length>i;i++){

     htmlString += `
    <a href="/ingredientdetails/${ZapiData[i]._id}">
    <div class="itemBox">
      <div class="listName">
      <h1>${ZapiData[i].name}</h1>
      </div>
      <div class="listImage">
      <img src="${ZapiData[i].image}" alt="" class="imageList">
      </div>
    </div>
  </a>`
    }

    document.querySelector(".listOver").innerHTML = htmlString
}
