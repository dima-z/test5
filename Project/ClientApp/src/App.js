import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Table from './components/Table';
import Form from './components/Form';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/form' component={Form} />
        <Route path='/table' component={Table} />
      </Layout>
    );
  }
}
