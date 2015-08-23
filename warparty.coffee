# Collections
Games = new Mongo.Collection("games")

# Routes
Router.configure
  layoutTemplate: "layout"

Router.route "/",
  template: "home"
  name: "home"
  # onBeforeAction: ->
  #   console.log "inserting game"
  #   Games.insert
  #     player: "Joni"

Router.route "/:_id",
  template: "game"
  name: "game"
  data: ->
    Games.findOne _id: @.params._id
    console.log "game: #{@.params._id}"


if Meteor.isClient

  # Set session defaults
  # Session.setDefault "targetDate", 0

  Template.home.helpers
    games: ->
      return Games.find({}, {sort: {createdAt: -1}})

    # weekDays: ->
    #   now = moment()
    #   weekStart = moment(now).startOf("isoweek")
    #   days = []
    #   for number in [0..6]
    #     thisDay = moment(weekStart).add(number, "d")
    #     day =
    #       machine: thisDay
    #       human: thisDay.format("dddd, MMMM Do YYYY")
    #       today: true if thisDay.day() == now.day()
    #     days.push(day)
    #   # console.log days
    #   return days

  Template.home.events

    "click .new-game": ->
      Games.insert
        createdAt: new Date()
        player: "Joni"

    # "submit .todo-input": (event) ->
    #   event.preventDefault()
    #   form = event.target
    #   text = form.text.value

      # console.log text
      # console.log $(form).closest(".day").data("machine")

      # Texts.update
      #   text: text
      #   date: form.closest(".day").data("machine")

    # "click .check-toggle": (event) ->
    #   Tasks.update @_id, $set: checked: !@checked
    #
    # "click .delete": (event) ->
    #   Tasks.remove @_id

  Meteor.startup ->
    # console.log "getting texts"
    # Texts.find().each ->
    #   console.log @

if Meteor.isServer
  Meteor.startup ->
    Games.remove({})
