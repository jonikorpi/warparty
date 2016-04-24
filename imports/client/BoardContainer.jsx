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

  return {
    devMode: this.props.devMode,
    inVR: this.props.inVR,
    segments: [
      {
        loc: [0, 0],
        tiles: [
          [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,],
          [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,],
        ],
      },
      {
        loc: [0, 1],
        tiles: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        ],
      },
    ]
  };

}, Environment);
