
let debugg2 = "false";


const videoele = document.getElementById("myVideo");

let datalocal;


let changeVideo = () =>{


    let rand = Math.floor(Math.random() * keywords.length);

    fetch(`https://api.pexels.com/videos/search?query=${keywords[rand]}`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{

        datalocal = data;

        setInterval(()=>{
            let random = Math.floor(Math.random() * datalocal.videos.length);
            try{
                videoele.style.transition = "all 3s ease-out";
                videoele.src = datalocal.videos[random].video_files[datalocal.videos[random].video_files.length-4].link;
            }
            catch(e)
            {
                videoele.style.transition = "all 3s ease-out";
                videoele.src = datalocal.videos[random].video_files.link;
            }

            
            
        }, 15000);

    })
}



// changeVideo();