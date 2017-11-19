const myKeyCollection =[
    new candidate("Peter Parker",700)
   ,new  candidate("Wade Winston Wilson",403)
   ,new  candidate("Bruce Wyne",251)
];
$(document).ready(function () {

initial();

});
function initial(){
let size = Object.size(myKeyCollection);
let text="";
for(let i=0;i<size;i++){
   
   text+='<div class="row">';
   text+='                <div class="col-sm-6">';
   text+='                     <p>'+myKeyCollection[i].name+'</p>';
   text+='                </div>';
   text+='                <div class="col-sm-2">';
   text+='                     <p>'+myKeyCollection[i].point+'</p>';
   text+='                </div>';
   text+='                <div class="col-sm-2">';
   text+='                     <button onclick="increaseCandidateLike('+i+')">like</button>';
   text+='                </div>';
   text+='                <div class="col-sm-2">';
   text+='                    <button onclick="deleteCandidate('+i+')">Delete</button>';
   text+='                </div>';
   text+='            </div>';
   
   console.log(myKeyCollection[i].name);
  
}
$("#myCandidateContent").html(text);

}
function createNewCandidate(){
myKeyCollection.push(new candidate($("#candidateNewName").val(),0)); 
initial(); 

}
function increaseCandidateLike(id){
myKeyCollection[id].point+=1;
initial(); 
}
function deleteCandidate(id){
console.log(id);
alert("Click the 'Close' button to delete \" "+myKeyCollection[id].name+"\"");
myKeyCollection.splice(id,1);
initial();
}

function candidate(name, point) {
this.name = name;
this.point = point;
}
Object.size = function(obj) {
let size = 0, key;
for (key in obj) {
   if (obj.hasOwnProperty(key)) size++;
}
return size;
};

