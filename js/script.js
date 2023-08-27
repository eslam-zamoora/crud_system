

var pName = document.getElementById('productName')
var pCategory = document.getElementById('productCategory')
var pPrice = document.getElementById('productPrice')
var pDesc = document.getElementById('ProductDescription')
var sInput = document.getElementById('searchInput')
var submitButton = document.getElementById('change')

var currentIndex ;

if(JSON.parse(localStorage.getItem('allproducts'))==null){
    var productsContainer = [];
}else{
    productsContainer = JSON.parse(localStorage.getItem('allproducts'))
    display()
}

submitButton.onclick = function(){

    if(submitButton.innerHTML == 'Add product'){
         addProduct()
    }else{
         updateValues()
    }
}




function addProduct(){
    var product = {
        proName : pName.value ,
        proCategory : pCategory.value ,
        proPrice : pPrice.value ,
        proDesc : pDesc.value 
    }
    if(pnameValidation()){
        productsContainer.push(product);
        localStorage.setItem('allproducts',JSON.stringify(productsContainer))
        display()
        reset()
    }
    else{
        alert('enter right value')
    }

}
function display(){
    var frs = ``
    for(var i = 0 ; i <productsContainer.length ; i++){
        frs += `
        <tr>
                <td>${i+1}</td>
                <td id="hold">${productsContainer[i].proName}</td>
                <td>${productsContainer[i].proCategory}</td>
                <td>${productsContainer[i].proPrice}</td>
                <td>${productsContainer[i].proDesc}</td>
                <td><button class="btn btn-outline-warning" onclick="update(${i})"><i class="fa-solid fa-edit"></i></button></td>
                <td><button class="btn btn-outline-danger" onclick="deletes(${i})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        
        `
    }
    document.getElementById('adding').innerHTML = frs
}

function reset(){
    pName.value = ''
    pCategory.value = ''
    pPrice.value = ''
    pDesc.value = ''
}

function deletes(index){
    productsContainer.splice(index,1)
    localStorage.setItem('allproducts', JSON.stringify(productsContainer))
    display()
}

function searching(){
    var trs = ``
    for(var i=0 ; i <productsContainer.length; i++){
        if(productsContainer[i].proName.includes(sInput.value)){
        trs += `
        <tr>
                <td>${i+1}</td>
                <td id="hold">${productsContainer[i].proName}</td>
                <td>${productsContainer[i].proCategory}</td>
                <td>${productsContainer[i].proPrice}</td>
                <td>${productsContainer[i].proDesc}</td>
                <td><button class="btn btn-outline-warning" onclick="update(${i})"><i class="fa-solid fa-edit"></i></button></td>
                <td><button class="btn btn-outline-danger" onclick="deletes(${i})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        
        `
        document.getElementById('adding').innerHTML = trs ;
        
        var char = productsContainer[i].proName
        
        
        
        }
    }
}

function update(ind){
        currentIndex = ind
        var name = productsContainer[ind].proName
        var cat = productsContainer[ind].proCategory
        var price = productsContainer[ind].proPrice
        var desc = productsContainer[ind].proDesc
    
        pName.value = name ;
        pCategory.value = cat ;
        pPrice.value = price ;
        pDesc.value = desc ;

        
        changeclick()    
    
    }
    

    function changeclick(){
        document.getElementById('change').innerHTML = "Update Product";

    }

    function pnameValidation(){
        var regex = /[a-zA-Z](\%|\@|\$)/
        var nemo = pName.value;
        if(regex.test(nemo)==true){
            return true
        }
        else{
            return false
        }
    }
    
    function updateValues(){
        var product = {
            proName : pName.value ,
            proCategory : pCategory.value ,
            proPrice : pPrice.value ,
            proDesc : pDesc.value 
        }
        if(pnameValidation()){
            productsContainer[currentIndex] = product;
            localStorage.setItem('allproducts',JSON.stringify(productsContainer))
            display()
            reset()
        }
        else{
            alert('enter right value')
        }

        submitButton.innerHTML = 'Add product'
    }