document.querySelectorAll('.card-wrapper').forEach(wrapper => {
    const cards = wrapper.querySelector('.cards');
    wrapper.querySelector('.arrow.leftArr').addEventListener('click', () => {
        cards.scrollLeft -= 560;
    });
    wrapper.querySelector('.arrow.rightArr').addEventListener('click', () => {
        cards.scrollLeft += 560;
    });
});


// -----------------------------------------------------

scrollArea = document.querySelector(".scroller-left");

function mouseEnter(){
    scrollArea.classList.add("scroll");
}

function mouseLeave() {
    scrollArea.classList.remove("scroll");
}


scrollArea.addEventListener('mouseenter', mouseEnter);
scrollArea.addEventListener('mouseleave', mouseLeave);

document.querySelectorAll(".item2").forEach(item => {
    item.insertAdjacentHTML("afterbegin", `
        <img src="play.svg" class="play">
    `);
}); 

playbtn = document.querySelectorAll(".play");
music = document.getElementsByClassName("music");
cancelbtn = document.getElementsByClassName("cross");

// -----------------------------------------------------
async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/mp3/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href);
        }
    }
    

    return songs;
}

async function main(){
    
    let songs = await getSongs();
    console.log(songs);

    var audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener("loadeddata", ()=>{
        let duration = audio.duration;
        console.log(duration, audio.currentSrc, audio.currentTime)
    })
}


music[0].classList.add("none");


playbtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        main();
        music[0].classList.remove("none");
    })
})

cancelbtn[0].addEventListener("click", ()=>{
    music[0].classList.add("none");
})  