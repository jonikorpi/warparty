import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Matches } from "../collections/Matches.js";

import Board from './Board';

export default createContainer(({params}) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  // var handle = Meteor.subscribe("todoList", this.props.id);
  //
  // return {
  //   currentUser: Meteor.user(),
  //   listLoading: ! handle.ready(),
  //   tasks: Tasks.find({listId: this.props.id}).fetch(),
  // };

  // const { id } = params;
  // const todosHandle = Meteor.subscribe('todos.inList', id);
  // const loading = !todosHandle.ready();
  // const list = Lists.findOne(id);
  // const listExists = !loading && !!list;
  //
  // return {
  //   loading,
  //   list,
  //   listExists,
  //   todos: listExists ? list.todos().fetch() : [],
  // };

  let match = false;

  if (params.matchID) {
    Meteor.subscribe("matches", params.matchID);
    // TODO: show an error somehow if the match wasn't found

    match = Matches.findOne({_id: params.matchID});
  }

  //
  // game.structures.push(
  //   {
  //     id: 0,
  //     position: [
  //       _.random(2, Variables.tilesPerRow-3),
  //       0,
  //       _.random(0, Variables.tilesPerColumn-1),
  //     ],
  //     duration: _.random(1, 5),
  //   }
  // );

  return {
    match: match,
  };

}, Board);
