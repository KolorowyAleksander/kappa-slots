/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLeaderboard = `query GetLeaderboard {
  getLeaderboard {
    entries {
      user
      place
      score
      wins
    }
  }
}
`;
export const getHistory = `query GetHistory($user: String!) {
  getHistory(user: $user) {
    entries {
      user
      first
      second
      third
      winner
      date
    }
  }
}
`;
