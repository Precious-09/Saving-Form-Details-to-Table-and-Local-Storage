var selectedRow = null
document.addEventListener('DOMContentLoaded', showData)
function onFormSubmit() {

    var formData = readFormData()
    if (selectedRow == null) {
        checkLocalStorage(formData.email, formData.phone, formData)


    }


    else {
        updateRecord(formData);

    }


    resetForm()
}



function readFormData() {
    var formData = {};
    formData["firstName"] = document.getElementById("fname").value;
    formData["lastName"] = document.getElementById("lname").value;
    formData["email"] = document.getElementById("email").value;
    formData["gender"] = document.getElementById("gender").value;
    formData["dob"] = document.getElementById("dob").value;
    formData["phone"] = document.getElementById("phone").value

    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("list").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.lastName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.gender;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.dob;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.phone;
    cell6 = newRow.insertCell(6);
    cell6.innerHTML = `<a onClick="onEdit(this)">Edit</a>
    <a onClick="onDelete(this)">Delete</a>`;


}

function resetForm() {
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("phone").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lname").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[3].innerHTML;
    document.getElementById("dob").value = selectedRow.cells[4].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[5].innerHTML;


    document.getElementById("list").deleteRow(selectedRow.rowIndex);


    deleteFromLocalStorage()
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.firstName;
    selectedRow.cells[1].innerHTML = formData.lastName;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.gender;
    selectedRow.cells[4].innerHTML = formData.dob
    selectedRow.cells[5].innerHTML = formData.phone

    insertNewRecord(formData)
    storeInLocalStorage()
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("list").deleteRow(row.rowIndex);
        deleteFromLocalStorage()
        resetForm();
    }
}




function storeInLocalStorage() {
    let formData

    if (localStorage.getItem('formData') === null) {
        formData = []
    } else {
        formData = JSON.parse(localStorage.getItem('formData'))
    }


    formData.push({
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        gender: document.getElementById("gender").value,
        dob: document.getElementById("dob").value,
        phone: document.getElementById("phone").value,
    })

    localStorage.setItem('formData', JSON.stringify(formData))

}


function checkLocalStorage(email, phone, formData) {
    let local =
        JSON.parse(localStorage.getItem('formData'));


    if (local != null) {
        let exist = local.find(data =>
            data.email === email || data.phone === phone
        );

        if (!exist) {

            insertNewRecord(formData)

            storeInLocalStorage()

        }

        else {
            alert("Ooopppssss... Duplicate found!!!\nYou have already signed up");
        }
    }

    else {
        insertNewRecord(formData);

        storeInLocalStorage()

    }


}


function showData() {
    let formData

    if (localStorage.getItem('formData') === null) {
        formData = []
    } else {
        formData = JSON.parse(localStorage.getItem('formData'))
    }

    console.log({ formData })


    formData.forEach(function (data) {
        var table = document.getElementById("list").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.fname;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.lname;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.email;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.gender;
        cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.dob;
        cell6 = newRow.insertCell(5);
        cell6.innerHTML = data.phone;
        cell6 = newRow.insertCell(6);
        cell6.innerHTML = `<a onClick="onEdit(this)">Edit</a>
    <a onClick="onDelete(this)">Delete</a>`;
    })

}

function deleteFromLocalStorage() {
    let formData

    if (localStorage.getItem('formData') === null) {
        formData = []
    } else {
        formData = JSON.parse(localStorage.getItem('formData'))
    }
    var removeIndex = formData.find(data =>
        data.email === email
    );
    formData.splice(removeIndex, 1)


    localStorage.setItem('formData', JSON.stringify(formData))
}

