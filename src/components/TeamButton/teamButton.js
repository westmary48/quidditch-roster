import $ from 'jquery';

import dataGetter from '../../helpers/dataGetter';
import createPlayerList from '../PlayerList/playerList';

import './teamButton.scss';

const createTeamButton = (team) => {
  const domString = `
    <button id="${team.id}" class="team-button team-button-${team.name.toLowerCase()}">
      <div>${team.name}</div>
      <img src="${team.picture}">
    </button>
  `;
  return domString;
};

const buttonEventFunction = (e) => {
  const teamId = e.target.closest('button').id;
  dataGetter
    .getPlayersByTeam(teamId)
    .then((players) => {
      dataGetter
        .getFullPlayerInfo(players)
        .then((filteredPlayerArray) => {
          $('#main-container').html(createPlayerList(filteredPlayerArray));
        });
    })
    .catch((error) => {
      console.error('Error in getting filtered players', error);
    });
};

export default { createTeamButton, buttonEventFunction };
