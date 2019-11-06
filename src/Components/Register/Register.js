import React from 'react';

class Register extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  // to get user's email
  onNamelChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmaillChange = (event) => {
  this.setState({email: event.target.value})
 }
 
  //to get password event
  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }
  
  onSubmitSignIn = () => {
    //console.log(this.state); // it will log the two values Psschange and EmailChange
     fetch('http://localhost:3000/register',{
        method:'post', //post => will add the user info to the back-end and check if it matches to the user database
        headers: {'Content-type': 'application/json'}, 
        body: JSON.stringify({           //getting the info from the body
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        })
     })
      // if the infor doesn't match our database
      .then(response => response.json())
      .then(user=>{
        if (user.id){
          this.props.loadUser(user)  //updating the user with passing the user object
          this.props.onRouteChange('home');
        }
      })
   
  }
     
    
  
  
  render(){  

    return(
        <div>
             <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
             <main className="pa4 black-80">
             <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
                  <input 
                  onChange = {this.onNamelChange} // saving user's name
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="name"  
                  id="name"/>
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  onChange = {this.onEmaillChange} // saving user's email
                  id="email-address"/>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input 
                  onChange = {this.onPasswordChange} // saving user's password
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"/>
                </div>
              </fieldset>
              <div className="">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                  onClick = {this.onSubmitSignIn} // after the user registers , he/she will be directed to home page
                  type="submit" 
                  value="Register"
                  />
              </div>
            </div>
          </main>
         </article>
        </div>
    );
  }
} 

export default Register;