import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import '../ReflectionList.css'

class ReflectionListItem extends Component {
    
    render() {
        return(
            <li>
                <div className="reflectionContainer">
                    <div className="reflectionItem">
                        <p>{this.props.reflection.topic}</p>
                        <p>Added on 4/20/2018</p>
                        <p>{this.props.reflection.description}</p>
                    </div>
                </div>
            </li>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
  });

export default connect(mapReduxStateToProps) (ReflectionListItem);