import React from 'react'

function UserGreeting(props){
    return <h1>{props.name && props.name + ","} Welcome It's {props.count} times</h1>
}

function GuestGreeting(props){
    if(props.isLoggedIn){
        return <h1>Please sing up.</h1>
    }
}
function Greeting(props){
    // if(props.isLoggedIn){
    //     <UserGeeting name="aaa" count={0}/>
    // }
    // return <GuestGreeting />
    return props.isLoggedIn ? <UserGreeting name="aaddddda" count={0}/> : <GuestGreeting/>;
}
export default function Condition() {
    const isLoggedIn = true;
  return (
    <div>
        <Greeting isLoggedIn={isLoggedIn}/>
    </div>
  )
}
