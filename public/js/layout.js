


// nav bar logo  animation 
let left = document.getElementById("leftH1");
left.addEventListener("mouseover", changeColor);
function changeColor() {
  let lefta = document.getElementById("lefta");
  lefta.style.color = "#00e5ff";
  let niraj = document.getElementById("niraj");
  niraj.style.color = "#00e5ff";
}

left.addEventListener("mouseout", normal);

function normal() {
  let lefta = document.getElementById("lefta");
  lefta.style.color = "white";
  let niraj = document.getElementById("niraj");
  niraj.style.color = "white";
}


// rigth click and and clip board block function

document.addEventListener("contextmenu", (evt) => {
  evt.preventDefault();
}, false);

document.addEventListener("copy", (evt) => {
  // (B1) CHANGE THE COPIED TEXT IF YOU WANT
  evt.clipboardData.setData("text/plain", "Copying is not allowed on this webpage");

  // (B2) PREVENT THE DEFAULT COPY ACTION
  evt.preventDefault();
}, false);





// mobile menu nav bar animation


// nav bar open animation 

let getbtn = document.getElementById("meubtn");
let getnav = document.getElementById("navbar");
let getright = document.getElementById("right");
let getmenuicon = document.getElementById("menuicon");
let getnatool = document.getElementById("fp-nav");

let btnStatus = "off";


getbtn.addEventListener("mousedown", openmenu);


function openmenu() {
  if (btnStatus == "off") {
    getright.style.display = "block";
    getnav.style.transition = "all 0.30s linear";
    getnav.style.height = "100%";
    getmenuicon.style.animation = " rotation 0.7s linear"
  }
}

getbtn.addEventListener("mouseup", openmenu2);


function openmenu2() {
  if (btnStatus == "off") {
    getright.style.animation = "openmenu  0.5s";
    getright.style.animationFillMode = "forwards";
    getright.style.transition = "all 1s linear";
    getnav.style.backgroundColor = "rgba(0,0,0,0.9)";
    getmenuicon.style.animation = " rotation 0.6s linear";
    setTimeout(openami, 800);
    btnStatus = "on";
  }
  else {
    getmenuicon.style.animation = "rotation-opposite 0.6s linear";
    getright.style.animation = "menuclose  0.5s";
    setTimeout(closingfunc, 800)
  }
}


function closingfunc() {
  getnav.style.height = "";
  getnav.style.backgroundColor = "";
  getright.style.display = "none";
  getnav.style.transition = "";
  getright.style.animationFillMode = "";
  right.setAttribute("style", "");
  getmenuicon.className = getmenuicon.className.replace("fa fa-close", "fa fa-bars");
  btnStatus = "off";
}

function openami() {
  getmenuicon.className = getmenuicon.className.replace("fa fa-bars", "fa fa-close");
}






// swipe detect to open  menu

let getwinwidth;





function swipemenu() {


  let getdirection;
  let statuscheckbtn;


  $(function () {
    //Enable swiping...
    $("#fullpage").swipe({
      //Generic swipe handler for all directions
      swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        // console.log(direction);
        getdirection = direction;

        if (direction == "right") {
          statuscheckbtn = 0;
          if (btnStatus == "off") {
            if (getwinwidth < 750) {
              let getactivesection = document.getElementsByClassName("active");
              if(getactivesection[getactivesection.length-1].id!="navbtn3"  && getactivesection[getactivesection.length-1].id!="navbtn4" && getactivesection[getactivesection.length-1].id!="navbtn5")
              {
                openmenu();
                openmenu2();
              }
            }
          }
        }

      },
      //Default is 75px, set to 0 for demo so any distance triggers swipe
      threshold: 30
    });
  });




  $(function () {
    //Enable swiping...
    $("#right").swipe({
      //Generic swipe handler for all directions
      swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        // console.log(direction);
        getdirection = direction;
        if (statuscheckbtn == 0) {

          if (direction == "left") {
            if (btnStatus == "on") {
              openmenu2();
            }
          }

        }

      },
      //Default is 75px, set to 0 for demo so any distance triggers swipe
      threshold: 30
    });
  });

}

// check mobile menu is on or off


function checksize() {

  getwinwidth = window.outerWidth;
  if (getwinwidth < 750) {

    $('.owl-carousel').owlCarousel({
		items:5,
		loop:true,
		margin:0,
		margin:0,
		center:true,
		stagePadding: 0,
		rtl:true,
		merge:true,
		responsiveClass:true,
		responsive:{
			1000:{
				items:1,
				margin:0,
				center:true,
			}
		}
	})

    swipemenu();
  }

}





