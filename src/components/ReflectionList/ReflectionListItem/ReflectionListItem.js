import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import '../ReflectionList.css';
import Button from 'material-ui/Button';

class ReflectionListItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            isEditing: false,
            isBookmarked: this.props.reflection.bookmarked,
            reflectionInputs: {
                id: this.props.reflection.id,
                topic: this.props.reflection.topic,
                description: this.props.reflection.description,
                bookmarked: this.props.reflection.bookmarked
            }
        }
    }

    deleteReflection = () => {
        this.props.dispatch({
            type: 'DELETE_REFLECTION',
            payload: this.props.reflection
        });
    }
    bookmarkReflection = () => {
        // this.props.reflection.bookmarked = !this.props.reflection.bookmarked
        console.log(this.props.reflection.bookmarked);
        
        this.setState({
            isBookmarked: !this.state.isBookmarked,
            reflectionInputs: {
                bookmarked: !this.state.reflectionInputs.bookmarked
            }
        });
        console.log(this.state.reflectionInputs);
        
        this.props.dispatch({
            type: 'UPDATE_REFLECTION',
            payload:  this.state.reflectionInputs
        });
    }
    updateReflection = () => {
        this.setState({
            isEditing: false,
        });
        console.log('updated', this.state.reflectionInputs);
        this.props.dispatch({
            type: 'UPDATE_REFLECTION',
            payload: this.state.reflectionInputs
        })
    }

    handleEditClick = () => {
        this.setState({
            isEditing: true
        }) 
    }

    handleEditInput = (propertyName) => {
        return (event) => {
            this.setState({
                reflectionInputs: {
                    ...this.state.reflectionInputs,
                    [propertyName]: event.target.value
                }
            })
        }
    };

    render() {
        if (this.state.isEditing) {
            return(
            <li>
                <div className="reflectionContainer">
                    <div className="reflectionEdit">
                        <input type="text" value={this.state.reflectionInputs.topic} onChange={this.handleEditInput("topic")}
                            placeholder={this.props.reflection.topic}></input>
                        <br/>
                        <textarea value={this.state.reflectionInputs.description} type="text"
                            onChange={this.handleEditInput("description")} cols="40" rows="6" 
                            placeholder={this.props.reflection.description}>
                        </textarea>
                        <Button variant="raised" onClick={this.updateReflection}>Save</Button>
                        <Button variant="raised" onClick={this.deleteReflection}>Delete</Button>
                    </div>
                </div>
            </li>)
        }
        else if (this.state.isBookmarked){
            return(
                <li>
                <div className="reflectionContainer">
                    <div className="reflectionItem">
                        <p>{this.props.reflection.topic}</p>
                        <p>Added on 4/20/2018</p>
                        <p>{this.props.reflection.description}</p>
                        <Button variant="raised" onClick={this.handleEditClick}>Edit</Button>
                        <Button variant="raised" onClick={this.deleteReflection}>Delete</Button>
                        <Button variant="raised" color="primary" onClick={this.bookmarkReflection}>Unmark</Button>
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
                            <Button variant="raised" onClick={this.handleEditClick}>Edit</Button>
                            <Button variant="raised" onClick={this.deleteReflection}>Delete</Button>
                            <Button variant="raised" onClick={this.bookmarkReflection}>Bookmark</Button>
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