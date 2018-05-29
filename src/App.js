import React from 'react';
import  './App.css';
import ArticleApi from './ArticleApi.js'
import SavedSearch from './SavedSearch.js'

class App extends React.Component {
  render() {
    return (
          <div >
            <div className='flexbox-container'>
            <ArticleApi  className='main' />
            <SavedSearch className='sidebar' />
            </div>
           </div>
        )
  }
}

export default App;
