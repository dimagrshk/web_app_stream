window.onload=function () {
    document.forms[0].addEventListener("submit",function (event) {
        var password=document.getElementById("password");
        var confirm=document.getElementById("confirmPassword");
        //check login and email with database
        if(password.value!=confirm.value){
            matchError(password,confirm);
            event.preventDefault();
        }
    })
}

function matchError() {
    for(var i=0;i<arguments.length;i++){
        arguments[i].style.backgroundColor='red';
    }
}