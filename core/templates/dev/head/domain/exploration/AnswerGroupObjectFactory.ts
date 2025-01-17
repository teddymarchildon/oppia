// Copyright 2015 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Factory for creating new frontend instances of AnswerGroup
 * domain objects.
 */

require('domain/exploration/OutcomeObjectFactory.ts');
require('domain/exploration/RuleObjectFactory.ts');

var oppia = require('AppInit.ts').module;

oppia.factory('AnswerGroupObjectFactory', [
  'OutcomeObjectFactory', 'RuleObjectFactory',
  function(OutcomeObjectFactory, RuleObjectFactory) {
    var AnswerGroup = function(
        rules, outcome, trainingData, taggedMisconceptionId) {
      this.rules = rules;
      this.outcome = outcome;
      this.trainingData = trainingData;
      this.taggedMisconceptionId = taggedMisconceptionId;
    };

    AnswerGroup.prototype.toBackendDict = function() {
      return {
        rule_specs: this.rules.map(function(rule) {
          return rule.toBackendDict();
        }),
        outcome: this.outcome.toBackendDict(),
        training_data: this.trainingData,
        tagged_misconception_id: this.taggedMisconceptionId
      };
    };

    // Static class methods. Note that "this" is not available in
    // static contexts.
    // TODO(ankita240796): Remove the bracket notation once Angular2 gets in.
    /* eslint-disable dot-notation */
    AnswerGroup['createNew'] = function(
    /* eslint-enable dot-notation */
        rules, outcome, trainingData, taggedMisconceptionId) {
      return new AnswerGroup(
        rules, outcome, trainingData, taggedMisconceptionId);
    };

    // TODO(ankita240796): Remove the bracket notation once Angular2 gets in.
    /* eslint-disable dot-notation */
    AnswerGroup['createFromBackendDict'] = function(answerGroupBackendDict) {
    /* eslint-enable dot-notation */
      return new AnswerGroup(
        generateRulesFromBackend(answerGroupBackendDict.rule_specs),
        OutcomeObjectFactory.createFromBackendDict(
          answerGroupBackendDict.outcome),
        answerGroupBackendDict.training_data,
        answerGroupBackendDict.tagged_misconception_id);
    };

    var generateRulesFromBackend = function(ruleBackendDicts) {
      return ruleBackendDicts.map(function(ruleBackendDict) {
        return RuleObjectFactory.createFromBackendDict(ruleBackendDict);
      });
    };

    return AnswerGroup;
  }
]);
