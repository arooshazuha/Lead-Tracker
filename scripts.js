let myLeads = []
const inputField = document.getElementById("input-field")
const inputBtn = document.getElementById("input-btn")
const ulList = document.getElementById("ulist")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
let leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromStorage){
    myLeads = leadsFromStorage
    renderLeads(myLeads)
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputField.value)
    inputField.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
})

function renderLeads(leads){
    let listItems = ""
    for(let i=0; i<leads.length; i++){
        listItems += `<li>
                        <a target="_blank" href="${leads[i]}">${leads[i]}</a>
                    </li>`
    }
    ulList.innerHTML = listItems
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderLeads(myLeads)
    })
})


deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads=[]
    renderLeads(myLeads)
})