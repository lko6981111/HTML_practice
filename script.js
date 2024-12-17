const wrapperBox = document.getElementById("wrapper");
const inputFieldGroup = document.getElementsByClassName("inputGroup");
const allInputs = document.querySelectorAll("input");
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
//입력필드가 비어있는지 확인하는 함수 기능을 만듭니다.
const checkEmptyInput = (input)=>{
    if(input.value.trim()===''){
        //인풋입력칸에 입력한 문자열 중 띄어쓰기를 없애는 기능
        updateHelperText(input,'값을 입력해주세요.',false);
        return false;
    }
    else{
        //입력이 있으면 도움말을 지웁니다.
        updateHelperText(input,"",true);
        return true;
    }
}


//이메일 형식이 올바른지 확인하는 함수
//이메일 주소가 규칙에 맞게 작성되었는지 확인하는 것과 같습니다.
const validateEmailFormat =(input)=>{
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if(emailPattern.test(input.value.trim()) == true ){
        updateHelperText(input,"",true);
        return true;
    }else{
        updateHelperText(input,"유효한 이메일 주소를 입력부탁드립니다.",false)
        return false;
    }
    //정규식 => 마법, 이메일에 골뱅이가 안들어갔다거나,.com,co.kr 이런식으로 표현이 안될때
    //검사를 해가지고, true 혹은 false를 리턴하게 할수있습니다. =>이메일 정규식
}

//비밀번호강도 설정
const checkPasswordStrength = (password) => {
    const strongPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    if(strongPattern.test(password.value) == true){
        updateHelperText(password,"비밀번호 강도 : 강함",true);
        return true;
    }else{
        updateHelperText(password,"비밀번호는 8자 이상 이어야하며, 대문자와 소문자, 특수문자를 포함하여야 합니다.",false);
        return false;
    }
}

//비밀번호와 비밀번호확인 입력칸이 같은지 확인
const validatePasswordMatch = (passwordInput,confirmInput) =>{
    if(passwordInput.value!==confirmInput.value){
        updateHelperText(confirmInput,"비밀번호가 일치하지 않습니다.",false);
        return false;
    }else{
        updateHelperText(confirmInput,"",true);
        return true;
    }
}

//전화번호가 올바른 형식인지 확인하는 함수
const validatePhoneNumber=(input)=>{
    const phonePattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if(phonePattern.test(input.value.trim())==true){
        updateHelperText(input,"",true);
        return true;
    }else{
        updateHelperText(input,"유효한 전화번호를 입력해주세요.(예:010-1234-1234)",false)
        return false;
    }
}

//폼 제출시(회원가입버튼 누르면 회원가입이 진행되게끔 하는 것) 입력 필드가 유효한지 확인하는 함수
const validateForm = () => {
    const isNicknameValid = checkEmptyInput(userNickname);
    //boolean값으로 에러 검사시 문제가 없으면 true를 값으로 가지고 있으면 false를 값으로 가진다.
    const isEmailValid = validateEmailFormat(userEmail);
    const isPasswordStrong = checkPasswordStrength(userPassword);
    const isPasswordMatch = validatePasswordMatch(userPassword,confirmPassword)
    const isPhoneValid = validatePhoneNumber(userPhone);

    //모든 검사를 해서 통과해야 회원가입버튼을 눌렀을때 회원가입이 진행
    return isNicknameValid&&isEmailValid&&isPasswordStrong&&isPasswordMatch&&isPhoneValid;
    //모두 true야지 값을 반환
}

registrationForm.addEventListener("submit", (e) => {
    if (!validateForm()) {
        e.preventDefault();
        alert("모든 필드를 올바르게 입력해주세요.");
        console.log("위 필드 중 일부분이 에러가 발생했습니다.");
    } else {
        alert("회원가입이 완료되었습니다!");
        console.log("모든 필드가 유효합니다.");
    }
});

//각 input태그 입력을 눌렀을 때, 테두리 색깔이나 알림이 뜨게 하고싶다.
document.querySelectorAll("input").forEach(input=>{
    //forEach는 배열안의 데이터들을 각각 뽑아오고 싶을때 이용합니다.
    input.addEventListener('input',()=>{
        switch(input.id){
            case 'nickname' :
                checkEmptyInput(input);
                break;

            case 'email':
                validateEmailFormat(input);
                break;

            case 'userPassword':
                checkPasswordStrength(input);
                break;

            case 'confirmPassword':
                validatePasswordMatch(userPassword,confirmPassword);
                break;
            case 'phone':
                validatePhoneNumber(input);
                break;
        }
    })
})