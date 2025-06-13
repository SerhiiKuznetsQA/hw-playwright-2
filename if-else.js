

 export function isEvenNumber(num){
    if(typeof(num)!= 'number'){
        return `Should be a Integer`
    }else if(num % 2 === 0 ){
        return `Is Even Number : ${num}`
    }else{
    return `Is Not Even Number : ${num}`
    }
}



export function sayHello(time){
    let morningEndHour = 12
    let eveningStartHour = 18
    if(typeof(time)!= 'number'){
        return `Should be a Integer`
    }else if(time < morningEndHour){
        return `Good Morning`
    }else if(time >=morningEndHour && time < eveningStartHour){
      return `Have a Good Day`  
    }else{
        return`Good Evening`
    }
  
}

console.log(typeof(20) === 'number');

export function examScore(score){
    let examPassedScore = 50
     if(typeof(score) !== 'number'){
        return `Should be a Integer`
    }
    if(score >= examPassedScore){
        return `Exam Passed yours score : ${score}`
    }
    return `Exam Failed yours score : ${score}`
}



export function votingAge(age){
    let legalVotingAge = 18
    if(typeof(age)!== 'number'){
        return `Should be a Integer`
    } 
    if(age >=legalVotingAge){
        return `You can cast your vote.`
    }
    return `You can not cast your vote.`
}


