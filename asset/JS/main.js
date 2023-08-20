
let _btn = document.querySelectorAll("button");
let _inp = document.querySelectorAll("input");


_btn[0].addEventListener("click", () => {

  if (_inp[0].value.length < 6) {
        alert("نام و نام خانوادگی حداقل باید 6 کاراکتر داشته باشد");
        _inp[0].value=''
        return false;
    }

    var userEmail = _inp[1].value;
    var pattern = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
    var regexResult = pattern.test(userEmail);
    if (!regexResult) {
        alert("ایمیل وارد شده معتبر نمی باشد");
        _inp[1].value=''
        return false;
    }
    if(_inp[2].value.length < 8){
      alert('پسورد نمیتواند کمتر از ۸ حرف باشد!')
      return false;
    }
    if(!(_inp[3].checked)){
        alert('شرایط عضویت را تأكید کنید')
        return false
    }


  let data = [];
  _inp.forEach((val) => {
    if (val.value != "") {
      data.push(val.value);
    } 
  });

  if (data.length == _inp.length) {
    fetch("https://64bebda85ee688b6250cdf59.mockapi.io/api/v1/users")
      .then((res) => res.json())
      .then((myData) => {
        let allEmail = []
        myData.map((val) => {
          if (val.email == data[1]) {
            allEmail.push(val.email)  
          }
        });

        if(allEmail.length == 0){
            const newTask = {
              username: data[0],
              email: data[1],
              pass: data[2]
            };

            fetch("https://64bebda85ee688b6250cdf59.mockapi.io/api/v1/users", {
              method: "POST",
              headers: { "content-type": "application/json" },
              // Send your data in the request body as JSON
              body: JSON.stringify(newTask),
            })
              .then((res) => {
                if (res.ok) {
                  return res.json();
                }
                // handle error
              })
              .then((task) => {
                // do something with the new task
                alert('ثبت نام با موفقیت انجام شد، اکنون میتوانید لاگین کنید')
                location.assign('asset/index-login.html')
                _inp.forEach((val, i) =>{
                //   console.log(val);
                  val.value = ''
                  if(i == 3){
                    // val.parentNode.className='yes'
                    console.log(val.checked);
                    val.checked = false
                  }
                })
              })
              .catch((error) => {
                // handle error
              });
        } else{
          alert(`ایمیل ${data} تکراری است!`);
          _inp.forEach((val) =>{
            console.log(val);
            val.value = ''
          })
        }
      });
  }
});


