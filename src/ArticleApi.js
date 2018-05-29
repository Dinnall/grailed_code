import React from 'react';
import axios from 'axios';
import moment from 'moment'

export default class ArticleApi extends React.Component {
  constructor() {
    super();
    this.state = {
      articleFeed: "",
      articlePages: [],
      currentPageIndex: 0
    }
  }

  
fetchData = () => {
    axios.get(`https://www.grailed.com/api/articles/ios_index`)
      .then(res => {
        this.setState({
          articleFeed: res.data.data,
          articlePages: res.data.metadata
        })
      })
      .catch(error => {
        return ('Looks like there was a problem: \n', error);
      });
  }


componentDidMount() {
    this.fetchData()
}

previousPage = () => {
  axios.get(`https://www.grailed.com/${this.state.articlePages.pagination.previous_page}`)
        .then(res => {
          this.setState({
            articleFeed: res.data.data,
            articlePages: res.data.metadata
          })
        })
        .catch(error => {
          return (error);
        });

}

nextPage = () => {
   axios.get(`https://www.grailed.com/${this.state.articlePages.pagination.next_page}`)
      .then(res => {
        this.setState({
          articleFeed: res.data.data,
          articlePages: res.data.metadata
        })
      })
      .catch(error => {
        return (error);
      });
}   

render() {
   let feed = "Loading...";
      if (this.state.articleFeed) {
        feed = this.state.articleFeed.map((ele, idx) => {
          return (
             <div className="box"  key={idx}  >
                <div className="articleContent">
                <img alt="article" src={ele.hero} width="420" height="270"/>
                  <p><strong>{ele.franchise}</strong></p>
                  <h1 className="title"> {ele.title}</h1>
                  <p className="italicDate">{moment(ele.published_at).format('MMM DD, YYYY')}</p>
                </div>
            </div>
        )
      })
    }

return (
      <div >
        <h3 className='animated-title'>ARTICLE FEED</h3>
            {feed}
           <button  className='button_slided' onClick={this.previousPage}>PREVIOUS PAGE</button>
           <button  className='button_slided' onClick={this.nextPage}>NEXT PAGE</button>
       </div>
    )
  }
}