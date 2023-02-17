

const debugg = "flase";


const mainTextspan = document.getElementById("mainTextspan");
let interval;

if (debugg == "true") {
    console.log(text.length);
}



function repeat1() {
    interval = setInterval(addText, 1600);
    let i = -1;

    function addText() {
        i += 1;
        mainTextspan.innerHTML = text.slice(0, i);

        if (debugg == "true") {
            console.log(text.slice(0, i));

        }

        if (i == text.length) {
            clearInterval(interval);
            setTimeout(textReverse, 2000);
        }
    }

}

repeat1();


function textReverse() {
    let interval1 = setInterval(textchange, 1600);
    let x = 10;

    function textchange() {
        x = x - 1
        mainTextspan.innerHTML = text.slice(0, x);
        if (debugg == "true") {
            console.log(text.slice(0, x));
        }

        if (x == 0) {
            clearInterval(interval1);
            setTimeout(repeat1, 5000);
        }
    }
}

function aboutani() {
    let socialicon = document.getElementsByClassName("absocial1");
    for (let i = 0; i < socialicon[0].children[0].length; i++) {
        socialicon[0].children[0].children[i].addEventListener("click", function () {
            this.children[i].style.color = "#00e5ff";
        });
    }
}

aboutani();

let createOptions = (value) => {
    let option = document.createElement("option");
    option.innerText = "+"+value;
    option.value = value;
    return option;
}

let sortAsc = (a, b) => {
    return a - b;
}

function setCountryCode() {
    let select = document.getElementById("countrycode");

    fetch("https://restcountries.com/v2/all")
        .then((response) => {
            return response.json();
        }).then((data) => {

            let array = data.map(value => {
                return Number.parseInt(value.callingCodes[0]);
            });


            array.sort(sortAsc);

            function removeDuplicates(arr) {
                return arr.filter((item,
                    index) => arr.indexOf(item) === index);
            }

            let mainArr = removeDuplicates(array);

            mainArr.forEach(value => {
                let option = createOptions(value);
                select.appendChild(option);
            });


        })
}

let setFormcolors = ()=>{
    let colors = ['#ffd3d3','#ffe1d3','#ffefd3','#fffad3','#f8ffd3','#e2ffd3','#dcffd3','#d3ffd6','#d4ffd3','#d3ffd8','#d3ffe7','#d3fff1','#d3fff7','#d3ffff','#d3f1ff','#d3e7ff','#d3d8ff','#d8d3ff','#e2d3ff','#f0d3ff','#f8d3ff','#ffd3f8','#ffd3eb','#ffd3e1','#ffd3d3','#ffd3d3'];

    let container = document.getElementsByClassName("form-floating");
    
    let i = 0;

    setInterval(()=>{
        container[0].firstElementChild.style.backgroundColor = colors[i];
        container[1].style.backgroundColor = colors[i];
        container[2].firstElementChild.style.backgroundColor = colors[i];
        container[3].firstElementChild.style.backgroundColor = colors[i];
        i++
        if(i==colors.length)
        {
            i = 0;
        }
    }, 1000);
}


let endLoading = () =>{
    setTimeout(() => {
        let getloader = document.getElementById("loadingAni");
        getloader.style.display = "none";
    }, 5000);
}

endLoading();


setFormcolors();
setCountryCode();