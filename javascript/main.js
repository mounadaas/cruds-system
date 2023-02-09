let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;







// calcul function get total
function getTotal (){
    if(price.value != ""){
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.background = '#040';
    }else{
        total.innerHTML='';
        total.style.background = '#a00d02';
    }
}
// creat product
let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}
submit.onclick =  function(){
let newPro = {
    title : title.value.toLowerCase(),
    price : price.value,
    taxes : taxes.value,
    ads : ads.value,
    discount :discount.value,
    total : total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
}
if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 100){
    if(mood === 'create'){
        if(newPro.count > 1)
        {
            //count
            for ( let i=0; i< newPro.count; i++ )
                {
                    datapro.push(newPro);
                }
        }else{
                datapro.push(newPro)
        }
    }else{
        datapro[tmp] = newPro ;
        mood = 'create';
        submit.innerHTML = "Create";
        count.style.display = "block"
    }
    clearInput();
}


// save local storeage
localStorage.setItem('product', JSON.stringify(datapro))

showData();
}





// clear inputs
function clearInput(){
    title.value ="";
     price.value="";
   taxes.value="";
    ads.value="";
    discount.value="";
   total.innerHTML= '';
   count.value="";
    category.value="";
}
// read
function showData()
{
    getTotal();
    let table ="";
    for( let i=0; i< datapro.length; i++ ){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button id="update" onclick = "update(${i})">update</button></td>
        <td><button id="delete" onclick= "delet(${i})">delete</button></td>
    </tr>
        ` 
    }
    document.getElementById("tbody").innerHTML = table;
    let deleteAll = document.getElementById('deletAll');
    if(datapro.length > 0){
        deleteAll.innerHTML= `<button onclick = "deletAll()">delete All (${datapro.length})</button>`;
    }else{
        deleteAll.innerHTML="";
    }
}
showData()
//count
// delete 
function delet(i)
{    
    datapro.splice(i,1) // delet element from array     
    localStorage.product = JSON.stringify(datapro); // delet element from local storage
    showData(); // update new element       
}
// delet all
function deletAll(){
    
    localStorage.clear(); 
    datapro.splice(0);
    showData();
}
// update
function update(i) {
    title.value =  datapro[i].title;
    price.value =  datapro[i].price;
    taxes.value =  datapro[i].taxes;
    ads.value =  datapro[i].ads;
    discount.value =  datapro[i].discount;
    category.value =  datapro[i].category;
    getTotal ();
    count.style.display = 'none';
    submit.innerHTML = 'Update'
    mood = 'update';
    tmp = i;
    scroll({
        top :0,
        behavior :"smooth"
    })
}
// search
let searchMood = 'title';
function getserch(id){
    let search = document.getElementById('search')
    if( id == "searchTitle"){
        searchMood = 'title';
        search.placeholder = 'Search By Title'
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By Category'
    }
    search.focus()
    search.value ="";
    showData()
}

function searchData(value)
{
    let table ="";
    for(let i=0; i< datapro.length; i++)
    {
        if( searchMood == 'title')
        {
            if(datapro[i].title.includes(value.toLowerCase()))
            {
                table += `
        <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button id="update" onclick = "update(${i})">update</button></td>
            <td><button id="delete" onclick= "delet(${i})">delete</button></td>
        </tr>
                ` ;
            }
        }else{
            if(datapro[i].category.includes(value.toLowerCase()))
            {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button id="update" onclick = "update(${i})">update</button></td>
                        <td><button id="delete" onclick= "delet(${i})">delete</button></td>
                    </tr>
                    ` ;
            }
        }
    }   
document.getElementById("tbody").innerHTML = table;
}
// clean Data
// condustion of nput data