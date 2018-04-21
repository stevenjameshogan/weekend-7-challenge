import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import '../ReflectionList.css';
import Button from 'material-ui/Button';

class ReflectionListItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            isBookmarked: false
        }
    }

    deleteReflection = () => {
        this.props.dispatch({
            type: 'DELETE_REFLECTION',
            payload: this.props.reflection
        })
    }

    bookmarkReflection = () => {
        let refToBookmark = this.props.reflection;
        refToBookmark.bookmarked = !refToBookmark.bookmarked;
        this.props.dispatch({
            type: 'UPDATE_REFLECTION',
            payload: refToBookmark
        })
        this.setState({
            isBookmarked: !this.state.isBookmarked
        })
    }
    
    render() {
        if (this.props.reflection.bookmarked === false){
            return(
                <li>
                <div className="reflectionContainer">
                    <div className="reflectionItem">
                        <p>{this.props.reflection.topic}</p>
                        <p>Added on 4/20/2018</p>
                        <p>{this.props.reflection.description}</p>
                        <p>{this.state.isBookmarked}</p>
                        <Button variant="raised" onClick={this.deleteReflection}>Delete</Button>
                        <Button variant="raised" color="primary" onClick={this.bookmarkReflection}>Bookmark</Button>
                    </div>
                </div>
            </li>
            )
        }
        return(
            <li>
                <div className="reflectionContainer">
                    <div className="reflectionItem">
                        <p>{this.props.reflection.topic}</p>
                        <p>Added on 4/20/2018</p>
                        <p>{this.props.reflection.description}</p>
                        <p>True</p>
                        <Button variant="raised" onClick={this.deleteReflection}>Delete</Button>
                        <Button variant="raised" color="primary" onClick={this.bookmarkReflection}>Bookmark</Button>
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