import React from 'react';
 


 class Signin extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  // to get user's email
onEmailChange = (event) => {
  this.setState({signInEmail: event.target.value})
}
 
//to get password event
onPasswordChange = (event) => {
  this.setState({signInPassword: event.target.value})
}

onSubmitSignIn = () => {
  //console.log(this.state); // it will log the two values Psschange and EmailChange
   fetch('http://localhost:3000/signin',{
      method:'post', //post => will add the user info to the back-end and check if it matches to the user database
      headers: {'Content-type': 'application/json'}, 
      body: JSON.stringify({           //getting the info from the body
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
   })
    //To check the response above, we check the users's id to . update the Rank.
   .then(response => response.json())
    .then(user =>{
      if (user.id){
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
 
}
   
  
  render(){
     const {onRouteChange} = this.props;
    return(
        <div>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
             <main className="pa4 black-80">
             <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input 
                  onChange={this.onEmailChange} //Email will be save into the data after the user enter his email
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address"/>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input 
                  onChange={this.onPasswordChange}  //password will be registered after the user input the pass
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"/>
                </div>
              </fieldset>
              <div className="">
                {/*if Signin button is clicked , it will direct the user to (home) page*/}
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                 onClick = {this.onSubmitSignIn}
                 type="submit" 
                  value="Sign in"
                  />
              </div>
               <div className="lh-copy mt3">
                 <p
                 // if Register button is clicked , it will direct them to register form
                 onClick = {() => onRouteChange ('register')}
                 className="f6 link dim black db pointer">Register</p>
               </div>
            
            </div>
          </main>
         </article>
        </div>
    );

  }
}

export default Signin;