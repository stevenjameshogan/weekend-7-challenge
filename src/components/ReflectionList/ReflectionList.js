import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import ReflectionListItem from '../ReflectionList/ReflectionListItem/ReflectionListItem'


class ReflectionList extends Component {


    componentDidMount(){
        this.props.dispatch({
            type: 'GET_REFLECTIONS'
        })
    }

    render() {
        let reflectionListItems = this.props.reduxState.reflectionList.map((reflection) => {
            return(<ReflectionListItem key={reflection.id} reflection={reflection} />)
        })
        return(
            <div>
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