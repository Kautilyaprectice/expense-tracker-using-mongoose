document.getElementById("forgotPasswordForm").addEventListener('submit', function(event){
    event.preventDefault();

    const email = document.getElementById('email').value;
    axios.post('https://expense-tracker-using-mongoose-xt7ie0020.vercel.app/password/forgotpassword', { email: email })
        .then((res) => {
            console.log(res.data);
            alert("Email sent successfully");
            window.location.href = "../login/login.html";
        })
        .catch(err => console.error(err));
});
