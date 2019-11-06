import React , {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';






const particlesOptions = {
  particles: {
    number:{
      value:500,
      desnsity:{
        enable:true,
        value_area: 200
      }
    }
  }
}

const initialState = {
   
  input: '',
      imageUrl: '',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries:0,
        joined: ''

}
}

class App extends Component {
   
  constructor () {
    super();
    this.state = initialState;

    }
  
  
  loadUser = (data) => {
    this.setState ({
       user :{  //update the state with the user we receive 
       id: data.id,
        name: data.name,
        email: data.email,
        entries:data.entries,
        joined: data.joined
    }})
  }





  calculateBox = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //we will return to an object that fills the Box state
    return {
      leftCol: faceData.left_col * width,
      topRow: faceData.top_row * height,
      rightCol: width - (faceData.right_col * width),
      bottomRow: height - (faceData.bottom_row * height)
    }
  }
  
  displaybox = (box) => {
    console.log(box);
     this.setState({box: box});
  }


  onInputChange = (event) => {
    //We will pass the onInputChange to ImageLinkForm as props. Thus , it will detect for any changes for the value of Input
    // With Setstate we can get the value from any image that is uploaded on the web
    this.setState({input: event.target.value}); 
  }

  // For button => image upload
  onSubmit = () => {
    this.setState ({imageUrl:this.state.input});

    fetch('http://localhost:3000/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          input: this.state.input
          })
        }) // fetch ends here
        .then(response => response.json())
        
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }) // fetch ends here
          .then(response => response.json()) //running JSON
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count})) //entries is one of the user object
          })
           
          .catch(err => console.log(err)); //always put cathc after .then so we improve with error handling
             
        } //If ends here
     
      this.displaybox(this.calculateBox(response))

    }) //.then ends here
} // end of RouteChange


    //directing the user 
  onRouteChange = (route) => {
    if (route==='signout'){
                      //isSignedIn: false
      this.setState ({isSignedIn: false}); // if the user signs out , he will be directed to Signin form page
   }
    else if (route === 'home') {
      this.setState ({isSignedIn: true}); // if the user signs in , he will be directed to home page
    }
    this.setState ({route: route}); //we always need to change the route

  } 


  render(){
    
   const {isSignedIn , imageUrl , route , box} = this.state;
    
    return(
      <div className = "App">
        <Particles className = 'particles'
        params ={particlesOptions}/>
       <Navigation onRouteChange= {this.onRouteChange} isSignedIn={isSignedIn}/>
       
       { route === 'home' ? // if route = home 
         <div>
           <Logo/>
           <Rank name={this.state.user.name} entries={this.state.user.entries}/>
           <ImageLinkForm  onInputChange={this.onInputChange} onSubmit={this.onSubmit}/> 
           <FaceRecognition box={box} imageUrl = {imageUrl}/>  
            </div>
       
          : (  //if route = signin , it will be direct the user to signin or register form(based on the user input)
           route === 'signin' ?
             <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
              // else
            :<Register onRouteChange = {this.onRouteChange} loadUser= {this.loadUser}/>
 
          )
         
           
       }
       </div>
    );
  }
}

export default App;
