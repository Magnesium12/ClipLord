//import electron from "./preload.js"
// from 'electron' im {} = require("electron")
const {clipboard}  = require('electron')
const axios = require('axios').default;

var user_name = "test_user1"    //WIP
//clipboard.clear()
function copy_text(text){
    clipboard.clear()
    clipboard.writeText(text);
}

function paste_text(){
    document.getElementById("ptext").value = clipboard.readText()
}

async function get_copied_data(username){
    console.log("get_copied_data runs")
    await axios({
        method: "get",
        url: 'http://127.0.0.1:5000/paste',
        headers: { "Content-Type": "application/json", "Username":username }
    })
    .then(function (response){
        let data = response.data
        console.log("data recieved: ",data)
        document.getElementById("copied").innerHTML = 'Previously copied data:'
        document.getElementById("copied").appendChild(document.createElement("br"));
        data.forEach((element) => {
            document.getElementById("copied").appendChild(document.createTextNode(element))
            let bt = document.createElement("button")
            bt.name = "copy"
            bt.innerHTML = "Copy"
            bt.onclick = ()=>{
                clipboard.clear()
                clipboard.writeText(element);
            }
            document.getElementById("copied").appendChild(bt);
            document.getElementById("copied").appendChild(document.createElement("br"));
        });
    })
    .catch(function (error) {
        console.log(error);
    })
    console.log("get_copied_data compl")
}

async function send_save_req(text){
    console.log("send_save_req runs")
    clipboard.clear()
    clipboard.writeText(text);
    //console.log("copied text: ",clipboard.readText())
    //document.getElementById("ctext").value = clipboard.readText()
    var to_send = { "text": text }
    
    await axios({
        method: "post",
        url: 'http://127.0.0.1:5000/copy',
        data: JSON.stringify(to_send),
        headers: { "Content-Type": "application/json", "Username":user_name },
    })
    .then(function (response) {
     console.log("It says: ", (response.data));
    })
    .catch(function (error) {
    console.log(error);
    })

    console.log("send_save_req compl")
}

async function save_text(){
    let text = document.getElementById('text').value
    await send_save_req(text)
    get_copied_data(user_name)
}

document.addEventListener("copy",async function(e){
    let text = document.getSelection().toString()
    await send_save_req(text)
    get_copied_data(user_name)
})