// Add active class to the section in navbar (highlight it)

let getactiveid = document.getElementById("fp-nav");
let changeid1 = getactiveid.children[0].children[0].children[0].id = "navbtn1";
let changeid2 = getactiveid.children[0].children[1].children[0].id = "navbtn2";
let changeid3 = getactiveid.children[0].children[2].children[0].id = "navbtn3";
let changeid4 = getactiveid.children[0].children[3].children[0].id = "navbtn4";
let changeid5 = getactiveid.children[0].children[4].children[0].id = "navbtn5";
let changeid6 = getactiveid.children[0].children[5].children[0].id = "navbtn6";
let changeid7 = getactiveid.children[0].children[6].children[0].id = "navbtn7";

//add active to menu

var header = document.getElementById("menulist");

var btns = header.getElementsByClassName("ulli");

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementById("acli");
    current.id = current.id.replace("acli", "");

    this.id += "acli";
    setTimeout(changetab, 500);
    clearInterval(intterval);

  });
}


function changetab() {
  let getactiveid = document.getElementById("acli");
  let getinntext = getactiveid.innerText;
  if (getinntext == "About") {
    document.getElementById("navbtn2").click();
  }
  else if (getinntext == "Home") {
    closingfunc();
    document.getElementById("navbtn1").click();
  }
  else if (getinntext == "Interpersonal Skills") {
    closingfunc();
    document.getElementById("navbtn3").click();
  }
  else if (getinntext == "Techanical Skills") {
    closingfunc();
    document.getElementById("navbtn4").click();
  }
  else if (getinntext == "Projects") {
    closingfunc();
    document.getElementById("navbtn5").click();
  }
  else if (getinntext == "Experience") {
    closingfunc();
    document.getElementById("navbtn6").click();
  }
  else if (getinntext == "Contact") {
    closingfunc();
    document.getElementById("navbtn7").click();
  }
  intterval = setInterval(checkactivation, 1000);
}



// let getactivesection = document.getElementsByClassName("active")
// let getactivetext = getactivesection[1].children[0].innerText.toLowerCase()
// let getmenulist = document.getElementById("menulist");

let gettoolnavout = document.getElementById("fp-nav");
for(let i = 0; i<7; i++)
{
  gettoolnavout.children[0].children[i].children[0].children[1].style.transition  = "color 2s linear";
}
 




