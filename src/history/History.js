import React from 'react';

import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';

import { getHistory } from '../graphql/queries';

import './History.css';

export default function History() {
    const ListItem = ({ item }) => <tr>
        <td>{(item.winner) ? "🥇" : "☹" }</td>
        <td>{item.first}</td>
        <td>{item.second}</td>
        <td>{item.third}</td>
        <td>{item.date}</td>
    </tr>;

    const ListView = ({ entries }) => <table className="history-view">
        {entries.map(e => <ListItem item={e} />)}
    </table>;

    function filterEntries(entries) {
        return entries
            .map(e=>e)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .reverse().slice(0, 15);
    }

    return <Connect query={graphqlOperation(getHistory)}>
        {
            ({ data: { getHistory }, loading, error }) => {
                // console.log(getHistory, loading, error);
                if (error) return (<>Error</>);
                if (loading || !getHistory) return (<>Loading...</>);
                return (<ListView entries={filterEntries(getHistory.entries)} />);
            }
        }
    </Connect>;
}