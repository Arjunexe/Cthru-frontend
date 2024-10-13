
export const isValidate = async({Fullname, Username, EmailOrMobile, Password,seter}) =>{
    if (!validFull(Fullname, seter)){
        return false;
    }else if(!validUsername(Username, seter)){
        return false;
    } else if (!validEmailorPhone(EmailOrMobile, seter)){
        return false;
    } else{
        return true;
    }
   
}


function validFull(Fullname, seter) {
    try{
    const isEmpty = /^\s*$/;
    if(isEmpty.test(Fullname)){
        seter('Fullname required')
        return false;
    } else if (Fullname.length>10){
           seter('Maximum of 10 characters as Fullname')
    }else {
        return true;
    }
   } catch(error) {
        console.log('error during Fullname validation : ', error);
        return false;
  }
}


function validUsername(Username, seter){
   try{ 
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if(Username.length>10){
        seter('maximum of 10 characters as Username')
        return false;
    }else if(Username.length<4){
        seter ('minimum of 4 characters as Username')
        return false;
    }else if (!usernameRegex.test(Username)){
        seter('only letters, numbers, and underscore allowed as Username')
        return false;
    } else {
        return true;
    }
  } catch(error) {
    console.log('error during Username validation : ', error);
    return false;
  }
}


function validEmailorPhone(EmailOrMobile, seter) {
    try{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberRegex = /^\+?\d{1,4}[-.\s]?\d{1,14}$/;

        if(emailRegex.test(EmailOrMobile)){
            return true;
        } else if(phoneNumberRegex.test(EmailOrMobile)){
            return true;
        } else {
            seter('Invalid Email or Mobile number')
            return false;
        }

    } catch (error){
        console.log('error during email or phone validatoin : ', error);
    }
}






// only check if Fullname is not an empty string or not, nothing else. adjust error in jsx, submit button should be in the center and error message should be at the bottom center. Also modify the code to look more minimial and increase the code reusability.



// function validFull(Fullname, seter){
//     try{
//     const isEmpty = /^\s*$/;
//     const fullNameRegex = /^[a-zA-Z\s]+$/;

//     if(isEmpty.test(Fullname)){
//         seter('required')
//         return false;
//     } else if(!fullNameRegex.test(Fullname)){
//         seter('no special characters allowed as Full name')
//         return false;
//     }else if(Fullname.length<4){
//         seter('minimum of 4 characters as Full name')
//         return false;
//     }else if(Fullname.length>10){
//         seter('maximum of 10 characters as Full name')
//         return false;
//     }else{
//         return true;
//     }
//    } catch(error){
//     console.log('error during Fullname validation : ',error);
//     return false;
//   }
// }



//////////////////////  login //////////////////////

export function isitEmpty({emailOrmobile, password, setError}) {
    try{
        const isEmpty = /^\s*$/;
        if(isEmpty.test(emailOrmobile)) {
            setError('Email or Mobile number required')
            return false;
        } else if(isEmpty.test(password)) {
            setError('Password required')
            return false;
        } else {
            return true;
        }
    } catch(error) {
        console.log('error during isitEmpty : ', error);
        return false;
    }
}