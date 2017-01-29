// import React from 'react';
import React, { Component, PropTypes } from 'react'

export function gamePiece(member, dispatch) {
  function handleClick(e) {
    e.stopPropagation();
    dispatch(member);
  }
  let divStyle = {backgroundImage: 'url(assets/' + member + '.png)'};
  // let src = {'assets/' + member + '.png)'};
  return (
    <img className='game-piece' id={member} key={member} onClickCapture={handleClick} src={'assets/' + member + '.png'} />
    );
  // return <div className='game-piece' id={member} key={member} onClickCapture={handleClick} style={divStyle}></div>;
}

export function locationAreas(location, dispatches) {
  let members;
  if(location.members) {
   members = location.members.map(member => {
      if (member !== '') {
        return gamePiece(member, dispatches.selectGamePiece);  
      }
      
    });  
  }
  

  function handleClick(e) {
    e.stopPropagation();
    dispatches.selectedLocation(location.name);
  }
  let id = location.name.replace(/ /g,'');

  return (<div id={id} className='location' key={location.name} onClick={handleClick}>
    <span className='location-name'>{location.name}</span>
    <div className='members-container'>{members}</div>
  </div>);
}

export function Box(props) {
  const { locations } = props.box;
  const { dispatches } = props;
  let local = locations.map(location => {
    return locationAreas(location, dispatches);
  });
  return (
    <div className='lotr'>
      {local}
    </div>
  );
}