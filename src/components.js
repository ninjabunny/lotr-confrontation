// import React from 'react';
import React, { Component, PropTypes } from 'react'

export function getFaction(member) {
  let key = ['balrog', 'blackrider', 'cavetroll', 'nazgul', 'orcs', 'saruman', 'shelob', 'warg', 'witchking'];
  if (key.indexOf(member) > -1) {
      return 'sauron';
  } else {
      return 'fellowship';
  }
}

export function gamePiece(member, props) {
  const { faction } = props.box;
  const { dispatches } = props;
  function handleClick(e) {
    e.stopPropagation();
    dispatches.selectGamePiece(member);
  }
  let divStyle = {backgroundImage: 'url(assets/' + member + '.png)'};
  let classes = getFaction(member) === faction ? '' : 'notme';
  classes += member === props.box.selected.member ? 'selected' : '';
  return (<div className='game-piece'>
    <img className={classes} id={member} key={member} onClickCapture={handleClick} src={'assets/' + member + '.png'} />
    </div>
    );
}

export function notDeadPiece(member) {
  let divStyle = {backgroundImage: 'url(assets/' + member + '.png)'};
  return (<div className='dead-piece'>
    <img key={member} src={'assets/' + member + '.png'} />
    </div>
    );
}

export function locationAreas(location, props) {
  const { locations, faction } = props.box;
  const { dispatches } = props;
  let members;
  if(location.members) {
   members = location.members.map(member => {
      if (member !== '') {
        return gamePiece(member, props);  
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
  const { locations, faction } = props.box;
  const { dispatches } = props;

  let notDeadList = locations.map(location => {
    return location.members.filter(member => {
      return getFaction(member) !== faction && member !== "";
    });
  }).reduce((a, b) => {
    return a.concat(b);
  }, []).sort();
  function handleClick(e) {
    e.stopPropagation();
    dispatches.toggleFaction();
  }
  function deleteSelected(e) {
    e.stopPropagation();
    dispatches.deleteSelected();
  }

  let local = locations.map(location => {
    return locationAreas(location, props);
  });

  let notDead = notDeadList.map(member => {
    return notDeadPiece(member);
  });

  return (
    <div >
      <div className='lotr'>{local}</div>
      <button key='2' onClickCapture={handleClick}>Toggle Faction</button>
      <button key='3' onClickCapture={deleteSelected}>Delete Selected</button>
      <div id='notDead' key='notDead'><span id='deadTitle'>Who is left?</span>{notDead}</div>
    </div>
  );
}