import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { addDoc, getFirestore,collection,doc, getDocs,query,orderBy } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAXrxoJBh5VRH-q6eROzPC-PgjPe56HwE",
  authDomain: "flappy-bird-13346.firebaseapp.com",
  projectId: "flappy-bird-13346",
  storageBucket: "flappy-bird-13346.appspot.com",
  messagingSenderId: "171067932191",
  appId: "1:171067932191:web:bb912e15dd63fbc205df2a",
  measurementId: "G-EFRSN8NJ5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let playerName;
const playSong=new Audio("song.mp3")
const coinSound=new Audio("coinSound.mp3")
    // document.querySelector(".img").style.display="none"
    document.querySelector(".container").style.opacity=0.8
    document.querySelector(".container").style.backgroundColor="black"
    document.querySelector(".homepage").style.backgroundColor="black" 
    const names=document.querySelector(".name")
    const score=document.querySelector(".score")
    const finalScore=document.querySelector(".finalScore")
    const realTimeScore=document.querySelector(".realTimeScore")
    document.querySelector(".btn1").addEventListener("click",()=>{
        document.querySelector(".homepage").style.display="none" 
        playerName=document.querySelector(".nameOfPlayer").value
        
    })
    let s=0
    const bird=document.querySelector(".img")
    let birdDim = bird.getBoundingClientRect();
    const leaderBtn=document.querySelector(".leaderboard")
    const leader=document.querySelector(".leader")
    leaderBtn.addEventListener("click",()=>{
     scoreArr.reverse().forEach((e)=>{
         const div=document.createElement("div")
         div.innerHTML+=`name:${e.userName} score:${e.score}`
         leader.appendChild(div)
         leader.style.display="block"
        })
    })
    document.querySelector(".close").addEventListener("click",()=>{
        leader.style.display="none"
        
})
    const saveBtn=document.querySelector(".playagain")
    saveBtn.addEventListener("click",()=>{
     setTimeout(() => {
      location.reload()
         
     }, 3000);
     saveScore(playerName,s)
    })
    const time=9
    const g=0.3
    let gameOn=false
    document.querySelector(".playbtn").addEventListener("click",()=>{
        names.innerHTML=playerName
        start()
        gameOn=true
        document.querySelector(".img").style.display="block"
        document.querySelector(".instructions").remove()
        document.querySelector(".container").style.backgroundColor="white"
        playSong.play()
    })     

  
    

