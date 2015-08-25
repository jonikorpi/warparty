#
# GlobalConfig

$rowCount = 8
$colCount = 13

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
  # Non-Meteor methods

  moveCharacter = (direction) ->
    character = $(".character.selected")
    movables = $(".character.selected, .character-controls")
    xPos = +character.attr("data-x-pos")
    yPos = +character.attr("data-y-pos")

    switch direction
      when "left"
        unless xPos == 1
          movables.attr( "data-x-pos", xPos-1 )
      when "right"
        unless xPos >= $colCount
          movables.attr( "data-x-pos", xPos+1 )
      when "up"
        unless yPos == 1
          movables.attr( "data-y-pos", yPos-1 )
      when "down"
        unless yPos >= $rowCount
          movables.attr( "data-y-pos", yPos+1 )

  $(document).keydown (e) ->
    if $(".character.selected").length > 0
      switch e.which
        when 37 # left
          moveCharacter("left")
        when 38 # up
          moveCharacter("up")
        when 39 # right
          moveCharacter("right")
        when 40 # down
          moveCharacter("down")
        else
          return
      e.preventDefault()

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
          teamSlots: [1,2,3,4]
        }
        {
          teamName: "Red team"
          teamID: 2
          teamSlots: [1,2,3,4]
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
  # Character

  Template.character.helpers

  Template.character.events

    "click .character": (event) ->
      character = $(event.target).closest(".character")
      otherCharacters = $(".character").not(character)
      controls = $(".character-controls")

      otherCharacters.removeClass("selected")

      if character.hasClass "selected"
        character.removeClass "selected"
        controls.removeClass("active")
      else
        character.addClass "selected"
        controls
          .attr { "data-x-pos": character.attr("data-x-pos"), "data-y-pos": character.attr("data-y-pos") }
          .addClass("active")

  Template.character.onRendered ->
    self = this
    slot = self.data.slot
    team = self.data.team
    character = self.$(".character")

    # Set initial positions
    switch slot
      when 1
        switch team
          when 1
            xPos = 1
            yPos = 1
          when 2
            xPos = $colCount
            yPos = $rowCount
      when 2
        switch team
          when 1
            xPos = 1
            yPos = 2
          when 2
            xPos = $colCount
            yPos = $rowCount-1
      when 3
        switch team
          when 1
            xPos = 1
            yPos = 3
          when 2
            xPos = $colCount
            yPos = $rowCount-2
      when 4
        switch team
          when 1
            xPos = 1
            yPos = 4
          when 2
            xPos = $colCount
            yPos = $rowCount-3

    character.attr { "data-x-pos": xPos, "data-y-pos": yPos }

  #
  # Character controls

  Template.characterControls.helpers

  Template.characterControls.events

    "click .move-left": (event) ->
      moveCharacter("left")

    "click .move-right": (event) ->
      moveCharacter("right")

    "click .move-up": (event) ->
      moveCharacter("up")

    "click .move-down": (event) ->
      moveCharacter("down")

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
        "characters.slotID": "#{team}.#{slot}"
      }, $set:
        "characters.$.characterID": characterID
      , (error, results) ->
        console.log "error: #{error}"
        console.log "affected: #{results}"

    createGame: ->
      Games.insert
        createdAt: new Date()
        started: false
        characters: [
          {
            slotID: "1.1"
            team: 1
            slot: 1
            characterID: false
          }
          {
            slotID: "1.2"
            team: 1
            slot: 2
            characterID: false
          }
          {
            slotID: "1.3"
            team: 1
            slot: 3
            characterID: false
          }
          {
            slotID: "1.4"
            team: 1
            slot: 4
            characterID: false
          }
          {
            slotID: "2.1"
            team: 2
            slot: 1
            characterID: false
          }
          {
            slotID: "2.2"
            team: 2
            slot: 2
            characterID: false
          }
          {
            slotID: "2.3"
            team: 2
            slot: 3
            characterID: false
          }
          {
            slotID: "2.4"
            team: 2
            slot: 4
            characterID: false
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
