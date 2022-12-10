import React,{useEffect} from "react"
export default function Timer(props){
    useEffect(() => {
        setInterval(() => {
            props.setTimer(prevTime => prevTime - 1)
        }, 1000);
    },[])
    return(
        <div>
            <h2>{props.timer} Second{props.timer == 1 ?"" : "s"}</h2>
        </div>
    )
}