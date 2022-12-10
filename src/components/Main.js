import React from "react";
import "./Main.css"
export default function Main(props){
    function handleChange(event,set){
        set(event.target.value)
        for (let i = 0; i < event.target.length; i++) {
            if(event.target[i].value === event.target.value){
                const name = event.target[i].id;
                const valueToChange = event.target.id;
                props.setDisplayData(prevData => ({
                    ...prevData,
                    [valueToChange]:name
                }))
                break;
            }
        }
    }

    function play(){
        props.start();
    }
    return(
        <div className="main">
            <div className="diffculty">
            <h4>Choose Category</h4>
                <select id="category" onChange={event => handleChange(event,props.setCategory) } value={props.category}>
                    <option value="" id="Any">Any</option>
                    <option value="9" id="General Knowledge">General Knowledge</option>
                    <option value="10" id="Books">Books</option>
                    <option value="11" id="Film">Film</option>
                    <option value="12" id="Music">Music</option>
                    <option value="13" id="Musicals & Theatres">Musicals & Theatres</option>
                    <option value="14" id="Television">Television</option>
                    <option value="15" id="Video Games">Video Games</option>
                    <option value="16" id="Board Games">Board Games</option>
                    <option value="17" id="Science & Nature">Science & Nature</option>
                    <option value="18" id="Computers">Computers</option>
                    <option value="19" id="Mathematics">Mathematics</option>
                    <option value="20" id="Mythology">Mythology</option>
                    <option value="21" id="Sports">Sports</option>
                    <option value="22" id="Geography">Geography</option>
                    <option value="23" id="History">History</option>
                    <option value="24" id="Politics">Politics</option>
                    <option value="25" id="Art">Art</option>
                    <option value="26" id="Celebrities">Celebrities</option>
                    <option value="27" id="Animals">Animals</option>
                    <option value="28" id="Vehicles">Vehicles</option>
                    <option value="29" id="Comics">Comics</option>
                    <option value="30" id="Gadgets">Gadgets</option>
                    <option value="31" id="Japanese Anime & Manga">Japanese Anime & Manga</option>
                    <option value="32" id="Cartoon & Animations">Cartoon & Animations</option>
                </select>
                <h4>Choose Diffculty</h4>
                <select id="diffculty" onChange={event => handleChange(event,props.setDiffculty) } value={props.diffculty}>
                    <option value="" id="Any">Any</option>
                    <option value="easy" id="Easy">Easy</option>
                    <option value="medium" id="Medium">Medium</option>
                    <option value="hard" id="Hard">Hard</option>
                </select>
            </div>
            <button onClick={play}>Play</button>
        </div>
    )
}