function start(){
function moveThePipes(){
    const alldiv=document.querySelectorAll(".obstacle")
    alldiv.forEach((e)=>{
        
        const get=e.getBoundingClientRect()
        if(get.right<0){
            e.remove()
        }else{
            if(birdDim.left < get.left + get.width && birdDim.left + birdDim.width > get.left && birdDim.top < get.top + get.height && birdDim.top + birdDim.height > get.top){
      document.querySelector(".finalPop").style.display="flex"
               finalScore.innerHTML=s
               playSong.pause()
               document.querySelector(".img").remove()
                stop()
            }
        }
        e.style.left=get.left-time+"px";
    })
    requestAnimationFrame(moveThePipes)
}
    
    requestAnimationFrame(moveThePipes)
    let pipeSeparation = 0;

    let pipeGap = 20;
    function createObstacle(){
      

        if(pipeSeparation > 115){
            pipeSeparation = 0;

            let pipePosition = Math.floor(Math.random() *43) + 8;
            let pipeTop = document.createElement('div');
            pipeTop.className = 'obstacle hor';
            pipeTop.style.top = pipePosition - 110 + 'vh';
            pipeTop.style.left = '100vw';

            document.body.appendChild(pipeTop);
            let pipeBottom = document.createElement('div');
            pipeBottom.className = 'obstacle vert';
            pipeBottom.style.top = pipePosition + pipeGap + 'vh';
            pipeBottom.style.left = '100vw';
            document.body.appendChild(pipeBottom);
        }
        pipeSeparation++;
        
        requestAnimationFrame(createObstacle);
    }
    requestAnimationFrame(createObstacle);
let noOfCoins=0;
let coinGap=13
function createCoins(){
    if(noOfCoins>115){
        
        noOfCoins=0
        let com=Math.random()*50
        let coinPosition = Math.floor(Math.random() *50) + 2;
        let imgElm = document.createElement('div');
        imgElm.className="coins"
        
        imgElm.style.top = coinPosition +coinGap+ 'vh';
        imgElm.style.left = 108+com+'vw';
        document.body.appendChild(imgElm);
        
    }
        noOfCoins++;
        requestAnimationFrame(createCoins)
 
}
requestAnimationFrame(createCoins)

function moveTheCoins(){

    const alldiv=document.querySelectorAll(".coins")
    alldiv.forEach((e)=>{
        const get=e.getBoundingClientRect()
        if(get.left<0){
        }else{
            if(birdDim.left < get.left + get.width && birdDim.left + birdDim.width > get.left && birdDim.top < get.top + get.height && birdDim.top + birdDim.height > get.top){
                e.remove()
                s++
                coinSound.play()
                setTimeout(() => {
                    
                    coinSound.pause()
                }, 100);
            
            score.innerHTML=s
            }
        }
        e.style.left=get.left-time+"px";
      
        
    })
    requestAnimationFrame(moveTheCoins)
}
requestAnimationFrame(moveTheCoins)
let birdHeight = 0;
const game= document.querySelector(".container").getBoundingClientRect()

function apply_gravity(){
    if(!gameOn) return;
    birdHeight = birdHeight + g;
    document.addEventListener('keydown', (e) => {
        if(e.key == 'ArrowUp'){

            birdHeight = -7.6;
        }
    });

    if(birdDim.top <= 0 || birdDim.bottom >=game.bottom){
        realTimeScore.style.display="none"
        document.querySelector(".finalPop").style.display="flex"

    
       finalScore.innerHTML=s
       document.querySelector(".highScore").innerHTML=14
        stop()
        playSong.pause()
        document.querySelector(".img").remove()
    
        return;
    }
    bird.style.top = birdDim.top + birdHeight + 'px';
    birdDim = bird.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
}
requestAnimationFrame(apply_gravity);
// let bird_dy = 0;
// function apply_gravity(){
//     if(!gameOn) return;
//     bird_dy = bird_dy + g;
//     document.addEventListener('keyup', (e) => {
//         if(e.key == 'ArrowUp' || e.key == ' '){
  
//             bird_dy = -5.6;
//         }
//     });
    


// const game= document.querySelector(".container").getBoundingClientRect()
// console.log(game);
// console.log(bird_props.bottom);
// console.log(bird_props);
//     if(bird_props.top <= 0 || bird_props.bottom >=game.bottom){
//        gameOn=false
       
    
       
//         return;
//     }
//     bird.style.top = bird_props.top + bird_dy + 'px';
//     bird_props = bird.getBoundingClientRect();
    
//     requestAnimationFrame(apply_gravity);
// }
// requestAnimationFrame(apply_gravity);
}

//pull the brid down
function stop(){
    document.querySelector(".container").style.display="none"
 
 
}


// function realTimeScore(name,score){
//     const box=document.createElement("div")
//     box.classList.add("initialScore")
//     box.innerHTML=`
//     Name:${name} <br>
//     Score:${s}
//  `
//  document.body.appendChild(box)
// }
// function once(fn, context) { 
//     var result;
//     return function() { 
//         if (fn) {
//             result = fn.apply(context || this, arguments);
//             fn = null;
//         }
//         return result;
//     };
// }
// let newFunc=once(finalShow)

async function saveScore(playerName,score){
    try {
        await addDoc(collection(db, "users"),{
           userName:playerName,
           score:score
        
        })
        
    } catch (error) {
        
        console.log(error);
    }
}
let scoreArr=[]
scoresForLeaderboard()
async function scoresForLeaderboard(){
    const ref=query(collection(db, "users"),orderBy("score"))
    const getdata=await getDocs(ref)
    getdata.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        scoreArr.push(doc.data())
      });
   
}









































