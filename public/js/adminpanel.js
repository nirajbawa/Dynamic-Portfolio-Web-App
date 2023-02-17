let leftmenubar = document.getElementById("leftmenubar");
let containtbox = document.getElementById("rightmenubar");


for(let i = 0; i<leftmenubar.children.length; i++)
{
    leftmenubar.children[i].classList.add("btn"+i);
    
    leftmenubar.children[i].addEventListener('click', (e)=>{
        let ActiveBtn = document.getElementsByClassName("ActiveBtn");
      
        if(ActiveBtn.length>0)
        {
            ActiveBtn[0].classList.remove("ActiveBtn");
        }
        console.log(ActiveBtn);
        e.target.classList.add("ActiveBtn");
        

        let ActiveBox = document.getElementsByClassName("ActiveBox");
        if(ActiveBox.length>0)
        {
            ActiveBox[0].classList.remove("ActiveBox");
        }

        let getindex = e.target.classList[0].slice(3);
        document.getElementsByClassName("box"+getindex)[0].classList.add("ActiveBox");
        
        let content = document.getElementsByClassName("ActiveBox")[0].innerHTML;

        document.getElementById("mainBox").innerHTML = content;


        // console.log("box"+getindex);

    })
}


for(let i = 1; i<containtbox.children.length; i++)
{
    containtbox.children[i].classList.add("box"+(i-1));
    containtbox.children[i].style.display = "none";
}


    document.getElementsByClassName("btn0")[0].click();
