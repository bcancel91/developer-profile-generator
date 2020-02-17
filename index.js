//packages needed

//prompting (3rd party)
const inquirer = require("inquirer");

//read/write files (node)
const fs = require("fs");

//create http requests
const axios = require("axios")

const questions = [
    {
        message: "What is your GitHub user name?",
        type: "input",
        name: "username"
    },
    {
        message: "Which color do you like?",
        type: "rawlist",
        name: "color",
        choices: ["Green", "Blue", "Pink","Red"]

        
    }

]
testPrompt = () =>
{
    inquirer.prompt(questions)
    .then(function (response){
       console.log(response)
        const queryUrl = `https://api.github.com/users/${response.username}`;
axios.get(queryUrl)

// do this if success
  .then(function (res) {
    console.log(res);
    
    const data = 
        {
            name: res.name,
            img: res.avatar_url,
            bio: res.bio,
            followers: res.followers,
            following: res.following,
            totalRepos: res.public_repos,
            url: res.html_url,
            blog: res.blog,
            location: res.location

        }
const starURL = `https://api.github.com/users/${res.username}/star_url`
        axios.get(starURL)

  })
  //do this if fail
  .catch(function(err){
      throw err
  })
        console.log(response);
    })

}
testPrompt()









//   Profile image
// * User name
// * Links to the following:
//   * User location via Google Maps
//   * User GitHub profile
//   * User blog
// * User bio
// * Number of public repositories
// * Number of followers
// * Number of GitHub stars
// * Number of users following

