import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import * as LoginStore from "../store/LoginStore";


type LoginProps = LoginStore.LoginState &
  typeof LoginStore.actionCreators &
  RouteComponentProps<{}>;


class Login extends React.Component<LoginProps, {}> {

public  render(){
    return(
      <div>
      <br/>
      <br/>
      <div>
        <input type="text" placeholder="User" required onChange={(e)=>{this.props.handleUser(e)}} />
          <input type="password" placeholder="Password" required
            onChange={(e)=>{this.props.handlePass(e)}} />
        <button onClick={()=>{this.props.handleLogin()}}>Login</button>
      </div>

      <br/>
      <br/>
      <div>
      {this.props.hasLoggedIn ?
      (<div>welcome</div>) : (<div>{this.props.errorMessage}</div>)
    }
      </div>
      </div>
    )
  }
}

export default connect(
  (state: ApplicationState) => state.login, // Selects which state properties are merged into the component's props
  LoginStore.actionCreators // Selects which action creators are merged into the component's props
)(Login) as typeof Login;
