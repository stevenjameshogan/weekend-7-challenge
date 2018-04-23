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
        this.setState({
            isBookmarked: !this.state.isBookmarked
        });
        this.props.dispatch({
            type: 'UPDATE_REFLECTION',
            payload:  {...this.state.reflectionInputs, bookmarked: !this.props.reflection.bookmarked}
        });
    }
    updateReflection = () => {
        this.setState({
            isEditing: false,
        });
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
        let dateAdded = moment(this.props.reflection.date).format('MMM Do YYYY');
        if (this.state.isEditing) {
            return(
            <li>
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
        else if (this.state.isBookmarked){
            return(
                <li>
                    <Card className="reflectionCard">
                        <CardContent className="reflectionItem">
                            <h4>{this.props.reflection.topic} -- <span>Added {dateAdded}</span></h4>
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
        }
            return(
                <li>
                    <Card className="reflectionCard">
                        <CardContent className="reflectionItem">
                            <h4>{this.props.reflection.topic} -- <span>Added {dateAdded}</span></h4>
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