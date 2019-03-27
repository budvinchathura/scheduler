// FoodItem Class : Represents a food item
class FoodItem {
    constructor(name, restaurant, price) {
        this.name = name;
        this.restaurant = restaurant;
        this.price = price;
    }
}



// UI Class : handles UI tasks

class UI {
    static displayItems() {
        const storedItems = [
            {
                name: 'Item1',
                restaurant: 'rest1',
                price: '666'
            },
            {
                name: 'Item2',
                restaurant: 'rest1',
                price: '$$$'
            }
        ];

        const items = storedItems;
        items.forEach((item) => UI.addItemToList(item));
    }

    static addItemToList(item) {
        const list = document.querySelector('#item-list');

        const row = document.createElement('tr');

        row.innerHTML = `<td> ${item.name} </td>
        <td> ${item.restaurant}</td>
        <td> ${item.price} </td>
        <td><a href="#" class = "btn btn-danger delete">X</a></td>`


            ;


        list.appendChild(row);
    }

    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#submit-form');
        container.insertBefore(div,form);

        //vanish in 2 seconds
        setTimeout(()=>document.querySelector('.alert').remove(),2000);
    }

    static clearFields() {
        document.querySelector("#item-name").value = '';
        document.querySelector("#restaurant").value = '';
        document.querySelector("#price").value = '';
    }

    static deleteItem(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }
}

//Event: display food items

document.addEventListener('DOMContentLoaded', UI.displayItems);


//Event: Add an item
document.querySelector('#submit-form').addEventListener('submit', (e) => {
    //prevent actual submit
    e.preventDefault();

    //get form values
    const name = document.querySelector("#item-name").value;
    const restaurant = document.querySelector("#restaurant").value;
    const price = document.querySelector("#price").value;

    //validation
    if (name == "" || restaurant == "" || price == "") {
        // alert("Please fill all the fields!!!");
        UI.showAlert("Please fill all",'danger');

    } else {

        //instantiate a book
        const item = new FoodItem(name, restaurant, price);
        // console.log(item);
        UI.addItemToList(item);

        //show success
        UI.showAlert('Item Added','success')
        UI.clearFields();
    }
});

//Event remove an item
document.querySelector('#item-list').addEventListener('click', (e) => {
    // console.log(e.target)
    UI.deleteItem(e.target)

    //show message
    UI.showAlert('Item removed','danger');
});