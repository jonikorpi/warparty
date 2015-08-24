#
# Collections

Games = new Mongo.Collection("games")
Turns = new Mongo.Collection("turns")
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

      # , (gameID) ->
      #   Router.go 'game', _id: gameID

      # Games.insert
      #   createdAt: new Date()
      #   started: false
      #   characters: []
      #   , (error, results) ->
      #     Router.go 'game', _id: results


  #
  # Game

  Template.game.helpers

    turns: ->
      turns = Turns.find gameID: @_id
      console.log "getting turns for game #{@_id}:"
      # console.log turns.fetch()
      return turns

    characters: ->
      console.log "getting all characters"
      return Characters.find({})

    slots: ->
      return [1, 2, 3]


  Template.game.events

    "click .start-game": ->
      console.log "starting game #{@_id}"
      Meteor.call "startGame", @_id

    "click .stop-game": ->
      console.log "stopping game #{@_id}"
      Meteor.call "stopGame", @_id

    "click .add-turn": ->
      console.log "ending turn #{@_id}"
      Meteor.call "createTurn", @_id

    "click .blue-move": ->
      console.log "adding move to turn #{@_id}"
      Meteor.call "addMove", @_id, "Blue player makes a move"

    "click .red-move": ->
      console.log "adding move to turn #{@_id}"
      Meteor.call "addMove", @_id, "Red player makes a move"

    "change .select-character": (event) ->
      select = $(event.target)
      team = select.data("team")
      slot = select.data("slot")
      characterID = select.val()

      Meteor.call "setCharacterSlot", @_id, characterID, slot, team

      console.log "**NOT** setting character #{characterID} for slot #{slot} in team #{team}"

    # "submit .select-characters": (event) ->
    #   event.preventDefault()
    #   form = event.target
    #   teamID = form.teamID.value
    #
    #   console.log "setting characters for team #{teamID}"
    #
    #   Games.update @_id,
    #     $push:
    #       characters:
    #         $each: [
    #           {characterID: $(form.character1).val(), teamID: teamID}
    #           {characterID: $(form.character2).val(), teamID: teamID}
    #           {characterID: $(form.character3).val(), teamID: teamID}
    #         ]

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
# Methods

Meteor.methods

  setCharacterSlot: (gameID, characterID, slot, team) ->
    return
    # Games.upsert { @gameID, "characters.team": team, "characters.slot": slot },
    #   $set:
    #     "characters.$.characterID": characterID

  createGame: ->
    Games.insert
      createdAt: new Date()
      started: false
      characters: []
      , (error, results) ->
        Router.go 'game', _id: results

  startGame: (gameID) ->
    Games.update gameID,
      $set:
        started: true

  stopGame: (gameID) ->
    Games.update gameID,
      $set:
        started: false

  createTurn: (gameID) ->
    Turns.insert
      createdAt: new Date()
      gameID: gameID

  addMove: (gameID, description) ->
    Turns.update gameID,
      $push:
        moves:
          description: description