function checkactivation() {
  let getmenulist1 = document.getElementById("menulist");
  var current = document.getElementById("acli");
  let intterval;
  let getnavbar = document.getElementById("navbar");
  let gettoolnav = document.getElementById("fp-nav");
  let left = document.getElementById("left");

  let getchekc = fullpage_api.getActiveSection();


  if (getchekc.item.id == "home") {
        
    for (let i = 0; i < 7; i++) {
      gettoolnav.children[0].children[i].children[0].children[1].style.backgroundColor = "";
    }

    current.id = current.id.replace("acli", "");
    getmenulist1.children[0].id = "acli";
    if(getwinwidth>750)
    {
    getnavbar.style.backgroundColor = "transparent";
    }
    else if(getwinwidth<750)
    {
      left.style.backgroundColor = "transparent";
    }

    document.getElementsByTagName("footer")[0].style.display = "flex";

  }
  else if (getchekc.item.id == "about") {

    for (let i = 0; i < 7; i++) {
      if (i == 1) {
        continue;
      }
      gettoolnav.children[0].children[i].children[0].children[1].style.backgroundColor = "black";
    }


    current.id = current.id.replace("acli", "");
    getmenulist1.children[1].id = "acli";

    if(getwinwidth>750)
    {
      getnavbar.style.backgroundColor = "black";
    }
    else if(getwinwidth<750)
    {
      left.style.backgroundColor = "black";
    }

    document.getElementsByTagName("footer")[0].style.display = "none";
    

  }
  else if (getchekc.item.id == "interpersonalSkills") {


        
    for (let i = 0; i < 7; i++) {
      gettoolnav.children[0].children[i].children[0].children[1].style.backgroundColor = "";
    }


    if(getwinwidth>750)
    {
      getnavbar.style.backgroundColor = "black";
    }
    else if(getwinwidth<750)
    {
      left.style.backgroundColor = "black";
    }


    current.id = current.id.replace("acli", "");
    getmenulist1.children[2].id = "acli";

    document.getElementsByTagName("footer")[0].style.display = "flex";
  }
  else if (getchekc.item.id == "professionalSkills") {


        
    for (let i = 0; i < 7; i++) {
      if (i == 3) {
        continue;
      }
      gettoolnav.children[0].children[i].children[0].children[1].style.backgroundColor = "";
    }


    if(getwinwidth>750)
    {
      getnavbar.style.backgroundColor = "black";
    }
    else if(getwinwidth<750)
    {
      left.style.backgroundColor = "black";
    }

    current.id = current.id.replace("acli", "");
    getmenulist1.children[3].id = "acli";

    document.getElementsByTagName("footer")[0].style.display = "flex";
    
  }
  else if (getchekc.item.id == "projects") {


        
    for (let i = 0; i < 7; i++) {
      gettoolnav.children[0].children[i].children[0].children[1].style.backgroundColor = "";
    }


    if(getwinwidth>750)
    {
      getnavbar.style.backgroundColor = "black";
    }
    else if(getwinwidth<750)
    {
      left.style.backgroundColor = "black";
    }

    current.id = current.id.replace("acli", "");
    getmenulist1.children[4].id = "acli";

    document.getElementsByTagName("footer")[0].style.display = "flex";
  }
  else if (getchekc.item.id == "certificates") {


        
    for (let i = 0; i < 7; i++) {
      if (i == 5) {
        continue;
      }
      gettoolnav.children[0].children[i].children[0].children[1].style.backgroundColor = "black";
    }

    if(getwinwidth>750)
    {
      getnavbar.style.backgroundColor = "black";
    }
    else if(getwinwidth<750)
    {
      left.style.backgroundColor = "black";
    }

    document.getElementsByTagName("footer")[0].style.display = "none";

    current.id = current.id.replace("acli", "");
    getmenulist1.children[5].id = "acli";
  }
  else if (getchekc.item.id == "contact") {

    for (let i = 0; i < 7; i++) {
      gettoolnav.children[0].children[i].children[0].children[1].style.backgroundColor = "";
    }

    if(getwinwidth>750)
    {
      getnavbar.style.backgroundColor = "black";
    }
    else if(getwinwidth<750)
    {
      left.style.backgroundColor = "black";
    }

    document.getElementsByTagName("footer")[0].style.display = "flex";

    current.id = current.id.replace("acli", "");
    getmenulist1.children[6].id = "acli";
  }
}


window.onload = function () {
  intterval = setInterval(checkactivation, 1000);
  // swipe feature call 
    checksize();
     
}



// mobile menu animation



let ulli = document.getElementsByClassName("ulli");

let borderele = document.getElementsByClassName("borderele");

let getliid = document.getElementById("acli");


//  add active boarder


function addActiveBoarder() {


  ulli[0].addEventListener("mouseover", changewidthhover0);


  for (let setitem = 0; setitem < ulli.length; setitem++) {
    ulli[setitem].addEventListener("click", changewidthhoverout0);
  }

  for (let setitem = 0; setitem < ulli.length; setitem++) {
    ulli[setitem].addEventListener("click", changewidthhoverout1);
  }

  for (let setitem = 0; setitem < ulli.length; setitem++) {
    ulli[setitem].addEventListener("click", changewidthhoverout2);
  }

  for (let setitem = 0; setitem < ulli.length; setitem++) {


    ulli[setitem].addEventListener("click", changewidthhoverout3);
  }

  for (let setitem = 0; setitem < ulli.length; setitem++) {
    ulli[setitem].addEventListener("click", changewidthhoverout4);
  }

  for (let setitem = 0; setitem < ulli.length; setitem++) {
    ulli[setitem].addEventListener("click", changewidthhoverout5);
  }

  for (let setitem = 0; setitem < ulli.length; setitem++) {
    ulli[setitem].addEventListener("click", changewidthhoverout6);
  }


}

addActiveBoarder();

// hover 0

function changewidthhover0() {
  if (ulli[0].id == "acli") {
    borderele[0].style.animation = "";
    borderele[0].style.animationFillMode = "";
  }
  else {
    borderele[0].style.animation = " widthchange 0.3s";
    borderele[0].style.animationFillMode = "forwards";
  }

}

//hover out
ulli[0].addEventListener("mouseout", changewidthhoverout0);

function changewidthhoverout0() {
  if (ulli[0].id == "acli") {
    borderele[0].style.animation = "";
    borderele[0].style.animationFillMode = "";
  }
  else {
    borderele[0].style.animationFillMode = "";
    borderele[0].style.animation = "hoveroutwidtchange 0.5s";
  }
}




// hover 1

ulli[1].addEventListener("mouseover", changewidthhover1);


