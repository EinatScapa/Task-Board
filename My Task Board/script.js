let New = document.querySelector ("#new");
let date = document.querySelector ("#date"); 
let time = document.querySelector ("#time");
let add = document.querySelector ("#save");
let clear = document.querySelector ("#clear");
let mustBtn = document.querySelector ("#mustBtn");
let mustText = document.querySelector ("#mustText");
let main = document.querySelector ("#main");
let Arr = [];

//loading data from local storage
window.onload = function(){
    if (localStorage.getItem('update')) {
        let retrievedData = JSON.parse(localStorage.getItem('update'));
        for (let i = 0; i < retrievedData.length; i++) {
            newTask(retrievedData[i].textValue, retrievedData[i].dateValue, retrievedData[i].timeValue);
        }
    }
    if (localStorage.getItem('MUST')) {
        mustText.value = localStorage.getItem('MUST');
    }
}
//add new task
add.addEventListener ('click',  function(e){
    if (New.value != "" && date.value != ""){
        newTask(New.value , date.value , time.value)}
    }
);
    
function newTask(TEXT, DATE, TIME) {
    //create new note & set style
    let note = document.createElement("div");
    note.className = "note";
    note.style.backgroundImage = noteStyle();
    main.appendChild(note);
    //create close btn
    let Xbtn = document.createElement("img");
    Xbtn.className = "Xbtn";
    Xbtn.setAttribute("src", "img/closeBTN.svg");
    note.appendChild(Xbtn);
    //insert task text
    let newText = document.createElement("div");
    newText.className = "newText";
    newText.textContent = TEXT;
    note.appendChild(newText);
    //insert date
    let newDate = document.createElement("div");
    newDate.className = "newDate";
    newDate.textContent = DATE;
    note.appendChild(newDate);
    //insert time
    let newTime = document.createElement("div");
    newTime.className = "newTime";
    newTime.textContent = TIME;
    note.appendChild(newTime);
    //set fade-in effect on note
    note.classList.add ("fadeIn");
    //clear all inputs
    Clear();

    //create random ID number
    let IDnumber = Date.now();
    note.id = IDnumber;

    //seve new note in local storsge
    let data = {
        textValue : TEXT,
        dateValue : DATE,
        timeValue : TIME,
        ID: IDnumber,
    };
    Arr.push(data);

    localStorage.setItem('update' , JSON.stringify(Arr));


    //listen to Xclose button & remove from local storage
    note.addEventListener('mouseover', function(){
        Xbtn.style.visibility = "visible";
    });
    note.addEventListener('mouseout', function(){
        Xbtn.style.visibility = "hidden";
    });
    Xbtn.addEventListener('click', function(){
        main.removeChild(note);
        Arr = JSON.parse(localStorage.getItem('update'));
        for (let i = 0; i < Arr.length; i++) {
            if (Arr[i].ID == IDnumber) {
                Arr.splice(i, 1);
                break;
            }
        };
        localStorage.setItem('update' , JSON.stringify(Arr));
    });
};

clear.addEventListener('click', function(){
    Clear();
});

//choosing random note style
function noteStyle () {
    let imgNote1 = "url('img/noteGreen.png')";
    let imgNote2 = "url('img/noteWhite.png')";
    let imgNote3 = "url('img/noteLightGrey.png')";
    let imgNote4 = "url('img/notePink.png')";
    let imgNote = [imgNote1, imgNote2, imgNote3, imgNote4];
    return imgNote[Math.floor(Math.random() * imgNote.length)];
};

//set clear function
function Clear (){
    New.value = ""; 
    date.value = "";
    time.value = "";
};

//seve must be done today to local storage
mustBtn.addEventListener('click', function(){
    localStorage.setItem('MUST' , mustText.value);
});


