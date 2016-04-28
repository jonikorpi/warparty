import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import _ from "lodash";

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

  const game = {
    id: 1,
    turn: 0,
    parties: [
      {
        ready: false,
        heroes: [],
      },
      {
        ready: true,
        heroes: [],
      },
    ],
    structures: []
  };

  for (let i = 0; i < Variables.heroesPerParty; i++) {
    game.parties[0].heroes.push(
      {
        position: [0, 0, Variables.tilesPerColumn-1-i],
        items: [
          _.random(1, 3),
          _.random(1, 3),
          _.random(1, 3),
        ],
        effects: [
          {
            type: _.random(0, 2),
            duration: _.random(1, 5),
          },
          {
            type: _.random(0, 2),
            duration: _.random(1, 5),
          },
        ],
      },
    )
  };

  for (let i = 0; i < Variables.heroesPerParty; i++) {
    game.parties[1].heroes.push(
      {
        position: [Variables.tilesPerRow-1, 0, i],
        items: [
          _.random(1, 3),
          _.random(1, 3),
          _.random(1, 3),
        ],
        effects: [
          {
            type: _.random(0, 2),
            duration: _.random(1, 5),
          },
          {
            type: _.random(0, 2),
            duration: _.random(1, 5),
          },
        ],
      },
    )
  };

  game.structures.push(
    {
      id: 0,
      position: [
        _.random(2, Variables.tilesPerRow-3),
        0,
        _.random(0, Variables.tilesPerColumn-1),
      ],
      duration: _.random(1, 5),
    }
  );

  return {
    game: game,
  };

}, Board);
