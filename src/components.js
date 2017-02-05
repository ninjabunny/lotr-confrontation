
import React, { Component, PropTypes } from 'react'

export function gamePiece(member, props) {
  const { faction } = props.box;
  const { dispatches } = props;
  function handleClick(e) {
    e.stopPropagation();
    dispatches.selectGamePiece(member);
  }
  let divStyle = {backgroundImage: 'url(assets/' + member + '.png)'};
  let classes = characters[member].faction === faction ? '' : 'notme';
  classes += member === props.box.selected.member ? 'selected' : '';
  return (<div className='game-piece'>
    <img title={characters[member].title} className={classes} id={member} key={member} onClickCapture={handleClick} src={'assets/' + member + '.png'} />
    </div>
    );
}

export function notDeadPiece(member) {
  let divStyle = {backgroundImage: 'url(assets/' + member + '.png)'};
  return (<div className='dead-piece'>
    <img  title={characters[member].title} className='notDead' key={member} src={'assets/' + member + '.png'} />
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

function info() {
  return (<div>
    <h3>Cards:</h3>
    <span>Fellowship Cards: 1-5 strength modifiers, Magic, Nobel Sacrifice, Elven Cloak (ignore sauron strength card), Retreat (backwards).</span><br/>
    <span>Sauron Cards: 1-6 strength modifiers, Magic, Eye of Sauron (fellowship card text is ignored), Retreat (sideways)</span>
    </div>
    );
}

export function Box(props) {
  const { locations, faction, msgs} = props.box;
  const { dispatches } = props;

  let notDeadList = locations.map(location => {
    if (location.members) {
      return location.members.filter(member => {
        if (member !== '') {
          return characters[member].faction !== faction && member !== "" && member !== undefined;
        }
        
      });  
    }
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
    if (member) {
      return notDeadPiece(member);  
    }
  });
  let messages;
  if (msgs) {
    messages = msgs.map(msg => {
      return (<span className={msg.faction}>{msg.text}</span>)
    });  
  }

  return (
    <div >
      <div className='lotr'>{local}</div>
      <button key='2' onClickCapture={handleClick}>Toggle Faction</button>
      <button key='3' onClickCapture={deleteSelected}>Delete Selected</button>
      <div id='msgs'>{messages}</div>
      <div id='notDead' key='notDead'><h3 id='deadTitle'>Who is left?</h3>{notDead}</div>
      {info()}
      <h3>More Info:</h3>
      <a href='assets/confdeluxerules.pdf' target="_blank">PDF Rules</a>
    </div>
  );
}

const characters = {
  frodo: {
    name: 'FRODO',
    title: "FRODO (1): Frodo can retreat sideways when attacked, but not if he himself is the attacker. Frodo can only use his ability to retreat at the beginning of a battle, and not after cards have already been played. The retreat does not count as a normal move. Frodo can never retreat sideways in the mountains.",
    faction: 'fellowship'
  },
  sam: {
    name: 'SAM',
    title: "SAM (2): If Sam is in the same region as Frodo, and Frodo is attacked first, the Fellowship player may reveal Sam and replace Frodo in the battle. If Sam replaces Frodo in battle with the Orcs (classic version), the Orcs immediately defeat Sam. Sam is strength 5 when in the same region as Frodo, but the Fellowship player must reveal both Frodo and Sam at the beginning of a battle in order to prove Sams strength. In battle against the Warg, the text on the Fellowship characters (and therefore also Sam's special ability, including his ability to replace Frodo) is ignored. Since the character limit in mountain regions is one, Sam can never accompany Frodo in the mountains.",
    faction: 'fellowship'
  },
  pippin: {
    name: 'PIPPIN',
    title: "PIPPIN (1): When Pippin attacks, he can retreat backwards to an adjacent region after both characters have been revealed for battle. Pippin can only use his ability to retreat at the beginning of battle, and not after cards have already been played. The retreat does not count as a normal move.",
    faction: 'fellowship'
  },
  merry: {
    name: 'MERRY',
    title: "MERRY (2): Merry defeats the Witch King immediately before any cards are played. In battles against all other enemies, the usual rules apply.",
    faction: 'fellowship'
  },
  gandalf: {
    name: 'GANDALF',
    title: "GANDALF (5): In a battle against Gandalf, should the battle come to playing cards, the Sauron player must choose and play his card first. After the Sauron player has revealed his card, the Fellowship player chooses and plays his card (the Fellowship player must play a card, even if the Sauron player played his 'Retreat' card). If the Sauron player plays his 'Magic' card (see above), he must completely resolve it and reveal his new card before the Fellowship player must choose and play a card.",
    faction: 'fellowship'
  },
  aragorn: {
    name: 'ARAGORN',
    title: "ARAGORN (4): Aragorn can move into any adjacent region (forwards, sideways, or backwards) if he attacks at least one enemy character by doing so. Otherwise, Aragorn can only move forward into an adjacent region like the other characters. Aragorn can attack the Warg using his special ability, since he uses his ability before he enters the region with the Warg. Aragorn cannot attack sideways in the mountains.",
    faction: 'fellowship'
  },
  legolas: {
    name: 'LEGOLAS',
    title: "LEGOLAS (3): Legolas defeats the Flying Nazgul immediately, before any cards are played. In battles against all other enemies, the usual rules apply.",
    faction: 'fellowship'
  },
  gimli: {
    name: 'GIMLI',
    title: "GIMLI (3): Gimli defeats the Orcs immediately, before any cards are played. In battles against all other enemies, the usual rules apply.",
    faction: 'fellowship'
  },
  boromir: {
    name: 'BOROMIR',
    title: "BOROMIR (0): If Boromir is in a battle, both characters are defeated immediately. The only exceptions are the Warg (in which case Boromir's ability is ignored for that battle) and when Boromir uses the Tunnel of Moria while the Balrog occupies Caradhras (in which case Boromir is defeated without a battle).",
    faction: 'fellowship'
  },
  balrog: {
    name: 'BALROG',
    title: "BALROG (5): If the Balrog is in the Caradhras region when a Fellowship character uses the Tunnel of Moria (moving from Eregion directly to Fangorn), the Sauron player may reveal the Balrog to instantly defeat the Fellowship character without a battle (even Frodo). The Balrog itself remains unharmed. Even Boromir cannot harm the Balrog in this situation. A Fellowship character that is defeated by the Balrog when traveling through the Tunnel of Moria never reaches Fangorn, so any Sauron character in Fangorn is not revealed.",
    faction: 'sauron'
  },
  shelob: {
    name: 'SHELOB',
    title: "SHELOB (5): If not in Gondor, and Shelob defeats a Fellowship character, she is immediately returned to Gondor. Upon returning, if there are already two other Sauron characters in Gondor, or if there are one or more Fellowship characters in Gondor, she is immediately defeated and removed from the game.",
    faction: 'sauron'
  },
  witchking: {
    name: 'WITCH KING',
    title: "WITCH KING (5): The Witch King can move sideways into an adjacent region if he attacks at least one Fellowship character by doing so. Otherwise he can only move forward into an adjacent region like the other characters. He can never attack sideways in the mountains. If the Witch King encounters Frodo in a sideways attack, Frodo may retreat sideways to the region previously occupied by the Witch King, as long as no other Sauron character is there.",
    faction: 'sauron'
  },
  nazgul: {
    name: 'FLYING NAZGUL',
    title: "FLYING NAZGUL (3): The Flying Nazgûl can move to any region on the board, as long as that region is occupied by a single Fellowhip character. This can potentially allow a Flying Nazgûl to attack an adjacent mountain region. Otherwise, for moving into any other region, the Flying Nazgûl is restricted to the normal movement rules.",
    faction: 'sauron'
  },
  blackrider: {
    name: 'BLACK RIDER',
    title: "BLACK RIDER (3): The Black Rider can move forward any number of regions if he attacks at least one Fellowship character by doing so. If the Black Rider does not want to attack, then he can only move forward into an adjacent region following the normal movement rules. The Black Rider may never move into or through a region already containing the maximum number of Sauron characters, nor may he move through a region occupied by one or more Fellowship characters.",
    faction: 'sauron'
  },
  saruman: {
    name: 'SARUMAN',
    title: "SARUMAN (4): Saruman can decide that no cards shall be used in a battle in which he participates. If no characters are defeated (or retreat) before Combat Cards are played, then the Sauron player may choose that the battle will be decided by the character's Strength values only. All other normal rules for battle apply. If Aragorn (variant version) decides not to use his ability, Saruman may then decide that no cards shall be used instead.",
    faction: 'sauron'
  },
  orcs: {
    name: 'ORCS',
    title: "ORCS (2): When the Orcs attack, they immediately defeat the first Fellowship character attacked in the region. Gimli immediately defeats the Orcs and is therefore unharmed in any battle against them. If the Orcs attack Boromir, both characters are defeated. If there are additional Fellowship characters in the region, the Orc's special ability is ignored for those subsequent battles. The Orcs have no special ability if attacked by a Fellowship character. If the Orcs attack Frodo first, Frodo may retreat sideways before the Orcs can defeat him. In this particular case, this is still considered the first attack by the Orcs, and they will have no special ability for the remainder of the turn (this is also the case if the Fellowship player uses his 'Gwaihir'the Windlord” Special Card on the first character). If the Orcs attack Smeagol and there are no other Fellowship characters in his region, Smeagol may switch position with an adjacent Fellowship character, before the Orcs can defeat him. In this particular case, no battle is considered to have been fought, and the Orcs will attack the new character as if that was their first attack.",
    faction: 'sauron'
  },
  warg: {
    name: 'WARG',
    title: "WARG (2): In battle against the Warg, the Fellowship character's text has no effect. Aragorn can use his ability since he uses his ability in the adjacent region, before the battle against the Warg. Treebeard can use his ability to attack into Fangorn since he uses his ability before the battle against the Warg. Treebeard's Strength value is not increased to 6 in Fangorn when in battle against the Warg there. and discard the battle.",
    faction: 'sauron'
  },
  cavetroll: {
    name: 'CAVE TROLL',
    title: "CAVE TROLL (9): When it comes to playing cards in a battle with the Cave Troll, the Sauron player's card is ignored. The Sauron player must still play and discard a card, even though that card has no effect in the battle.",
    faction: 'sauron'
  }
}