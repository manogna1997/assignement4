import React from 'react';
import ReactDOM from 'react-dom';
import Inventory from './Inventory.jsx'
import '../css/app.css'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import {config} from 'dotenv';

config()
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:3000/graphql',
    })
});
/**
 * render to index.html page
 */
ReactDOM.render(<ApolloProvider client={client}><Inventory/></ApolloProvider> , document.getElementById('root'));
