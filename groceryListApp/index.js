import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,push,ref,onValue ,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
    databaseURL : "https://todo-a8a22-default-rtdb.asia-southeast1.firebasedatabase.app/"
}



const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsinDb = ref(database,"items")




const addbutton = document.getElementById("add-button")

const inputfield = document.getElementById("input-field")

const listItems = document.getElementById("list-items")


addbutton.addEventListener("click",function(){

    let inputVal = inputfield.value

    if(inputVal!==""){
        push(itemsinDb,inputVal)
        clearInputField()
    }
})

onValue(itemsinDb,function(snapshot){

    if(snapshot.exists()){

        let itemsArray = Object.entries(snapshot.val())

        clearList()

        for(let i=0;i<itemsArray.length;i++){
            let curItem = itemsArray[i]
            addListItem(curItem)
        }
    }
    else{
        listItems.innerHTML= "No items Here yet"
    }
})

function addListItem(currentItem){

    let itemId = currentItem[0]

    let itemName = currentItem[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemName

    newEl.addEventListener("click",function(){
        let exactLocation = ref(database,`items/${itemId}`)
        remove(exactLocation)
    })

    listItems.append(newEl)
}

function clearList(){

    listItems.innerHTML = ""

}

function clearInputField(){

    inputfield.value = ""

}


