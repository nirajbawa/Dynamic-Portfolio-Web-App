let flag = -1;

document.body.onload = async() =>{

        try{
            if(flag==1)
            {
                document.getElementById("mainimgbox").innerHTML = "";
                flag = -1;
            }
            console.log("hii");
            let data = await fetch("/admin/panel/settings/uploader");
            let parsedData = await data.json();
            console.log(parsedData);
            setimages(parsedData.images);
            flag = 1;
        }
        catch(error){
            console.error(error);
        }

        
         


    
    let form = document.getElementById("imguplodaform");

    form.addEventListener("submit", uplodaImage);

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };
   

};


let createImages = (name, i) =>{
    let images = document.createElement("img");
    images.src = `http://res.cloudinary.com/dcb6xqdug/image/upload/v1676822178/${name}`;

    let divimg = document.createElement("div");
    divimg.className = "imgdiv";
    divimg.append(images);

    let div = document.createElement("div");
    div.tabIndex=i;

    div.classList = "imgbox";
    div.id = i;
    let indiv = document.createElement("div");
    indiv.className = "sdbtns";
    let btns = document.createElement("button");
    btns.className = "btns";
    btns.innerHTML = "<img src='/images/webGrafics/select.png'>";
    let btnd = document.createElement("button");
    btnd.className = "btnd";
    btnd.innerHTML = "<img src='/images/webGrafics/delete.png'>";

    

    indiv.appendChild(btns);
    indiv.appendChild(btnd);

    div.appendChild(divimg);
    div.appendChild(indiv);
    return div;
}

let setimages = (data) =>{
    let uploaderHome = document.getElementById("mainimgbox");
    console.log(uploaderHome);
    for(let i = 0; i<data.length; i++)
    {
        let element = createImages(data[i], i);
        uploaderHome.appendChild(element);
    }

    setbtnEvents();
    // setEvent(uploaderHome)
}

let setbtnEvents = () =>{
    let btns = document.getElementsByClassName("btns");
    console.log(btns);
    let btnd = document.getElementsByClassName("btnd");
    console.log(btnd);
    
    for(let i = 0; i<btns.length; i++)
    {
        // console.log(btns[i]);
        console.log( btns[i].firstElementChild);
        btns[i].firstElementChild.addEventListener("click", (e)=>{
            let element = e.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.src;
            console.log(element.slice(sl));
            let input = document.getElementById("imgName");
            input.value = element.slice(sl);
        });
        
    }

    for(let i = 0; i<btnd.length; i++)
    {
        // console.log(btns[i]);
        btnd[i].lastElementChild.addEventListener("click", (e)=>{
            let element = e.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.src;
            console.log(element.slice(sl));
            let con = confirm("do you want to delete " + element.slice(sl));
            if(con)
            {
                deleteImg(element.slice(sl+18), e.target.parentElement.parentElement.parentElement);
            }  
        });
        
    }

}




let uplodaImage = async(e) =>{
    e.preventDefault();
    console.log(e.target);
    let newfrom = new FormData(e.target);
    console.log(newfrom);
    try{

        document.getElementById("mainimgbox").innerHTML = "";
        let send = await fetch("/admin/panel/settings/uploader", {method:"POST", body:newfrom});
        let res = await send.json();
        console.log((res));
        e.target.reset();
        let altbox = document.getElementById("alertupimg");
        altbox.classList.add("show");
        altbox.innerText = res.msg;
        try{
            console.log("hii");
            let data = await fetch("/admin/panel/settings/uploader");
            let parsedData = await data.json();
            console.log(parsedData);
            setimages(parsedData.images);
        }
        catch(error){
            let altbox = document.getElementById("alertupimg");
            altbox.classList.add("show");
            altbox.innerText = error.msg;
            console.error(error);
        }

    }
    catch(e){
        console.log(e);
    }
}


let deleteImg = async (imgName, id) =>{
    console.log(imgName);
    try{
        let deleteReq = await fetch(`/admin/panel/settings/uploader/${imgName}`, {method:"DELETE"});
        let deleteRes = await deleteReq.json();
        id.style.display = "none";
    }
    catch(e)
    {
        console.log(e);
    }
    
    
}