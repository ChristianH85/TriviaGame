$(document).ready(function(){  
    let questions = [{
        quest: "Which notoriously clumsy President played football for Michigan?",
        ansChoices: ["Lyndon Johnson", "Teddy Roosevelt", "Gerald Ford", "Benjamin Harrison"]
    },
        {quest:"Who was the only President to also serve as Chief Justice of the Supreme Court",
         ansChoices:["William Taft", "John Tyler", "John Q Adams", "Teddy Roosevelt"]
    },
        {quest:"Which President loved to play the Saxaphone",
         ansChoices:["Jimmy Carter", "Bill Clinton", "Ronald Raegan", "Barrack Obama"]
    },
        {quest:"Who is the only President to serve non consequetive terms",
         ansChoices:["Millard Filmore", "Ulysees Grant", "Dwight Eisenhower", "Grover Cleveland"]
    },
        {quest:"Which President served the most Terms",
         ansChoices:["George Washington", "Franklin Roosevelt", "Teddy Roosevelt", "Thomas Jefferson"]
    },
        {quest: "Which President served the shortest time",
         ansChoices:["William Harrison", "John Kennedy", "Andrew Garfield", "James Polk"]
    },
        {quest:"Which President became a war hero on PT109 during WWII",
         ansChoices:["Dwight Eisenhower", "Harry Truman", "John Kennedy", "Lyndon Johnson"]
    },
        {quest:"Which President was shot while giving a speech and finished his speech",
         ansChoices:["Teddy Roosevelt", "Andrew Jackson", "Ulysses Grant", "Franklin Roosevelt"]
    }
];
let rightAns = ["Gerald Ford", "William Taft", "Bill Clinton", "Grover Cleveland", "Franklin Roosevelt", "William Harrison", "John Kennedy", "Teddy Roosevelt"]
let timeRemaining = 60
let correct = 0
let incorrect= 0
let answered = 0
let question= 1
let wrongList = []
$(".over").hide()
$(".q1").hide()
$("#submit").hide()
$(`.fin`).hide()
$(`.timer`).hide()

function end(){
    $(`.q1`).hide()
    $(`.timer`).hide()
    $(`#right`).text("Correct:"+correct)
    $(`#wrong`).text("Incorrect:"+incorrect)
    showWrg(wrongList)
    $(`.fin`).show()
    if(correct === 8){$(`#message`).text("Perfect")}
    if(correct === 7){$(`#message`).text("Almost")}
    if(correct === 6){$(`#message`).text("Not Bad")}
    if(correct === 5){$(`#message`).text("Not so Good")}
    if(correct <= 4){$(`#message`).text("Those who fail History are doomed to repeat it")}
    
}
function showWrg(data){
    if(data.length>0 && answered<=8){

        data.map((ans)=>{
        $('.finC').append(
            `<div class= "row ans justify-content-center">
                <div class="col-1 q">Q${ans.q}</div>
                <div class="col-3 wrg">Yours:
                ${" "+ans.yours}
                </div>
                <div class="col-3 rt">
                Correct:${" "+ans.right}
                </div>
            </div>`)
        })
    }
}
function checkAnswer() {
     
    var answer =  $(`input:checked`).val();
     if(answer === rightChoice){
        correct++
        answered++
        question++
     }
     else if(answer !== rightChoice && answer!== undefined){
         let wrongObj = {
             q:question,
             yours: answer,
             right: rightChoice
         }
         wrongList.push(wrongObj)
         incorrect++
         answered++
         question++
     }   
     else if(answer !== rightChoice && answer === undefined){
        let wrongObj = {
            q:question,
            yours: 'Not Answered',
            right: rightChoice
        }
        wrongList.push(wrongObj)
        incorrect++
        answered++
        question++
     }
}

let j=1
   $(`.startQuiz`).click(function(){
    $(`.timer`).show()
    function next1(){
        let i=j++
            $(".quizQuest").text("Q:" + questions[i].quest);
            rightChoice = rightAns[i]
            $("#ans1").text(questions[i].ansChoices[0]);
            $("#customRadio1").val(questions[i].ansChoices[0])
            $("#ans2").text(questions[i].ansChoices[1]);
            $("#customRadio2").val(questions[i].ansChoices[1])
            $("#ans3").text(questions[i].ansChoices[2]);
            $("#customRadio3").val(questions[i].ansChoices[2])
            $("#ans4").text(questions[i].ansChoices[3]);
            $("#customRadio4").val(questions[i].ansChoices[3]) 
            if(i===7){
                $("#q2").hide()
                $("#submit").show()
            }
        }     
    $(`#q2`).click(function(){
       checkAnswer()
       $('input').prop('checked', false) 
       next1()
    })
    $(`#submit`).click(function(){
        checkAnswer()
        end()
    })
    $(this).hide()

   let gameClock= setInterval(countdown, 1000)
    function countdown(){
        
        $(`.timer`).text("Time Left:"+"  "+timeRemaining);
        timeRemaining--;

    if(timeRemaining === -2 && answered < 8 ){
        let none=8-answered
        console.log(none)
        let noPts=incorrect+none;
        incorrect=noPts
        console.log(noPts)
        clearInterval(gameClock)
        $(`.over`).show()
        end()    
        }   
    }
    $(triviaQuestions1).show()
    function triviaQuestions1(){
        $(".q1").show();
        rightChoice = rightAns[0]
        $(".quizQuest").text("Q:" + questions[0].quest);
        $("#ans1").text(questions[0].ansChoices[0]);
        $("#ans2").text(questions[0].ansChoices[1]);
        $("#ans3").text(questions[0].ansChoices[2]);
        $("#ans4").text(questions[0].ansChoices[3]); 
        }
    })
})
