#!/usr/bin/env node
'use strict'

const path = require('path')
const Jasmine = require('jasmine')
const SpecReporter = require('jasmine-spec-reporter').SpecReporter

const jasmine = new Jasmine()

// remove default reporter logs
jasmine.clearReporters()

// add jasmine-spec-reporter
jasmine.addReporter(new SpecReporter({
    spec: {
        displayPending: true
    }
}))
jasmine.loadConfigFile(path.resolve(__dirname, 'support', 'jasmine.json'))

jasmine.execute()
