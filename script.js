var notes=[];
var topRow=0;

function removeNoteButtonsClass(){
    for (let i=document.getElementsByClassName("note-buttons").length-1;i>=0;i--) document.getElementsByClassName("note-buttons")[i].remove();
}

function editNote(row,col,noteId){
    window.scrollTo(0, 0);
    document.getElementById("row"+topRow+"col0").innerHTML="";
    let textarea=document.createElement("textarea");
    //<textarea class="form-control form-rounded" id="NewNoteTextarea"></textarea>
    textarea.setAttribute("class","form-control form-rounded");
    textarea.setAttribute("id","NewNoteTextarea");
    let textareaNode=document.createTextNode(notes[noteId]);
    textarea.appendChild(textareaNode);
    document.getElementById("row"+topRow+"col0").appendChild(textarea);
    document.getElementById("NewNoteTextarea").focus();
    printEditButtons(noteId);
}

function printEditButtons(noteId){
    removeNoteButtonsClass();
    let btn1=document.createElement("button");
        btn1.setAttribute("class","btn note-buttons btn-success");
        btn1.setAttribute("id","saveNote");
        btn1.setAttribute("onclick","editButtonsQuestion('save',"+noteId+");");
        let node1=document.createTextNode(`✓ Update`);
        btn1.appendChild(node1);
        document.getElementById("row"+topRow+"col0").appendChild(btn1);
    let btn3=document.createElement("button");
        btn3.setAttribute("class","btn note-buttons btn-warning");
        btn3.setAttribute("id","cancelNote");
        btn3.setAttribute("onclick","editButtonsQuestion('cancel',"+noteId+");");
        let node3=document.createTextNode(`🗙 Cancel`);
        btn3.appendChild(node3);
        document.getElementById("row"+topRow+"col0").appendChild(btn3);
    let btn2=document.createElement("button");
        btn2.setAttribute("class","btn note-buttons btn-danger");
        btn2.setAttribute("id","cancelNote");
        btn2.setAttribute("onclick","editButtonsQuestion('delete',"+noteId+");");
        let node2=document.createTextNode(`🗙 Delete`);
        btn2.appendChild(node2);
        document.getElementById("row"+topRow+"col0").appendChild(btn2);
}

function printNewNoteButtons(row,column){
    removeNoteButtonsClass();
    let btn1=document.createElement("button");
        btn1.setAttribute("class","btn note-buttons btn-success");
        btn1.setAttribute("id","saveNote");
        btn1.setAttribute("onclick","saveNote("+row+","+column+");");
        let node1=document.createTextNode(`✓ Save`);
        btn1.appendChild(node1);
        document.getElementById("row"+row+"col"+column).appendChild(btn1);
    let btn2=document.createElement("button");
        btn2.setAttribute("class","btn note-buttons btn-danger");
        btn2.setAttribute("id","cancelNote");
        btn2.setAttribute("onclick","cancelNewNoteButtonQuestion("+row+','+column+");");
        let node2=document.createTextNode(`🗙 Cancel`);
        btn2.appendChild(node2);
        document.getElementById("row"+row+"col"+column).appendChild(btn2);
}

function cancelNewNoteButtonQuestion(row,column){
    removeNoteButtonsClass();
    let span=document.createElement("span");
        span.setAttribute("class","note-buttons question");
        let spanNode=document.createTextNode("Cancel creating new note?");
        span.appendChild(spanNode);
        let yesButton=document.createElement("button");
        yesButton.setAttribute("class","btn note-buttons btn-warning yesButton");
        yesButton.setAttribute("onclick","cancelNote();");
        let yesBttnNode=document.createTextNode("Yes");
        yesButton.appendChild(yesBttnNode);
        let noButton=document.createElement("button");
        noButton.setAttribute("class","btn note-buttons btn-secondary noButton");
        noButton.setAttribute("onclick","printNewNoteButtons("+row+","+column+")");
        let noBttnNode=document.createTextNode("No");
        noButton.appendChild(noBttnNode);
        document.getElementById("row"+topRow+"col0").appendChild(span);
        document.getElementById("row"+topRow+"col0").appendChild(yesButton);
        document.getElementById("row"+topRow+"col0").appendChild(noButton);
}

function editButtonsQuestion(type,noteId){
    removeNoteButtonsClass();
    let question,buttonClass,action;
    switch(type){
        case 'save':
            question="Update this note?";
            buttonClass="btn note-buttons btn-success";
            action="updateNote("+noteId+");";
            break;
        case 'cancel':
            question="Cancel updating this note?";
            buttonClass="btn note-buttons btn-warning";
            action="cancelNote();";
            break;
        case 'delete':
            question="Are you sure deleting this note?";
            buttonClass="btn note-buttons btn-danger";
            action="deleteNote("+noteId+");";
            break;
        default:
            break;};

        let span=document.createElement("span");
            span.setAttribute("class","note-buttons question");
            let spanNode=document.createTextNode(question);
            span.appendChild(spanNode);
        let yesButton=document.createElement("button");
            yesButton.setAttribute("class",buttonClass+" yesButton");
            yesButton.setAttribute("onclick",action);
            let yesBttnNode=document.createTextNode("Yes");
            yesButton.appendChild(yesBttnNode);
        let noButton=document.createElement("button");
            noButton.setAttribute("class","btn note-buttons btn-secondary noButton");
            noButton.setAttribute("onclick","printEditButtons()");
            let noBttnNode=document.createTextNode("No");
            noButton.appendChild(noBttnNode);
    
            document.getElementById("row"+topRow+"col0").appendChild(span);
            document.getElementById("row"+topRow+"col0").appendChild(yesButton);
            document.getElementById("row"+topRow+"col0").appendChild(noButton);
    }


