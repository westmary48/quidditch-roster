import axios from 'axios';

const getAllPlayersFromDb = () => axios.get('http://localhost:3003/players');

const getPlayersByTeam = teamId => new Promise((resolve, reject) => {
  axios
    .get('http://localhost:3003/players')
    .then((data) => {
      const allPlayers = data.data;
      const correctPlayers = allPlayers.filter(x => x.teamId === teamId);
      resolve(correctPlayers);
    })
    .catch((err) => {
      reject(err);
    });
});

const getAllTeamsFromDb = () => axios.get('http://localhost:3003/teams');

const getAllPositionsFromDb = () => axios.get('http://localhost:3003/positions');

const getFullPlayerInfo = players => Promise.all([getAllTeamsFromDb(), getAllPositionsFromDb()])
  .then((dataArray) => {
    const playersFromDb = players;
    const teamsFromDb = dataArray[0].data;
    const positionsFromDb = dataArray[1].data;
    const newPlayers = [];
    playersFromDb.forEach((player) => {
      const newPlayer = player;
      teamsFromDb.forEach((team) => {
        if (player.teamId === team.id) {
          newPlayer.team = team.name;
        }
      });
      positionsFromDb.forEach((position) => {
        if (player.positionId === position.id) {
          newPlayer.position = position.name;
        }
      });
      newPlayers.push(newPlayer);
    });
    return Promise.resolve(newPlayers);
  })
  .catch((error) => {
    console.error({ error });
  });

export default {
  getAllPlayersFromDb,
  getPlayersByTeam,
  getAllTeamsFromDb,
  getFullPlayerInfo,
};
