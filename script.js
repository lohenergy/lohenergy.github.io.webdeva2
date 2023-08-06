//create hambruger menu
const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });


    // for the sliding of images mechanic 
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let counter = 0;
    let slideWidth = slides[0].clientWidth;
    
    function updateSlideWidth() {
      if (window.innerWidth <= 800) {
        slideWidth = slider.clientWidth;
      } else {
        slideWidth = slides[0].clientWidth;
      }
    }
    
    function slideNext() {
      counter++;
      if (counter >= slides.length) {
        counter = 0;
      }
      updateSlidePosition();
    }
    
    function slidePrev() {
      counter--;
      if (counter < 0) {
        counter = slides.length - 1;
      }
      updateSlidePosition();
    }
    
    function updateSlidePosition() {
      const slidePosition = -counter * slideWidth;
      slider.style.transform = `translateX(${slidePosition}px)`;
    }
    
    nextBtn.addEventListener('click', slideNext);
    prevBtn.addEventListener('click', slidePrev);
    
    // Update slideWidth on window resize
    window.addEventListener('resize', () => {
      updateSlideWidth();
      updateSlidePosition();
    });
    
    // Automatically slide every 15 seconds
    setInterval(slideNext, 15000);


  // for the row of images to slide up 

const animateBtn = document.getElementById("animateBtn");
const imageContainers = document.querySelectorAll(".imagecontainer");
const textContainers = document.querySelectorAll(".text-container");

animateBtn.addEventListener("click", function () {
  imageContainers.forEach((image, index) => {
    setTimeout(() => {
      image.classList.toggle("animate");
      textContainers[index].classList.toggle("animate");
    }, index * 500); // Delay each image/text animation
  });
});


//images to fade left

const fadeLeftBtn = document.getElementById("Fadeleft");
const images = document.querySelectorAll(".fade-left-img");

fadeLeftBtn.addEventListener("click", function() {
  images.forEach(image => {
    image.classList.add("fade-left-transition");
    fadeLeftBtn.remove();
  });
});

//images to fade from the right 
const fadeRightBtn = document.getElementById("FadeRight");
const imgs = document.querySelectorAll(".fade-right-img");

fadeRightBtn.addEventListener("click",function(){
    imgs.forEach(image => {
        image.classList.add("fade-right-transition");
        fadeRightBtn.remove();
    });

});

// Reveal the top 10 brands and their history

const revealBtn = document.getElementById("revealBtn");
const brandCards = document.querySelectorAll(".brand-card");

revealBtn.addEventListener("click", () => {
  brandCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("slide-fade-down-transition");
    }, index * 500);
  });
});



// the fade-in effect for all images with the 'fade-in' class based on the viewport
const imagesToFadeIn = document.querySelectorAll(".auto-fade-out");

const options = {
  threshold: 0.5, // The percentage of the element that must be visible to trigger the animation
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // The element is in the viewport, so apply the fade-in effect
      entry.target.style.opacity = "1";
    } else {
      // The element is not in the viewport, so reset the opacity
      entry.target.style.opacity = "0";
    }
  });
}, options);

imagesToFadeIn.forEach((image) => {
  observer.observe(image);
});


//Quiz Questions in an array

const questions = [ {
  question: "What is the brand known for their Mustang line of cars?",
  answers: [
    { text: "Toyota", correct: false },
    { text: "Honda", correct: false },
    { text: "Ford", correct: true },
    { text: "Chevrolet", correct: false },
  ]
},
{
  question: "Which company produces the '911' model?",
  answers: [
    { text: "Toyota", correct: false },
    { text: "Honda", correct: false },
    { text: "Porsche", correct: true },
    { text: "Chevrolet", correct: false },
  ]
},
{
  question: "What is the luxury brand owned by Volkswagen Group?",
  answers: [
    { text: "BMW", correct: false },
    { text: "Audi", correct: true },
    { text: "Mercedes-Benz", correct: false },
    { text: "Jaguar", correct: false },
  ]
},
{
  question: "Which car manufacturer uses the slogan 'Das Auto'?",
  answers: [
    { text: "BMW", correct: false },
    { text: "Volkswagen", correct: true },
    { text: "Audi", correct: false },
    { text: "Mercedes-Benz", correct: false },
  ]
},
{
  question: "Which automaker is known for the 'Corvette' sports car?",
  answers: [
    { text: "Toyota", correct: false },
    { text: "Mitsubushi", correct: false },
    { text: "Ford", correct: false },
    { text: "Chevrolet", correct: true },
  ]
},
];

//Link it to HTML
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct)
    {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectanswer);
  })
}
function resetState()
{
  nextButton.style.display = "none";
  while(answerButton.firstChild)
  {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectanswer(e)
{
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.correct === "true";
  if(isCorrect){
    selectedbtn.classList.add("correct");
    score++;

  }
  else{
    selectedbtn.classList.add("incorrect");
  }

  Array.from(answerButton.children).forEach((button) => {
    if(button.dataset.correct === "true")
    {
      button.classList.add("correct");
    }
    button.removeEventListener("click", selectanswer); // Remove click event listener from all answer buttons
  });
  nextButton.style.display = "block";
}


function showScore(){
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton(){
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", ()=>
{
  if(currentQuestionIndex < questions.length){
    handleNextButton();

  }else{
    startQuiz();
  }
});
startQuiz();


document.addEventListener("DOMContentLoaded",function(){



  
  //Images to fade slide both left and right 
    const cycleBtn = document.getElementById("row");
    const oddrows = document.querySelectorAll(".oddrow");
    const evenrows = document.querySelectorAll(".evenrow");

  cycleBtn.addEventListener("click", function() {
    oddrows.forEach((row, index) => {
      const img = row.querySelector(".slide-fade-left");
      const text = row.querySelector(".textoddrow");
      img.style.transitionDelay = `${index * 0.2}s`;
      img.classList.toggle("slide-fade-left-transition");
      text.style.transitionDelay = `${index * 0.2}s`;
      text.classList.toggle("textoddrow-transition");
    });

    evenrows.forEach((row, index) => {
      const img = row.querySelector(".slide-fade-right");
      const text = row.querySelector(".textevenrow");
      img.style.transitionDelay = `${index * 0.2}s`;
      img.classList.toggle("slide-fade-right-transition");
      text.style.transitionDelay = `${index * 0.2}s`;
      text.classList.toggle("textevenrow-transition");
    });
  });

 
    
});

   



  
  
  
  
  
 
   
    
