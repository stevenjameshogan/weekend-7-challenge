import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../ReflectionList.css';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Card, { CardContent } from 'material-ui/Card';
import { Delete, ModeEdit, Save, Bookmark, BookmarkBorder } from 'material-ui-icons';
import moment from 'moment';

class ReflectionListItem extends Component {
    constructor(props){
        super(props);
        // establish a state to hold user input data and current edit/bookmark statuses
        this.state = {
            isEditing: false,
            isBookmarked: this.props.reflection.bookmarked,
            // set initial reflection input values as their current values
            reflectionInputs: {
                id: this.props.reflection.id,
                topic: this.props.reflection.topic,
                description: this.props.reflection.description,
                bookmarked: this.props.reflection.bookmarked
            }
        }
    }
    // delete unique reflection by sending dispatch to sagas
    deleteReflection = () => {
        this.props.dispatch({
            type: 'DELETE_REFLECTION',
            payload: this.props.reflection
        });
    }
    // bookmark unique reflection by sending dispatch to sagas
    bookmarkReflection = () => {
        // toggle bookmarked status for rendering
        this.setState({
            isBookmarked: !this.state.isBookmarked
        });
        this.props.dispatch({
            type: 'UPDATE_REFLECTION',
            payload:  {...this.state.reflectionInputs, bookmarked: !this.props.reflection.bookmarked}
        });
    }
    // edit/update unique reflection by sending dispatch to sagas
    updateReflection = () => {
        // set editing variable to false, for component render logic below
        this.setState({
            isEditing: false,
        });
        this.props.dispatch({
            type: 'UPDATE_REFLECTION',
            payload: this.state.reflectionInputs
        })
    }
    // toggles edit mode, for component render logic below
    handleEditClick = () => {
        this.setState({
            isEditing: true
        }) 
    }
    // save/capture user inputs so if a reflection is edited we have the new inputs
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
        // format date
        let dateAdded = moment(this.props.reflection.date).format('MMM Do YYYY');
        // If in "edit" mode, render the following:
        if (this.state.isEditing) {
            return(
                <li className="li">
                    <Card className="reflectionCard">
                        <CardContent className="reflectionEdit">
                            <TextField  type="text" value={this.state.reflectionInputs.topic} onChange={this.handleEditInput("topic")}
                                placeholder={this.props.reflection.topic}></TextField >
                            <br/>
                            <TextField value={this.state.reflectionInputs.description} type="text"
                                onChange={this.handleEditInput("description")} multiline fullWidth
                                placeholder={this.props.reflection.description}>
                            </TextField >
                            <div class="buttonBar">
                                <IconButton variant="raised" onClick={this.updateReflection}><Save/></IconButton>
                                <IconButton className="deleteBtn"  variant="raised" onClick={this.deleteReflection}><Delete/></IconButton>
                            </div>
                        </CardContent>
                    </Card>
                </li>)
        }
        // If not editing but the reflection is bookmarked, render the following
        else if (this.state.isBookmarked){
            return(
                <li className="li">
                    <Card className="reflectionCard">
                        <CardContent className="reflectionItem">
                            <h4>{this.props.reflection.topic}<span> - {dateAdded}</span></h4>
                            <p>{this.props.reflection.description}</p>
                            <div  className="buttonBar">
                                <IconButton variant="raised" onClick={this.handleEditClick}><ModeEdit/></IconButton>
                                <IconButton className="deleteBtn" variant="raised" onClick={this.deleteReflection}><Delete/></IconButton>
                                <IconButton variant="raised" color="primary" onClick={this.bookmarkReflection}>
                                <Bookmark/></IconButton>
                            </div>
                        </CardContent>
                    </Card>
                </li>
            )
        }   // If not editing and the reflection is not bookmarked, render the following
            return(
                <li className="li">
                    <Card className="reflectionCard">
                        <CardContent className="reflectionItem">
                            <h4>{this.props.reflection.topic}<span> - {dateAdded}</span></h4>
                            <p>{this.props.reflection.description}</p>
                            <div className="buttonBar">
                                <IconButton variant="raised" onClick={this.handleEditClick}><ModeEdit/></IconButton>
                                <IconButton className="deleteBtn" variant="raised" onClick={this.deleteReflection}><Delete/></IconButton>
                                <IconButton variant="raised" onClick={this.bookmarkReflection}>
                                <BookmarkBorder/></IconButton>
                            </div>
                        </CardContent>
                    </Card>
                </li>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
  });

export default connect(mapReduxStateToProps) (ReflectionListItem);