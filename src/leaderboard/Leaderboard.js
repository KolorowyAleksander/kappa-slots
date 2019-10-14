import React from 'react';

import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import { getLeaderboard } from '../graphql/queries';

import './Leaderboard.css';

export default function Leaderboard() {
    const ListItem = ({ item }) => <>
        <tr>
            <td> {item.user} </td>
            <td> {item.score} </td>
            <td> {item.wins} </td>
        </tr>
    </>;

    const ListView = ({ entries }) => <div className="leaderboard-view">
        <tr>
            <th>USER</th>
            <th>SCORE</th>
            <th>WINS</th>
        </tr>
        {entries.map(e => <ListItem item={e} />)}
    </div>;

    return <Connect query={graphqlOperation(getLeaderboard)}>
        {
            ({ data: { getLeaderboard }, loading, error }) => {
                // console.log(getLeaderboard, loading, error);
                if (error) return (<>Error</>);
                if (loading || !getLeaderboard) return (<>Loading...</>);
                return (<ListView entries={getLeaderboard.entries} />);
            }
        }
    </Connect>;
}