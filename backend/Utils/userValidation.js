const userDataValidation = ({ fullName, username, email, password, gender })=>{
  return new Promise((resolve,reject)=>{
    console.log(fullName, username, email, password, gender)

    if(!fullName ||!email ||!password ||!username ||!password ||!gender){
      return reject('All fields are required')
    }

    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{1,3}$/)){
      return reject('Invalid email')

    }
 
    return resolve({
      status:200,
      message:"All fields are filled"
    })
  
  })
  

}
module.exports = {
  userDataValidation
}