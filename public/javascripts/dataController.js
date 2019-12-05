// Obtain Data from Database
function obtain_data() {
    fetch('/api')
        .then(response => {
            return response.json()
        })
        .then(data => {
            create_table(data);
            suggest_id(data)
            console.log(data)
        })
}

//suggest ID 
function suggest_id(data){
    let inputid = document.getElementById('inputID');
    let lastId = data[data.length - 1].id;
    inputid.value = lastId + 1;
}


// Create dynamic Table function
function create_table(data) {
    let thead = document.getElementById('tableHead');
    let headerContent = '';
    let tbody = document.getElementById('tableBody');
    let bodyContent = '';
    let dataCount = data.length;

    // This loops creates the Header for the html table
    // With the props from the json data
    for (var prop in data[0]) {
        headerContent += `<th>${prop}</th>`
    }
    thead.innerHTML = headerContent;

    //This loop fills the content of the html table
    //we need to use Object.values because our Items inside
    //the json are Objects
    for (let index = 0; index < dataCount; index++) {
        bodyContent += `<tr onclick=delete_data(${data[index].id})>`
        Object.values(data[index]).forEach(element => {
            bodyContent += `<td>${element}</td>`
        });
        bodyContent += '</tr>'
    }
    tbody.innerHTML = bodyContent;
}

// Delete Function
function delete_data(id) {
    console.log('Trying to delete ', id);
    data = { id: id }

    fetch('/api/delete',{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    obtain_data()
}

obtain_data();