function deleteNote(noteIdStr){
    let updatedNotes=[];
    noteId=parseInt(noteIdStr);
    for (let i=0;i<notes.length;i++){
        if (i==noteId) continue;
        updatedNotes.push(notes[i]);
    };
    if (updatedNotes.length==0) unsetCookie();
    updateCookie(updatedNotes);
}

function updateNote(noteIdStr){
    let updatedNotes=[];
    noteId=parseInt(noteIdStr);
    for (let i=0;i<notes.length;i++){
        if (i==noteId) continue;
        updatedNotes.push(notes[i]);
    };
    updatedNotes.push(document.getElementById("NewNoteTextarea").value.replace(/(\r\n|\n|\r)/gm, " "));
    updateCookie(updatedNotes);
}

function newNote(rowStr,columnStr){
    document.getElementById("info").innerHTML="";
    let row=parseInt(rowStr);
    let column=parseInt(columnStr);
    document.getElementById("newNoteButton").remove();
    let textarea=document.createElement("textarea");
    //<textarea class="form-control form-rounded" id="NewNoteTextarea"></textarea>
        textarea.setAttribute("class","form-control form-rounded");
        textarea.setAttribute("id","NewNoteTextarea");
        document.getElementById("row"+row+"col"+column).appendChild(textarea);
        document.getElementById("NewNoteTextarea").focus();
        printNewNoteButtons(row,column);
}
function cancelNote(){
    document.location.reload(false);
}

function updateCookie(tab){
    const d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    document.cookie = "notes="+tab.join("/{newNote}/,")+";expires="+d.toUTCString()+";SameSite=Strict;path=/NoteS";
    document.location.reload(false);
}

function unsetCookie(){
    const d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    document.cookie = "notes='';expires=Thu, 01-Jan-1970 00:00:01 GMT;SameSite=Strict;path=/NoteS";
    document.location.reload(false);
}

function saveNote(rowStr,columnStr){
    notes[notes.length]=document.getElementById("NewNoteTextarea").value.replace(/(\r\n|\n|\r)/gm, " ");
    updateCookie(notes);
}
function newRow(rowNum){
    let nRow=document.createElement("div");
    //<div class="row mx-md-n5 justify-content-center" id="row0">
    nRow.setAttribute("class","row mx-md-n5 justify-content-center");
    nRow.setAttribute("id","row"+rowNum);
    document.getElementById("notesContainer").prepend(nRow);
}

function appendAddButton(rowNum){
    let btn=document.createElement("button");
    btn.setAttribute("class","btn btn-primary");
    btn.setAttribute("id","newNoteButton");
    btn.setAttribute("onclick","newNote("+rowNum+","+0+");");
    let node=document.createTextNode("+");
    btn.appendChild(node);
    document.getElementById("row"+rowNum).innerHTML="";
    let columnElement=document.createElement("div");
        //<div class="col-sm justify-content-center" id="row0col0">
        columnElement.setAttribute("class","col-sm justify-content-center");
        columnElement.setAttribute("id","row"+rowNum+"col0");
        columnElement.appendChild(btn);
        document.getElementById("row"+rowNum).appendChild(columnElement);
}

function displayInfo(){
    let infoString = "<h2>Create your first note by clicking the button below!</h2><br> By doing that, you are confirming that you agree with utilising cookies files on your system by this page";
    document.getElementById("info").innerHTML=infoString;
}

function readCookie(){
    let cookieVar= document.cookie;
    cookieVar=cookieVar.substr(6,cookieVar.length);
    if (cookieVar.length<1) {
        displayInfo();
        appendAddButton(0);
        return 0;};
    let col=0;
    let row=0;
    let displayed=[];
    let repeat = true;
    notes=cookieVar.split("/{newNote}/,");
    console.log(notes);
    //such mish mash in the loop below is caused by that the notes are rendered from right to left in order of older to newer
    for (let i=2;repeat==true;i--){
        if (col==3){
            newRow(++row);
            col=0;
            i+=6;
        };
        if (i>=notes.length) continue;
        for (let j=0;j<displayed.length;j++) if (displayed[j]==i) repeat=false;
        if (repeat==false || i<0) break;
        let textarea=document.createElement("textarea");
    //<textarea class="form-control form-rounded" id="NewNoteTextarea" disabled></textarea>
        textarea.setAttribute("class","form-control form-rounded readonly");
        textarea.setAttribute("onclick","editNote('"+row+"','"+col+"','"+i+"');");
        //textarea.setAttribute("id","NewNoteTextarea");
        textarea.setAttribute("readonly","");
        //notes[i]=notes[i].replace(/\/{breakLine}\//g, "\n");
        let node=document.createTextNode(notes[i]);
        textarea.appendChild(node);
        let columnElement=document.createElement("div");
        //<div class="col-sm justify-content-center" id="row0col0">
        columnElement.setAttribute("class","col-sm justify-content-center");
        columnElement.setAttribute("id","row"+row+"col"+col);
        columnElement.appendChild(textarea);
        document.getElementById("row"+row).appendChild(columnElement);
        displayed[displayed.length]=i;
        col++;
    };
    newRow(++row);
    appendAddButton(row);
    topRow=row;

}