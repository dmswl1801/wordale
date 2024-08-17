const 정답 = 'APPLE';

let attempts = 0;
let index = 0;
let timer 


function appStart(){
    const diplayGameover = () => {
        const div = document.createElement("div");
        div.innerText = '게임이 종료되었습니다.';
        div.style = "display:flex; justify-content:center; align-item:center;"
        document.body.appendChild(div);
    }

    const nextLine = () => {
        if (attempts === 6) return gameover();
        attempts += 1;
        index = 0;
    };
    const gameover = () => {
        window.removeEventListener("keydown", handleKeydown);
        diplayGameover();
        clearInterval(timer);
    };

    const handleEnterkey = () => {
        let 맞은_갯수 = 0;
        for(let i=0; i<5; i++){
            const block = document.querySelector(
                `.board-block[data-index='${attempts}${i}']`
            );
            const letter = block.innerText;
            const 정답_글자 = 정답[i];
            if (letter===정답_글자) {
                맞은_갯수 += 1;
             block.style.background = "#6AAA64";
            }
            else if (정답.includes(letter)) block.style.background = "#c9b458";
            else block.style.background = "#787c7e";
            block.style.color = "white";
           // console.log('letter:', letter, '정답_글자:', 정답_글자);
        }

        // 위에 for문을 다 돌고 다음 줄로 넘김
        if (맞은_갯수 ===5) gameover();
        else nextLine();
    };

    const handleBackspace = () => {
        if (index > 0){
        const preBlock = document.querySelector(`.board-block[data-index='${attempts}${index - 1}']`
        );
        preBlock.innerText = "";
        }
        if(index !== 0) index -= 1;
    }

    const handleKeydown = (event) => {
        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`
        );
        

        if (event.key === 'Backspace') handleEnterkey();
        else if (index === 5) {
            if (event.key === 'Enter') handleEnterkey();
            else return
        } else if (65<=keyCode && keyCode<=90){
            thisBlock.innerText = key;
            index = index + 1; // index +=1; 이랑 같은 뜻. index++; 도 같은 뜻
        }
 

      
       
    };
    const startTimer = () => {
        const 시작_시간 = new Date();

        function setTime(){
            const 현재_시간 = new Date(); //시간 값을 가져옴
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);
   
            const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
            const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
            const timerDiv = document.querySelector("#timer");
            timerDiv.innerText = `${분}:${초}`;
}
        timer = setInterval(setTime, 1000);
    };

    startTimer();
    window.addEventListener("keydown", handleKeydown);
}

appStart();