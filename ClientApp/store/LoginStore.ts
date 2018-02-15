import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface LoginState {
    username : string;
    password : string;
    hasLoggedIn: boolean;
    errorMessage: string;

}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface HandleLoginAction { type: 'HANDLE_LOGIN' }
interface UserChangeAction { type: 'USER_CHANGE', newValue:string }
interface PassChangedAction { type: 'PASS_CHANGE', newValue: string }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = HandleLoginAction | UserChangeAction | PassChangedAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    handleLogin: () => <HandleLoginAction>{ type: 'HANDLE_LOGIN'},
    handleUser: (e: any) => <UserChangeAction>{ type: 'USER_CHANGE', newValue: e.target.value},
    handlePass: (e: any) =>  <PassChangedAction>{ type: 'PASS_CHANGE', newValue: e.target.value},

};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
const initialState : LoginState={
username: "",
password: "",
hasLoggedIn: false,
errorMessage: ""
};
function checkLogin(username: string, password: string) : boolean {
  if((username == "admin") && (password == "admin")){
    return true;
  }
  else{ return false;
  }
}

export const reducer: Reducer<LoginState> = (state: LoginState, action: KnownAction) => {

    switch (action.type) {
        case 'HANDLE_LOGIN':
            let loginOk: boolean = checkLogin(state.username, state.password);
            if (loginOk){
              return {
                ...state,
                hasLoggedIn:true,
                errorMessage:""
              }
            }else{
              return {
                ...state,
                hasLoggedIn:false,
                errorMessage: "ei pääsyä"

              }
            }


        case 'USER_CHANGE':
            console.log(`USER_CHANGE = ${action.newValue}`)
            return {
              ...state,
              username: action.newValue,
            }

        case 'PASS_CHANGE':
        console.log(`PASS_CHANGE = ${action.newValue}`)

            return  {...state,
              password: action.newValue,
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { initialState };
};
