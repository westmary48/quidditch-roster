import teamButton from '../TeamButton/teamButton';

import './teamButtonGroup.scss';

const createTeamButtonGroup = (teams) => {
  let domString = '<div class="team-button-group">';
  teams.forEach((team) => {
    domString += teamButton.createTeamButton(team);
  });
  domString += '</div>';

  return domString;
};

export default createTeamButtonGroup;
