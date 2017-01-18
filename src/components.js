import React from 'react';

export function gamePiece(props) {
  console.log('member', props)
  // const { member } = props;
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.', e.target);
  }
  return <div onClick={handleClick} >asdasd{props}</div>;
}

export function locationArea(props) {
  console.log('location prop:', props)
  // var namesList = props.members.map(function(name){
  //   return gamePiece(name);
  //   })
  // return (<div className='location' id={props.name}>
  //     {props.name}
  //   </div>
  // );
  return (<div>hi</div>);
}

export function Box(props) {
  console.log('box props', props)
  const { box, toggleTodo, addTodo } = props;

  return (
    <div className='todo'>
      {box.locations.map(location => {
        console.log('loc', locationArea(location))
        locationArea()
      })}
    </div>
  );
}

