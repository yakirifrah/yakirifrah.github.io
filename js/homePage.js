$(document).ready(() => {
    $('#submit').submit((e) => {
        let userInput = document.getElementById("user").value;
        let emailInput = document.getElementById("email").value;
        let objLocal = JSON.parse(localStorage.getItem("globalStorage"));
        if (objLocal === null) {
            user.users.push({
                user: `${userInput}`,
                email: `${emailInput}`
            })
            window.localStorage.setItem("globalStorage", JSON.stringify(user.users));
        }
        objLocal = JSON.parse(localStorage.getItem("globalStorage"));
        if (isUserExites(objLocal, userInput, emailInput) === false) {
            objLocal.push(
                {
                    user: `${userInput}`,
                    email: `${emailInput}`
                }
            )
            window.localStorage.setItem("globalStorage", JSON.stringify(objLocal));
        }
        else {
            window.localStorage.setItem("globalStorage", JSON.stringify(objLocal));

        }
    });
});
function isUserExites(arryOfObj, userInput, emailInput) {
    if (arryOfObj.length >= 1) {
        for (let i = 0; i < arryOfObj.length; i++) {
            if (arryOfObj[i].user === userInput && arryOfObj[i].email === emailInput) {
                return true;
            }
        }
        return false;
    }
}
