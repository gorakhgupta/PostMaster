console.log('Hi');
//Hide the parametersBox initially 
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';
//if the users click on params , hide the Json Box 
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    let requestJsonBox = document.getElementById('requestJsonBox');
    requestJsonBox.style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})
// if the users click on Json Box  , hide the params Box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
let addedParamCount = 0;
//If the users click on + button add more paramters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `    <div class="form-row my-3">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
    <div class="col-md-6">
        <input type="text" class="form-control" id="parameterKey1" placeholder="Enter Parameter ${addedParamCount + 2} Key">
    </div>
    <div class="col-md-6">
        <input type="text" class="form-control" id="parameterValue1" placeholder="Enter Parameter ${addedParamCount + 2} Value">
    </div>
    <button id="addParam"  class="btn btn-primary deleteParam"> - </button>
</div>
    `;
    //convert the Element string to DOM node
    let paramElement = getElementFromString(string);
    console.log(paramElement);
    params.appendChild(paramElement);
    //deleting with - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            //add a confirmation box to confirm paramters deletion
            let order = confirm('Are U sure ?? to delete this '); //return true or False
            if (order == true)
                e.target.parentElement.remove();
        })
    }
    addedParamCount++;

})
//if users click on submit button 
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";

    // Fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
 
    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for debugging
    console.log('URL is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);

    // if the request type is get, invoke fetch api to create a post request
    if (requestType=='GET'){
        fetch(url, {
            method: 'GET',   
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }

    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });

    }


});

