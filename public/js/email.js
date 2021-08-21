(function() {
    emailjs.init(emailKey1);
})();

async function sendMail(email){

    if(localStorage.getItem("books") !== null) {
        const emailList = JSON.parse(localStorage.getItem("books"));
 
        let items = [];

        for (let i = 0; i < emailList.length; i++) {
         
         items.push([emailList[i].title, 
                     emailList[i].author, 
                     emailList[i].previewLink
                    ]);
    }

    let h = items.join(" , ");

    const data = {
        from_name: "Good Books",
        to_email: email,
        to_name: "Vistor",
        message: h
    }
    emailjs.send(emailKeyService,  emailTemp, data)
    .then(function(res){
        if (res.status == 200) {
            success();
        } else {
            error();
        }
    }).catch(error => {
        if (error.status == 422) {
            empty();
            setTimeout(reload, 1000);
        }
    })
  }
}

async function success(){
    swal({
        title: "Good Job",
        text: "Email Sent",
        icon: "success",
        button: "continue"
    })
}

async function error(){
    swal({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
        button: "continue"
    })
}

async function empty(){
    swal({
        title: "Error",
        text: "Imput empty",
        icon: "error",
        button: "Try again"
    });
}

$('#email').on('submit' ,function(e){
    e.preventDefault();

    const email = $("#email-input").val();
    sendMail(email);
  
});


function reload(){
    location.reload();
}