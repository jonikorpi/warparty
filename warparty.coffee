#
# Collections
Games = new Mongo.Collection("games")
Turns = new Mongo.Collection("turns")

#
# Routes
Router.configure
  layoutTemplate: "layout"

Router.route "/",
  template: "home"
  name: "home"

Router.route "/:_id",
  template: "game"
  name: "game"
  data: ->
    targetGame = Games.findOne _id: @.params._id
    console.log "routing to game #{@.params._id}"
    return targetGame

#
# Client

if Meteor.isClient

  #
  # Layout

  Template.layout.helpers
    games: ->
      return Games.find({}, {sort: {createdAt: -1}})

  Template.layout.events

  #
  # Home

  Template.home.events
    "click .create-game": ->
      console.log "creating a game"
      Games.insert
        createdAt: new Date()
        started: false
        , (error, results) ->
          Router.go 'game', _id: results

  #
  # Game

  Template.game.helpers

    turns: ->
      turns = Turns.find gameID: @_id
      console.log "getting turns for game #{@_id}:"
      console.log turns.fetch()
      return turns


  Template.game.events

    "click .start-game": ->
      console.log "starting game #{@_id} and inserting turn"
      Games.update @_id,
        $set:
          started: true
      Turns.insert
        createdAt: new Date()
        gameID: @_id

    "click .add-turn": ->
      console.log "ending turn #{@currentTurn}"
      Turns.insert
        createdAt: new Date()
        gameID: @_id

    "click .blue-move": ->
      console.log "adding move to turn #{@currentTurn}"
      Turns.update @_id,
        $push:
          moves:
            description: "Blue player makes a move"

    "click .red-move": ->
      console.log "adding move to turn #{@currentTurn}"
      Turns.update @_id,
        $push:
          moves:
            description: "Red player makes a move"

  #
  # Startup

  # Meteor.startup ->

#
# Server

if Meteor.isServer
  Meteor.startup ->
    # Games.remove({})
