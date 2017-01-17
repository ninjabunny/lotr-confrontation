import React from 'react';


export function gamePiece(props) {
  console.log('member', props)
  const { member } = props;
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.', e.target);
  }
  return <div onClick={handleClick} >{props}</div>;
}

export function location(props) {
  console.log('location prop:', props)
  const { location, members } = props;
  var namesList = members.map(function(name){
    return gamePiece(name);
    })
  return (<div className='location' id={props.name}>
      {props.name}
      {namesList}
    </div>
  );
}

export function Box(props) {
  const { box, toggleTodo, addTodo } = props;
  console.log('box props', props)
  return (
    <div className='todo'>
      {location(box.locations.dogtown)}
      {location(box.locations.ludeville)}
    </div>
  );
}

