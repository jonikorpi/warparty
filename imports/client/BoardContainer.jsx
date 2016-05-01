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

  let match = false;

  // TODO: get a real match from Meteor
  // TODO: show an error somehow if the match wasn't found

  if (params.matchID) {
    match = {
      id: params.matchID,
      datetime: new Date(),
      turn: 1,
      state: "created", // created, started, finished
      parties: [
        {
          playerID: false,
          ready: false,
          heroes: [],
        },
        {
          playerID: false,
          ready: true,
          heroes: [],
        },
      ],
      structures: []
    };
  }

  // for (let i = 0; i < Variables.heroesPerParty; i++) {
  //   game.parties[0].heroes.push(
  //     {
  //       mana: 0,
  //       position: [0, 0, Variables.tilesPerColumn-1-i],
  //       rotation: [0, 0, 0],
  //       lastItemUsed: 1,
  //       items: [
  //         _.random(1, 3),
  //         _.random(1, 3),
  //         _.random(1, 3),
  //       ],
  //       effects: [
  //         {
  //           type: _.random(0, 2),
  //           duration: _.random(1, 5),
  //         },
  //         {
  //           type: _.random(0, 2),
  //           duration: _.random(1, 5),
  //         },
  //       ],
  //     },
  //   )
  // };
  //
  // for (let i = 0; i < Variables.heroesPerParty; i++) {
  //   game.parties[1].heroes.push(
  //     {
  //       mana: 0,
  //       position: [Variables.tilesPerRow-1, 0, i],
  //       rotation: [0, 0, 0],
  //       lastItemUsed: 1,
  //       items: [
  //         _.random(1, 3),
  //         _.random(1, 3),
  //         _.random(1, 3),
  //       ],
  //       effects: [
  //         {
  //           type: _.random(0, 2),
  //           duration: _.random(1, 5),
  //         },
  //         {
  //           type: _.random(0, 2),
  //           duration: _.random(1, 5),
  //         },
  //       ],
  //     },
  //   )
  // };
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
