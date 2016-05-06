import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';

export const Matches = new Mongo.Collection('matches');

//
// Publications

if (Meteor.isServer) {

  Meteor.publish(
    "matches",
    function matchesPublication(matchID) {
      check(matchID, String);

      return Matches.find(
        {
          _id: matchID,
        },
        {
          fields: {
            "leftParty.playerID": 0,
            "rightParty.playerID": 0,
          }
        }
      );
    }
  );

}

//
// Methods

Meteor.methods({

  "matches.create"(playerID, heroItems) {
    check(playerID, String);
    Match.test(
      heroItems,
      [[Match.Integer]]
    );

    return Matches.insert(
      {
        datetime: new Date(),
        turn: 1,
        state: "created", // created, started, finished
        leftParty: {
          playerID: playerID,
          ready: false,
          heroes: heroItems,
        },
        rightParty: {
          playerID: undefined,
          ready: false,
          heroes: undefined,
        },
        structures: []
      },
      function (error, result) {
        return error || result;
      }
    );
  },

  "matches.controlTeam"(matchID, playerID, heroes) {
    check(playerID, String);
    // TODO: check heroes

    // Matches.update(matchID, { $set: { checked: setChecked } });
  },

  "matches.releaseTeam"(matchID, playerID, teamID) {
    check(playerID, String);
    check(teamID, Number);

    // TODO: fetch match and check the playerID matches its playerID
  },

  // "matches.remove"(matchID) {
  //   check(matchID, String);
  //
  //   Matches.remove(matchID);
  // },

  // 'tasks.setPrivate'(taskId, setToPrivate) {
  //   check(taskId, String);
  //   check(setToPrivate, Boolean);
  //
  //   const task = Tasks.findOne(taskId);
  //
  //   // Make sure only the task owner can make a task private
  //   if (task.owner !== this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   Tasks.update(taskId, { $set: { private: setToPrivate } });
  // },

});
