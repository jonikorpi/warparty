#
# Collections
Games = new Mongo.Collection("games")

#
# Routes
Router.configure
  layoutTemplate: "layout"

Router.route "/",
  template: "home"
  name: "home"
  onBeforeAction: ->
    console.log "inserting game"
    Games.insert { createdAt: new Date() }, (error, results) ->
      Router.go 'game', _id: results
    @.next()

Router.route "/:_id",
  template: "game"
  name: "game"
  data: ->
    targetGame = Games.findOne _id: @.params._id
    console.log "routing to game #{@.params._id}"
    return targetGame


if Meteor.isClient

  # Set session defaults
  # Session.setDefault "targetDate", 0

  Template.layout.helpers
    games: ->
      return Games.find({}, {sort: {createdAt: -1}})

  Template.layout.events

  Meteor.startup ->

if Meteor.isServer
  Meteor.startup ->
    Games.remove({})
