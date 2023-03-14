console.log("contact");

let from = document.getElementById("contactform");

from.addEventListener("submit", async(e) => {
    e.preventDefault();
    let newData = new FormData(e.target);
    let data = {}
    newData.forEach((value, key) => (data[key] = value));
    let s = await sendForm(data);
    if(s!==false)
    {
        alert(s);
    }
    e.target.reset();
    
});


let sendForm = async (data) => {
    try{
        let res = await fetch("/contact", {
            method: "POST", headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }, body: new URLSearchParams(data)
        });
        let rdata = await res.json();
        return rdata.Msg;
    }
    catch{
        return false;
    }
}