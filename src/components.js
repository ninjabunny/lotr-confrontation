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

export function locationArea(props, members) {
  console.log('location prop:', props + 'asdasd', members)
  // var namesList = props.members.map(function(name){
  //   return gamePiece(name);
  //   })
  // return (<div className='location' id={props.name}>
  //     {props.name}
  //   </div>
  // );
  return (<div key={props.name} id={props.name}>{props.name}</div>);
}

export function Box(props) {
  console.log('box props', props)
  const { box, toggleTodo, addTodo } = props;
  let local = box.locations.map(location => {
      return locationArea(location, box.members.filter(member => {
        return member.location === location;
      }));
  })

  return (
    <div className='todo'>
      {local}
    </div>
  );
}

