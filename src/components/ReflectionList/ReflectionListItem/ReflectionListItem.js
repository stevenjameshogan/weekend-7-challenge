import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import '../ReflectionList.css'

class ReflectionListItem extends Component {

    deleteReflection = () => {
        this.props.dispatch({
            type: 'DELETE_REFLECTION',
            payload: this.props.reflection
        })
    }

    bookmarkReflection = () => {
        let refToBookmark = this.props.reflection;
        refToBookmark.bookmarked = !refToBookmark.bookmarked;
        axios.put(`/reflection/${refToBookmark.id}`, refToBookmark).then((response) => {
        }).catch((error) => {
            console.log('error bookmarking', error);
        })
    }
    
    render() {
        return(
            <li>
                <div className="reflectionContainer">
                    <div className="reflectionItem">
                        <p>{this.props.reflection.topic}</p>
                        <p>Added on 4/20/2018</p>
                        <p>{this.props.reflection.description}</p>
                        <p>{this.props.reflection.bookmarked}</p>
                        <button onClick={this.deleteReflection}>Delete</button>
                        <button onClick={this.bookmarkReflection}>Bookmark</button>
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