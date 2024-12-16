const wrapperBox = document.getElementById("wrapper");
const inputFieldGroup = document.getElementsByClassName("inputGroup");
const allInputs = document.querySelectorSelector("input");
const userNickname = document.getElementById("nickname");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const userPhone = document.getElementById("phone");
const registrationForm = document.getElementById("registrationForm");
//html 태그를 DOM 객체로 연결해서 JS가 동작할수 있도록

const updateHelperText = (input,message,isValid) =>{
    const inputGroup = input.parentElement;
    //한개의 input태그의 부모 태그에 접근하는 것
    //예시로 input태그를 저희가 userEmail로 접근하였다고 하면, 아래 태그들의 최상위태그를 의미한다.
    // <div class = "inputGroup">
    //  <label for="userEmail">이메일 주소</label>
    //  <input type = "email" id="email" class="emailInput">
    //  <span class="helperText">알림</span>
    //  <!-- 글자표현 -->
    // </div>
    const helperText = inputGroup.getElementsByClassName("helperText")[0];
    //=> 알림

    if(isValid==true){
        //isValid에는 boolean데이터 true/false가 들어갈거임
        inputGroup.classList.remove("invalid");
        inputGroup.classList.add("valid");
        helperText.style.visibility="hidden";
    }
    if(isValid==false){
        inputGroup.classList.remove("valid");
        inputGroup.classList.add("invalid");
        helperText.style.visibility="visible";
        helperText.innerText=message;
    }
};

//알림이 사용이 되는 것 까지는 설정을 했는데, 언제 사용되어야하냐 조건 설정 안했음