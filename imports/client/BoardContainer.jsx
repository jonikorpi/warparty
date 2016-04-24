import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Board from './Board';

export default createContainer(({ params }) => {

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
        heroes: {
          {
            position: [1, 2],
            items: [1, 2, 3, 4],
            effects: [
              {
                id: 4,
                duration: 2,
              }
            ],
          },
        },
      },
      {
        mana: 4,
        heroes: {
          {
            position: [1, 2],
            items: [1, 2, 3, 4],
            effects: [
              {
                id: 4,
                duration: 2,
              }
            ],
          },
        },
      },
    ],
    objects: [
      {
        id: 3,
        position: [0, 5],
        duration: 5,
      }
    ]
  };

  return {
    devMode: this.props.devMode,
    inVR: this.props.inVR,
    game: game,
  };

}, Environment);
