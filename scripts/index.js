//list for storing the task 
let tasklist = [];
let hidden = [];
//link for base container 
const container = document.getElementById("notes");
//function for saving content in the localstorage
const lsave = (t,lname) => {
  
  const obj = JSON.stringify(t);
  localStorage.setItem(lname, obj);

}
const ef="https://imgs.search.brave.com/2wqwfnIIh40LzOxYhfMP0SoyblA_ngQvPWK1-6NYTuE/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5K/QmY1bkZrRk56YmhM/NmVmZy05NE13SGFI/YSZwaWQ9QXBp";
//function for adding note 
const add = () => {
  const url = document.getElementById("image").value;
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const id = new Date().getTime();
  if(description==""||title=="")
  {
    alert("Note cannot be empty!");
  }
  else
  {newnote ({ id, url, title, category, description })
  tasklist.push({ id, url, title, category, description })
  
  lsave(tasklist,"task");}

}


const archive=(id)=>{
  const element=document.getElementById(id);
  const url=element.children[1].getAttribute("src");
  const title=element.children[2].children[0].innerHTML;
  const category=element.children[2].children[1].innerHTML;
  const description=element.children[2].children[2].innerHTML;
   
  
hidden.push({id,url,title,category,description});
console.log(hidden);
lsave(hidden,"hiddenlist");
dnote(id,"hidden");
//deleting the note


  
}


//function for adding notes 
const newnote = ({ id, url, title, category, description },def="default") => {
  const content = `
     <div class="icon justify-content-flex-end align-items-center"><button ${def=="default"?`class="btn btn-outline-warning"`:`class=d-none`} class="btn btn-outline-warning"><i class="fa-solid fa-eye-slash" id=${id} onclick="archive(${id})"></i></button><button class="btn btn-outline-success my-1"><i class="far fa-edit" id=${id} onclick="update(${id})" ></i></button><button class="btn btn-outline-danger my-1"><i class="fa-solid fa-trash-can" id =${id} onclick="dnote(${id})"></i></button></div>
     <img src="${url?url:ef}" class="card-img-top rounded   img-fluid"  id=${id + "u"} alt="image">
     <div class="card-body">
       <h5 class="card-title h6" id="${id + "t"}">${title}</h5>
       <h4 class="h6" id="${id + "c"}">${category}</h4>

       <p class="card-text" id="${id + "d"}">${description}</p>
       
     </div>
     <div class="footer"><button class="btn btn-success mb-2" id=${id + "card"} onclick="saveToOpen(${id})">Open card</button></div>
   `
  const d = document.createElement("div");
  d.classList.add("card");
  d.classList.add("m-4");
  d.classList.add("d-inline-block");
  d.classList.add("col-md-2");
  d.classList.add("col-xs-1");
  d.classList.add("notees");
  d.setAttribute("style", "width:18rem;");
  d.setAttribute("id", id);

  d.innerHTML = content
  container.append(d);


}
//link for add note button
const addnote = document.getElementById("addnote");

//function for deleting the node
const dnote = (idd,func="default") => {
  const delitem = document.getElementById(idd);
  delitem.remove();


  
  //id.parentElement.removeChild(id);


  

  const arr = document.querySelectorAll(".notees");
  tasklist.splice(0, tasklist.length);

  arr.forEach((element) => {

    if (idd != element.id) {
      const titlee = element.id + "t";
      const urle = element.id + "u";
      const descriptione = element.id + "d";
      const categorye = element.id + "c";

      const id = element.id;
      
      const title = document.getElementById(titlee).innerHTML;
      const url = document.getElementById(urle).getAttribute("src");
      const description = document.getElementById(descriptione).innerHTML;
      const category = document.getElementById(categorye).innerHTML;
      
      tasklist.push({ id, url, title, category, description });
    }

  })
 
 
  
  lsave(tasklist,"task");
  if(func="hidden")
  {
    const hide=hidden.filter((element)=>{
      if(element.id!=idd)
      return element;
    })
    lsave(hide,"hiddenlist");

    
  }



}
//edit button
const update = (id) => {
  const content = document.getElementById(id);

  //console.log(content);
  const title = document.getElementById(id + "t");
  title.contentEditable = "true";
  const url = document.getElementById(id + "u");
  url.contentEditable = "true";

  const category = document.getElementById(id + "c");
  const categorycontent = category.innerHTML;
  category.contentEditable = "true";
  category.innerHTML = categorycontent;
  const description = document.getElementById(id + "d");
  description.contentEditable = "true";
  
  const btn = document.getElementById(id + "card");
  btn.innerHTML = "Save";
  

}
//saveToOpen toggler
const saveToOpen = (id) => {
  const btn = document.getElementById(id + "card");

 
  const category = document.getElementById(id + "c").innerHTML;
    const title = document.getElementById(id + "t").innerHTML;
    const url = document.getElementById(id + "u").getAttribute("src");
    const description = document.getElementById(id + "d").innerHTML;
    const iid = new Date().getTime();
    date=new Date(iid);
    datestring=date.toString();
  if (btn.innerHTML === "Save") {
    btn.innerHTML = "Open card";
    btn.removeAttribute("data-bs-toggle");
   
    btn.removeAttribute("data-bs-target");
   
    
    tasklist.forEach((element) => {
      if (element.id == id) {
        element.id = iid;
        element.url = url;
        element.description = description;
        element.title = title;
        element.category = category;
      }
    });
    
    lsave(tasklist,"task");

  }
  else {
    btn.setAttribute("data-bs-toggle","modal");
    btn.setAttribute("data-bs-target","#displayModal");
    const modalbody=document.getElementById("modalbody");
    modalbody.innerHTML=`
    <div class="card">
    <img src="${url?url:ef}" class="card-img-top rounded   img-fluid"  id=${id + "u"} alt="image">
    <div class="card-body">
      <h5 class="card-title h6" id="${id + "t"}">${title}</h5>
      <h4 class="h6" id="${id + "c"}">${category}</h4>

      <p class="card-text text-muted" id="${id + "d"}">${description}</p>
      <p class="card-text text-muted" id="${id}">${datestring}</p>
      
    </div>
    <div>`
   
  }


}

//showarchive
let load=0;
const showarchive=(id)=>{
  if(id=='a'&&load==0)
  {document.getElementById(id).setAttribute("id","c");
  load=1;
  if(tasklist!=0)
  tasklist.forEach(({id})=>{document.getElementById(id).remove()});
  if(hidden!=0)
  {hidden.forEach((element)=>{newnote(element,"show")});}
  }
  else
  {
    document.getElementById(id).setAttribute("id","a");
  }
  
}
//loader
const loader = () => {
  const data=localStorage.getItem("task");
  const hdata=localStorage.getItem("hiddenlist");
  if(hdata!=null)
  hidden=JSON.parse(hdata);
  else
  {
    console.log("empty");
  }
 
  if(data!=null)
  { tasklist=JSON.parse(data);
   
    tasklist.forEach((element)=>{
      newnote(element);
    })
  }
  else
  console.log("no content")
   
 
  

 
}
loader();

/* const data = localStorage.getItem("task");
  if (data === null) {
    console.log("no content to display");
  }
  else {

    const tasklist = JSON.parse(data);
    

   

   
    tasklit.forEach((element) => {
      console.log(element);
      newnote(element );
      
    })
   
    
  }
*/