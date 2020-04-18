//packages needed
//const pdf = require("./toPDF")
const generateHTML = require("./generateHTML")

const toPDF = require("./toPDF");

//prompting (3rd party)
const inquirer = require("inquirer");

//read/write files (node)
const fs = require("fs");

//create http requests
const axios = require("axios")
let info = []


const questions = [
    {
        message: "What is your GitHub user name?",
        type: "input",
        name: "username"
    },
    {
        message: "Which color would you like?",
        type: "rawlist",
        name: "color",
        choices: ["green", "blue", "pink","red"]

        
    }

]
async function testPrompt(){
    await inquirer.prompt(questions)
    
    .then(function (response){
       console.log(response)
        const queryUrl = `https://api.github.com/users/${response.username}`;
        axios.get(queryUrl)
     
// do this if success
   .then(function (res) {
console.log(res)
 info = 
        {
            name: res.data.name,
            color: response.color,
            img: res.data.avatar_url,
            bio: res.data.bio,
            followers: res.data.followers,
            following: res.data.following,
            totalRepos: res.data.public_repos,
            url: res.data.html_url,
            blog: res.data.blog,
            location: res.data.location
        }

    const starURL = `https://api.github.com/users/${response.username}/starred`;
console.log(starURL)

      axios.get(starURL)
      .then(function(response2){


        console.log(response2);
         let stars = response2.data.length;
         info.stars = stars;
         console.log(info);

         const html = generateHTML(info);
         

         fs.writeFile("index.html", html, function(err){
            if(err){

               console.log(err);

     } 
 })
      }).then(() => {
       return toPDF();
      })
      .catch(function (err2){
    throw err2
      })
   // console.log(res);       

  })
  //do this if fail
  .catch(function(err){
      throw err
  })
        
    })
    run()

}
testPrompt()









