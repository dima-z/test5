import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hi, here!</h1>
        <p>Welcome to my new single-page application!</p>
        <p>What do we have here:</p>
        <ul>
          <li>ASP.NET Core and C# for cross-platform server-side code</li>
          <li>Entity Framework ORM and Microsoft Sql server for storing and managing data</li>
          <li>React for client-side code</li>
          <li>Bootstrap for layout and styling</li>
        </ul>
      </div>
    );
  }
}
