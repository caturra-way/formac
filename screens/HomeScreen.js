import React from 'react';
import {
    SQLite
} from 'expo';
import {
    Text,
    View,
    FlatList
} from 'react-native';
import {
    ListItem,
    Icon
} from 'react-native-elements'

const DB = SQLite.openDatabase('db');

function insertPlayer(name) {
    console.log('insert Player, name:' + name)

    DB.transaction(tx => {
            tx.executeSql(
                `insert into players (name) values (?);`,
                [name]
            );
        },
        () => {
            console.log('fail')
        },
        () => {
            console.log('success')
        },
    );
}

function insertTestData() {
    console.log('insertTestData')
    console.log(DB)
    insertPlayer("Sato")
    insertPlayer("Ito")
    insertPlayer("Kato")
}

insertTestData()

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            players: null
        }
    }

    componentWillMount() {
        DB.transaction(tx => {
            tx.executeSql(
                    'create table if not exists players (id integer primary key not null, name text);'
                ),
                null,
                DB.transaction(tx => {
                    tx.executeSql(
                        'select * from players',
                        null,
                        (_, {
                            rows: {
                                _array
                            }
                        }) => this.setState({
                            players: _array
                        })
                    )
                })
        })
    }

    static navigationOptions = {
        title: 'players'
    };

    render() {
        const {
            players
        } = this.state

        return ( <
            FlatList data = {
                players
            }
            renderItem = {
                ({
                    item
                }) => {
                    return ( <
                        ListItem key = {
                            item.id.toString()
                        }
                        title = {
                            item.name
                        }
                        />
                    )
                }
            }
            keyExtractor = {
                item => item.id.toString()
            }
            />
        );
    }
}