function changewidthhover1() {
  if (ulli[1].id == "acli") {
    borderele[1].style.animation = "";
    borderele[1].style.animationFillMode = "";
  }
  else {
    borderele[1].style.animation = "widthchange 0.3s";
    borderele[1].style.animationFillMode = "forwards";
  }
}


//hover out
ulli[1].addEventListener("mouseout", changewidthhoverout1);

function changewidthhoverout1() {
  if (ulli[1].id == "acli") {
    borderele[1].style.animation = "";
    borderele[1].style.animationFillMode = "";
  }
  else {
    borderele[1].style.animationFillMode = "";
    borderele[1].style.animation = "hoveroutwidtchange 0.5s";
  }
}

//



// hover 2

ulli[2].addEventListener("mouseover", changewidthhover2);


function changewidthhover2() {
  if (ulli[2].id == "acli") {
    borderele[2].style.animation = "";
    borderele[2].style.animationFillMode = "";
  }
  else {
    borderele[2].style.animation = " widthchange 0.3s";
    borderele[2].style.animationFillMode = "forwards";
  }
}


//hover out
ulli[2].addEventListener("mouseout", changewidthhoverout2);

function changewidthhoverout2() {
  if (ulli[2].id == "acli") {
    borderele[2].style.animation = "";
    borderele[2].style.animationFillMode = "";
  }
  else {
    borderele[2].style.animationFillMode = "";
    borderele[2].style.animation = "hoveroutwidtchange 0.5s";
  }
}

//

// hover 3

ulli[3].addEventListener("mouseover", changewidthhover3);


function changewidthhover3() {
  if (ulli[3].id == "acli") {
    borderele[3].style.animation = "";
    borderele[3].style.animationFillMode = "";
  }
  else {

    borderele[3].style.animation = " widthchange 0.3s";
    borderele[3].style.animationFillMode = "forwards";
  }
}


//hover out
ulli[3].addEventListener("mouseout", changewidthhoverout3);



function changewidthhoverout3() {
  if (ulli[3].id == "acli") {
    borderele[3].style.animation = "";
    borderele[3].style.animationFillMode = "";
  }
  else {
    borderele[3].style.animationFillMode = "";
    borderele[3].style.animation = "hoveroutwidtchange 0.5s";
  }
}




// hover 4

ulli[4].addEventListener("mouseover", changewidthhover4);


function changewidthhover4() {
  if (ulli[4].id == "acli") {
    borderele[4].style.animation = "";
    borderele[4].style.animationFillMode = "";
  }
  else {
    borderele[4].style.animation = " widthchange 0.3s";
    borderele[4].style.animationFillMode = "forwards";
  }
}


//hover out
ulli[4].addEventListener("mouseout", changewidthhoverout4);

function changewidthhoverout4() {
  if (ulli[4].id == "acli") {
    borderele[4].style.animation = "";
    borderele[4].style.animationFillMode = "";
  }
  else {
    borderele[4].style.animationFillMode = "";
    borderele[4].style.animation = "hoveroutwidtchange 0.5s";
  }
}

//



// hover 5

ulli[5].addEventListener("mouseover", changewidthhover5);


function changewidthhover5() {
  if (ulli[5].id == "acli") {
    borderele[5].style.animation = "";
    borderele[5].style.animationFillMode = "";
  }
  else {
    borderele[5].style.animation = " widthchange 0.3s";
    borderele[5].style.animationFillMode = "forwards";
  }
}


//hover out
ulli[5].addEventListener("mouseout", changewidthhoverout5);

function changewidthhoverout5() {
  if (ulli[5].id == "acli") {
    borderele[5].style.animation = "";
    borderele[5].style.animationFillMode = "";
  }
  else {
    borderele[5].style.animationFillMode = "";
    borderele[5].style.animation = "hoveroutwidtchange 0.5s";
  }
}



// hover 6

ulli[6].addEventListener("mouseover", changewidthhover6);


function changewidthhover6() {
  if (ulli[6].id == "acli") {
    borderele[6].style.animation = "";
    borderele[6].style.animationFillMode = "";
  }
  else {
    borderele[6].style.animation = " widthchange 0.3s";
    borderele[6].style.animationFillMode = "forwards";
  }
}


//hover out
ulli[6].addEventListener("mouseout", changewidthhoverout6);

function changewidthhoverout6() {
 
  if (ulli[6].id == "acli") {
    borderele[6].style.animation = "";
    borderele[6].style.animationFillMode = "";
  }
  else {
    borderele[6].style.animationFillMode = "";
    borderele[6].style.animation = "hoveroutwidtchange 0.5s";
  }
}



// console.log(getsection.item.id)







