import React from 'react';

export function location(props) {
  console.log('location prop', props)
  const { location } = props;
  return <div id={props.name}>{props.name}</div>;
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

