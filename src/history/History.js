import React from 'react';

import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';

import { getHistory } from '../graphql/queries';

export default function History() {
    const ListItem = ({ item }) => <li> 
        {item.user} | {item.first} | {item.second} | {item.third} | {item.winner}
    </li>;

    const ListView = ({ entries }) => <ul>
        {entries.map(e => <ListItem item={e} />)}
    </ul>;

    return <Connect query={graphqlOperation(getHistory)}>
        {
            ({ data: { getHistory }, loading, error }) => {
                // console.log(getHistory, loading, error);
                if (error) return (<>Error</>);
                if (loading || !getHistory) return (<>Loading...</>);
                return (<ListView entries={getHistory.entries} />);
            }
        }
    </Connect>;
}