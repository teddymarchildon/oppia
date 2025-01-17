// Copyright 2014 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Unit tests for item selection input validation service.
 */

// TODO(YashJipkate): Remove the following block of unnnecessary imports once
// ItemSelectionInputValidationService.ts is upgraded to Angular 8.
import { RuleObjectFactory } from 'domain/exploration/RuleObjectFactory.ts';
// ^^^ This block is to be removed.

require(
  'interactions/ItemSelectionInput/directives/' +
  'ItemSelectionInputValidationService.ts');

describe('ItemSelectionInputValidationService', function() {
  var WARNING_TYPES, validatorService;

  var currentState = null;
  var goodAnswerGroups = null,
    goodDefaultOutcome = null;
  var customizationArguments = null;
  var IsProperSubsetValidOption = null;
  var oof = null,
    agof = null,
    rof = null;
  var badAnswerGroup = null;
  var ThreeInputsAnswerGroups = null,
    OneInputAnswerGroups = null,
    NoInputAnswerGroups = null;

  beforeEach(function() {
    angular.mock.module('oppia');
  });
  beforeEach(angular.mock.module('oppia', function($provide) {
    $provide.value('RuleObjectFactory', new RuleObjectFactory());
  }));

  beforeEach(angular.mock.inject(function($injector) {
    validatorService = $injector.get('ItemSelectionInputValidationService');
    WARNING_TYPES = $injector.get('WARNING_TYPES');

    oof = $injector.get('OutcomeObjectFactory');
    agof = $injector.get('AnswerGroupObjectFactory');
    rof = $injector.get('RuleObjectFactory');

    currentState = 'First State';

    goodDefaultOutcome = oof.createFromBackendDict({
      dest: 'Second State',
      feedback: {
        html: 'Feedback',
        audio_translations: {}
      },
      labelled_as_correct: false,
      param_changes: [],
      refresher_exploration_id: null,
      missing_prerequisite_skill_id: null
    });

    customizationArguments = {
      choices: {
        value: ['Selection 1', 'Selection 2', 'Selection 3']
      },
      maxAllowableSelectionCount: {
        value: 2
      },
      minAllowableSelectionCount: {
        value: 1
      }
    };
    goodAnswerGroups = [agof.createNew(
      [rof.createFromBackendDict({
        rule_type: 'Equals',
        inputs: {
          x: ['Selection 1', 'Selection 2']
        }
      })],
      goodDefaultOutcome,
      false,
      null)
    ];
    ThreeInputsAnswerGroups = [agof.createNew(
      [rof.createFromBackendDict({
        rule_type: 'Equals',
        inputs: {
          x: ['Selection 1', 'Selection 2', 'Selection 3']
        }
      })],
      goodDefaultOutcome,
      false,
      null)
    ];
    OneInputAnswerGroups = [agof.createNew(
      [rof.createFromBackendDict({
        rule_type: 'Equals',
        inputs: {
          x: ['Selection 1']
        }
      })],
      goodDefaultOutcome,
      false,
      null)
    ];
    NoInputAnswerGroups = [agof.createNew(
      [rof.createFromBackendDict({
        rule_type: 'ContainsAtLeastOneOf',
        inputs: {
          x: []
        }
      })],
      goodDefaultOutcome,
      false,
      null)
    ];
    IsProperSubsetValidOption = [agof.createNew(
      [rof.createFromBackendDict({
        rule_type: 'IsProperSubsetOf',
        inputs: {
          x: ['Selection 1']
        }
      })],
      goodDefaultOutcome,
      false,
      null)
    ];
  }));

  it('should be able to perform basic validation', function() {
    var warnings = validatorService.getAllWarnings(
      currentState, customizationArguments, goodAnswerGroups,
      goodDefaultOutcome);
    expect(warnings).toEqual([]);
  });

  it('should expect a choices customization argument', function() {
    expect(function() {
      validatorService.getAllWarnings(
        currentState, {}, goodAnswerGroups, goodDefaultOutcome);
    }).toThrow('Expected customization arguments to have property: choices');
  });

  it(
    'should expect the minAllowableSelectionCount to be less than or ' +
    'equal to maxAllowableSelectionCount',
    function() {
      customizationArguments.minAllowableSelectionCount.value = 3;

      var warnings = validatorService.getAllWarnings(
        currentState, customizationArguments, ThreeInputsAnswerGroups,
        goodDefaultOutcome);
      expect(warnings).toContain({
        type: WARNING_TYPES.CRITICAL,
        message: (
          'Please ensure that the max allowed count is not less than the ' +
          'min count.')
      });
    });

  it(
    'should expect maxAllowableSelectionCount to be less than the total ' +
    'number of selections',
    function() {
      customizationArguments.maxAllowableSelectionCount.value = 3;

      // Remove the last choice.
      customizationArguments.choices.value.splice(2, 1);

      var warnings = validatorService.getAllWarnings(
        currentState, customizationArguments, goodAnswerGroups,
        goodDefaultOutcome);
      expect(warnings).toEqual([{
        type: WARNING_TYPES.CRITICAL,
        message: (
          'Please ensure that you have enough choices to reach the max count.')
      }]);
    });

  it(
    'should expect minAllowableSelectionCount to be less than the total ' +
    'number of selections',
    function() {
    // Remove the last choice.
      customizationArguments.choices.value.splice(2, 1);

      customizationArguments.minAllowableSelectionCount.value = 3;
      customizationArguments.maxAllowableSelectionCount.value = 3;

      var warnings = validatorService.getAllWarnings(
        currentState, customizationArguments, ThreeInputsAnswerGroups,
        goodDefaultOutcome);
      expect(warnings).toEqual([{
        type: WARNING_TYPES.CRITICAL,
        message: (
          'Please ensure that you have enough choices to reach the min count.')
      }]);
    });

  it('should expect all choices to be nonempty', function() {
    // Set the first choice to empty.
    customizationArguments.choices.value[0] = '';

    var warnings = validatorService.getAllWarnings(
      currentState, customizationArguments, goodAnswerGroups,
      goodDefaultOutcome);
    expect(warnings).toEqual([{
      type: WARNING_TYPES.CRITICAL,
      message: 'Please ensure the choices are nonempty.'
    }]);
  });

  it('should expect all choices to be unique', function() {
    // Repeat the last choice.
    customizationArguments.choices.value.push('Selection 3');

    var warnings = validatorService.getAllWarnings(
      currentState, customizationArguments, goodAnswerGroups,
      goodDefaultOutcome);
    expect(warnings).toEqual([{
      type: WARNING_TYPES.CRITICAL,
      message: 'Please ensure the choices are unique.'
    }]);
  });

  it(
    'should expect more that 1 element to be in the rule input, if the ' +
    '"proper subset" rule is used.',
    function() {
      var warnings = validatorService.getAllWarnings(
        currentState, customizationArguments, IsProperSubsetValidOption,
        goodDefaultOutcome);
      expect(warnings).toEqual([{
        type: WARNING_TYPES.ERROR,
        message: (
          'In answer group 1, ' +
          'rule 1, the "proper subset" rule must include at least 2 options.')
      }]);
    });

  it(
    'should expect number of correct options to be in between the maximum ' +
    'and minimum allowed selections when the "Equals" rule is used.',
    function() {
      // Make min allowed selections greater than correct answers.
      customizationArguments.minAllowableSelectionCount.value = 2;

      var warnings = validatorService.getAllWarnings(
        currentState, customizationArguments, OneInputAnswerGroups,
        goodDefaultOutcome);
      expect(warnings).toEqual([{
        type: WARNING_TYPES.ERROR,
        message: (
          'In answer group 1, rule 1, the number of correct options in ' +
          'the "Equals" rule should be between 2 and 2 (the ' +
          'minimum and maximum allowed selection counts).')
      }]);
    });

  it(
    'should expect at least one option when ' +
    '"ContainsAtLeastOneOf" rule is used.',
    function() {
      var warnings = validatorService.getAllWarnings(
        currentState, customizationArguments, NoInputAnswerGroups,
        goodDefaultOutcome);
      expect(warnings).toEqual([{
        type: WARNING_TYPES.ERROR,
        message: (
          'In answer group 1, rule 1, the "ContainsAtLeastOneOf" rule ' +
          'should have at least one option.')
      }]);
    });
});
