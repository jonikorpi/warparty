import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

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
    turn: 3,
    parties: [
      {
        mana: 4,
        heroes: [
          {
            position: [0, 0, Variables.tilesPerColumn-1],
            items: [1, 2, 3, 4],
            effects: [
              {
                type: "stun",
                duration: 2,
              }
            ],
          },
          {
            position: [0, 0, Variables.tilesPerColumn-2],
            items: [1, 2, 3, 4],
            effects: [],
          },
          {
            position: [0, 0, Variables.tilesPerColumn-3],
            items: [1, 2, 3, 4],
            effects: [],
          },
          {
            position: [0, 0, Variables.tilesPerColumn-4],
            items: [1, 2, 3, 4],
            effects: [],
          },
        ],
      },
      {
        mana: 0,
        heroes: [
          {
            position: [Variables.tilesPerRow-1, 0, 0],
            items: [1, 2, 3, 4],
            effects: [],
          },
          {
            position: [Variables.tilesPerRow-1, 0, 1],
            items: [1, 2, 3, 4],
            effects: [],
          },
          {
            position: [Variables.tilesPerRow-1, 0, 2],
            items: [1, 2, 3, 4],
            effects: [],
          },
          {
            position: [Variables.tilesPerRow-1, 0, 3],
            items: [1, 2, 3, 4],
            effects: [],
          },
        ],
      },
    ],
    structures: [
      {
        id: 3,
        position: [3, 0, 5],
        duration: 5,
      }
    ]
  };

  return {
    game: game,
  };

}, Board);
