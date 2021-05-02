import React from 'react';
import PropTypes from 'prop-types';

export default class InfoModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open:false
    }
  }
 
  toggleInfo(){
    this.setState({open: this.state.open ? false : true})
  }
  
  render(state,props) {
 
    return (
      <>
        <div className="btn-show-info" onClick={()=>this.toggleInfo()}>i</div>
        {this.state.open && <div className="info"><h3>{this.props.title}</h3>
        <p>{this.props.text}</p>
        </div>}
      </>
    );
  }
};


InfoModal.propTypes = {
  text:PropTypes.string,
  title:PropTypes.string,
};

InfoModal.defaultProps = {
  title: 'cool',
  text:'Blah blah. todo: change to markdown'
};
