import React from 'react';

import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import { getLeaderboard } from '../graphql/queries';


export default function Leaderboard() {
    const ListItem = ({ item }) => <li>
        {item.user} | {item.score} | {item.wins}
    </li>;

    const ListView = ({ entries }) => <ol>
        {entries.map(e => <ListItem item={e} />)}
    </ol>;

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