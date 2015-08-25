#
# Collections

Games = new Mongo.Collection("games")
Moves = new Mongo.Collection("moves")
Characters = new Mongo.Collection("characters")

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
    console.log targetGame
    return targetGame

#
# Client

if Meteor.isClient

  #
  # Methods on the client

  Meteor.methods
    # routeToGame: (gameID) ->
    #   Router.go 'game', _id: gameID

  #
  # Layout

  Template.layout.helpers


  Template.layout.events


  #
  # Home

  Template.home.helpers
    games: ->
      console.log "getting all games"
      return Games.find({}, {sort: {createdAt: -1}})

    characters: ->
      console.log "getting all characters"
      return Characters.find({})

  Template.home.events
    "click .create-game": ->
      console.log "creating a game"
      Meteor.call "createGame"


  #
  # Game

  Template.game.helpers

    moves: ->
      moves = Moves.find gameID: @_id
      console.log "getting moves for game #{@_id}:"
      # console.log turns.fetch()
      return moves

    characterMap: ->
      console.log "getting all characters"
      # console.log Characters.find({})
      return Characters.find({})

    teams: ->
      return [
        {
          teamName: "Blue team"
          teamID: 1
          teamSlots: [1,2,3]
        }
        {
          teamName: "Red team"
          teamID: 2
          teamSlots: [1,2,3]
        }
      ]

    thisGameID: ->
      return @_id


  Template.game.events

    "click .start-game": ->
      console.log "starting game #{@_id}"
      Meteor.call "startGame", @_id

    "click .stop-game": ->
      console.log "stopping game #{@_id}"
      Meteor.call "stopGame", @_id

    "click .blue-move": ->
      console.log "adding move to game #{@_id}"
      Meteor.call "createMove", @_id, "Blue player makes a move"

    "click .red-move": ->
      console.log "adding move to game #{@_id}"
      Meteor.call "createMove", @_id, "Red player makes a move"

    "change .select-character": (event) ->
      select = $(event.target)
      team = select.closest(".team").data("team")
      slot = select.data("slot")
      characterID = select.val()
      gameID = select.closest(".game").attr("id")

      Meteor.call "setCharacterSlot", gameID, characterID, slot, team

      console.log "setting character #{characterID} for slot #{slot} in team #{team} for game #{gameID}"

#
# Server

if Meteor.isServer
  Meteor.startup ->

    #
    # Character setup

    Characters.remove({})

    characterMap = [
      {
        name: "Cleric"
      }
      {
        name: "Rogue"
      }
      {
        name: "Warrior"
      }
      {
        name: "Wizard"
      }
    ]

    for key, character of characterMap
      Characters.insert
        name: character.name

  #
  # Methods on the server

  Meteor.methods

    setCharacterSlot: (gameID, characterID, slot, team) ->
      console.log gameID, characterID, slot, team

      Games.update {
        _id: gameID
        "characters.slot": "#{team}.#{slot}"
      }, $set: "characters.$.characterID": characterID
      , (error, results) ->
        console.log "error: #{error}"
        console.log "affected: #{results}"

    createGame: ->
      Games.insert
        createdAt: new Date()
        started: false
        characters: [
          {
            slot: "1.1"
            characterID: ""
          }
          {
            slot: "1.2"
            characterID: ""
          }
          {
            slot: "1.3"
            characterID: ""
          }
          {
            slot: "2.1"
            characterID: ""
          }
          {
            slot: "2.2"
            characterID: ""
          }
          {
            slot: "2.3"
            characterID: ""
          }
        ]
        # , (error, results) ->
          # Meteor.call "routeToGame", results

    startGame: (gameID) ->
      Games.update gameID,
        $set:
          started: true

    stopGame: (gameID) ->
      Games.update gameID,
        $set:
          started: false

    createMove: (gameID, description) ->
      Moves.insert
        createdAt: new Date()
        gameID: gameID
        description: description
