import React from 'react';
import axios from 'axios';


export default class SavedSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      pins: [],
      numberOfitemsShown: 5,
    }
  }


fetchedData = () => {
    axios.get(`https://www.grailed.com/api/merchandise/marquee`)
      .then(res => {
        console.log('Current Response:',res)
         this.setState({
          pins: res.data.data,
        })
      })
      .catch(error => {
        return ('Looks like there was a problem: \n', error);
      });
  }

showMore = () => {
    if (this.state.numberOfitemsShown + 3 <= this.state.pins.length) {
      this.setState(state => ({ numberOfitemsShown: state.numberOfitemsShown + 3 }));
    } else {
      this.setState({ numberOfitemsShown: this.state.pins.length })
    }
  }

componentDidMount() {
   this.fetchedData()
  }


render() {

const itemsToShow = this.state.pins.map((pin, idx) => 
  <div key={idx}   className="articleContent">
    <p className="title">{pin.name}</p>
    <img alt="savedImg" src={`https://cdn.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/rotate=deg:exif/rotate=deg:0/resize=width:300,fit:crop/output=format:jpg,compress:true,quality:95/${pin.image_url}`} />
 </div>
    ).slice(0, this.state.numberOfitemsShown);

    console.log('Current Pins:',this.state.pins)
 return (
      <div>
          <h3 className='animated-title'>SAVED ITEMS:</h3>
        {itemsToShow.length ? itemsToShow : "Loading..."}
         <div className="buttonMargin">
          <button className='button_slide' onClick={this.showMore}>
            SHOW MORE
          </button>
          </div>
      </div>
    );
  }
}


