import React from "react";
import {withTracker} from "meteor/react-meteor-data";
import PropTypes from 'prop-types';
import {Meteor} from "meteor/meteor";
import {Notes} from "../api/notes";
import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";



export class NoteList extends React.Component  {
    constructor(props) {
        super(props);
    }
    renderNotes() {
        if(this.props.notes.length ===0) {
            return (
                <div>
                    <p> No notes found... </p>
                </div>
            );

        }

        return this.props.notes.map ((note)=>{
            return <NoteListItem key = {note._id} note={note}/>
        });
    }

    render () {
        return (
            <div>
                <NoteListHeader/>
                {this.renderNotes()}

                Note List {this.props.notes.length}
            </div>
        );
    }
}

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
};

export default withTracker( () => {
    Meteor.subscribe('notes');
    return {
        notes: Notes.find().fetch()
    };
}) (NoteList);