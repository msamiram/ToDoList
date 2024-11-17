document.querySelector("ul").style.display = "none";

let arr = [];
let sort = 'increase';
let lastNumber = 0;
let i = 0;

document.querySelector(".main form .add button").addEventListener("click", async function (e) {
    e.preventDefault();
    let tasks = document.querySelector('.tasks');
    let input = document.querySelector('.inp');
    let li = document.createElement("li");

    let inputValue = input.value.trim();

    if (inputValue) {
        document.querySelector('ul').style.display = "block";
        let newItem = {
            content: inputValue
        };
        arr.push(newItem);
        i = arr.length;

        li.innerHTML = `<span class="val">${i}<span class="val1">${inputValue}</span></span>
             <i class="fa-regular fa-circle-xmark remove"></i>`;
        li.classList.add('no-list-style');
        input.value = '';
        tasks.appendChild(li);
        document.querySelector(".inpp").style.display = 'none';
        document.querySelectorAll("ul li").forEach(e => {
            if (e.textContent.length > 50) {
                e.classList.add("newClass");
            }
        });

        updateList();
    }
});

document.querySelector(".toggle-icon").addEventListener('click', () => {
    if (sort === 'increase') {
        arr.sort((a, b) => a.content.localeCompare(b.content, undefined, { sensitivity: 'base' }));
        sort = 'decrease';
    } else if (sort === 'decrease') {
        arr.reverse()
        sort = 'increase';
    }

    updateList();
    if (sort === 'decrease') {
        document.querySelector(".toggle-icon").classList.remove("fa-arrow-up-short-wide");
        document.querySelector(".toggle-icon").classList.add("fa-arrow-down-short-wide");
    } else {
        document.querySelector(".toggle-icon").classList.remove("fa-arrow-down-short-wide");
        document.querySelector(".toggle-icon").classList.add("fa-arrow-up-short-wide");
    }
});

document.querySelector(".main form .add .fa-plus").addEventListener('click', () => {
    document.querySelector(".inpp").style.display = 'block';
});

function updateList() {
    let itemsList = document.querySelector('.tasks');
    itemsList.innerHTML = '';

    arr.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<span  class="val">${index + 1}<span class="val1">${item.content}</span></span> 
        <i class="fa-regular fa-circle-xmark remove"></i>`;
        li.classList.add('no-list-style');
        itemsList.appendChild(li);
    });
    document.querySelectorAll("ul li").forEach(e => {
        if (e.textContent.length > 50) {
            e.classList.add("newClass");
        }
    });
}

function deletes(event) {
    if (event.target.classList.contains("remove")) {
        let index = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
        arr.splice(index, 1);
        console.log(arr);
        console.log(index);
        event.target.parentElement.remove();

        document.querySelectorAll(".tasks li").forEach((li, newIndex) => {
            li.querySelector('.val').textContent = `${newIndex + 1} ${arr[newIndex].content}`;
        });

        if (arr.length === 0) {
            document.querySelector("ul").style.display = "none";
        } else if (arr.length > 0) {
            document.querySelector("ul").style.display = "block";
        }
    }
}

document.querySelector('.my').addEventListener('click', () => {
    document.querySelector('input').value = "";
});