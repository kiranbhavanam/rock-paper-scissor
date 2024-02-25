let score=JSON.parse(localStorage.getItem('score')) || {
  //same name score??
    wins:0,
    losses:0,
    tie:0
};
//console.log(JSON.stringify(score));
displayRes();
document.querySelector('.js-rock')
  .addEventListener('click',()=>{playGame('rock')});
document.querySelector('.js-paper')
  .addEventListener('click',()=>{playGame('paper')});
document.querySelector('.js-scissors')
  .addEventListener('click',()=>{playGame('scissors')});
document.querySelector('.js-resetscore')
  .addEventListener('click',()=>{resetScore()});
document.querySelector('.js-autoplay')
  .addEventListener('click',()=>{playAuto()});

document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r')
      playGame('rock');
    else if(event.key==='p')
      playGame('paper');
    else if(event.key==='s')
      playGame('scissors');
  })
function playGame(user){
  var comp=pickComp();
  if(user==='rock'){
    if(comp==="rock")
      result='draw';
    else if(comp==="scissors")
      result='win';
    else  
      result='lose'
  }
  else if(user==='paper'){
    if(comp==="rock")
      result='win';
    else if(comp==="scissors")
      result='lose';
    else  
      result='draw'
  }
  else{
    if(comp==="rock")
      result='lose';
    else if(comp==="scissors")
      result='draw';
    else  
      result='win'
  }
  if(result==='win')
    score.wins++;
  else if(result==='lose')
    score.losses++;
  else
    score.tie++;
  localStorage.setItem('score',JSON.stringify(score));
  displayRes();
  document.querySelector('.js-result').innerHTML="Result: "+result;
  document.querySelector('.js-moves').innerHTML=`You: 
  <img src="../images/${user}-emoji.png" class="style-emoji">  Comp:
  <img src="../images/${comp}-emoji.png" class="style-emoji">`;
  
}

function displayRes(){
document.querySelector('.js-queryans').innerHTML=`wins:${score.wins} losses:${score.losses} ties:${score.tie}`;
}
let isAutoPlay=false;
let id;

function playAuto(){
  if(!isAutoPlay){
  id=setInterval(function(){
    const playermove=pickComp();
    playGame(playermove);
  },1000);
  isAutoPlay=true;
  }
  else{
  clearInterval(id);
  isAutoPlay=false;
  }
}
function pickComp(){
  var rand=Math.random();
  if(rand<1/3)
    return "rock";
  else if(rand>2/3)
    return "paper";
  else 
    return "scissors";
}
    

function resetScore()
{
  score.wins=0;
  score.losses=0;
  score.tie=0;
  localStorage.removeItem('value');
  displayRes();
}