const loadLesson = () =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res)=>res.json())
    .then((json)=>displayLesson(json.data))
}

const removeActive = ()=>{
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach(btn=>btn.classList.remove("active"))
}

const loadLevelWord = (id)=>{
    
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url)
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active");

        displalyLevelWord(data.data)
    })
}
const displalyLevelWord = (words)=>{
const wordContainer = document.getElementById('word-container');
 wordContainer.innerHTML= "";

if( words.length == 0){
   wordContainer.innerHTML=`
    <div class="text-center col-span-full space-y-6 hind-siliguri py-10">
    <img class="mx-auto" src="assets/alert-error.png" alt="">
      <p class="font-medium text-xl text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
      <p class="font-bold text-4xl hind-siliguri">নেক্সট Lesson এ যান</p>
    </div>
    ` 
    return;
}

words.forEach(word => {
    console.log(word)
    const card = document.createElement('div');
    card.innerHTML=`
    <div class="bg-white text-center rounded-xl shadow-sm py-10 px-5 space-y-4">
      <h2 class="font-bold text-2xl">${word.word ? word.word :"শব্দ পাওয়া যায় নি" }</h2>
      <p class="font-semibold">Meaning/Pronounciation</p>
      <div class="text-2xl font-medium hind-siliguri">${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি" }/${word.pronunciation ? word.pronunciation: "উচ্চারণ পাওয়া যায় নি"}</div>
      <div class="flex justify-between items-center">
        <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF15] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF15] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>

    `
    wordContainer.append(card);
});
}


const displayLesson =  (lessons)=>{
const levelContainer = document.getElementById('level-container');
levelContainer.innerHTML="";




for(let lesson of lessons){
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML=`
    <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn"> 
    <img src="assets/fa-book-open.png" alt="">Lesson- ${lesson.level_no}
    </button>
    `
    levelContainer.append(btnDiv);
}
}
loadLesson()
