
export const signupValid = async(userData) =>{
    // const fullname =  validFull(userData)
    // const username = validUsername(userData)
    // const emailOrmobile = validEmailMobile(userData)
    // const password = validPassword(userData)
    if (validFull) {
        
    }else
    

}





function validFull(userData){
    const {Fullname} = userData
    const fullNameRegex = /^[a-zA-Z\s]+$/;

    return fullNameRegex.test(Fullname);
}

function username (userData){
    const {Username} = userData
    const userNameRegex = /^[a-zA-Z0-9_-]{3,16}$/

    return userNameRegex.test(userNameRegex)
}