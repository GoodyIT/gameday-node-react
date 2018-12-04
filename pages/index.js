import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Games from '../components/Games';
import config from '../config';

class Index extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      games: [],
      isLoading: false,
      alerts: [],
    };
    
    this.fetchData();
  }

  async fetchData() {
    let result;
    try {
      result = await axios.get(`${config.baseUrl}/api/v1/stats`);
      const hasEmptyResults = result.count === 0;
      const alerts = [];

      if (hasEmptyResults) {
        alerts.push({type: 'info', message: 'There are 0 results.'})
      }

      this.setState({
        games: result.data,
        isLoading: false,
        alerts,
      }, () => {
        console.log('Games', this.state.games);
      });
      
    } catch (err) {
      console.log('ERROR', err);
    }
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>Rotogrinders - Game Day</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          {/*<link href="https://rical-rg.s3.amazonaws.com/css/styleguide.css" rel="stylesheet" />*/}
          <link href="https://assets.rotogrinders.com/css/_global.css" rel="stylesheet" />
        </Head>
        <div className="container">
          <Games games={this.state.games} />
        </div>
        <Footer />
      </Layout>
    );
  }
}

export default Index;
