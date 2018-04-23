import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import ReflectionListItem from '../ReflectionList/ReflectionListItem/ReflectionListItem'


class ReflectionList extends Component {

    // Retrieve reflections by sending a dispatch to sagas 
    componentDidMount(){
        this.props.dispatch({
            type: 'GET_REFLECTIONS'
        });
    }

    render() {
        // map over array of reflections to create a unique element (li) for each
        let reflectionListItems = this.props.reduxState.reflectionList.map((reflection) => {
            return(<ReflectionListItem key={reflection.id} reflection={reflection} />)
        })
        return(
            <div id="refDiv">
                <ul>
                    {reflectionListItems}
                </ul>
            </div>
            )
    }
}
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps) (ReflectionList);