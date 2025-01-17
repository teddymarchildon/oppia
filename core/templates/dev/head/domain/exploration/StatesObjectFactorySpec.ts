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
 * @fileoverview Unit tests for the States object factory.
 */

// TODO(YashJipkate): Remove the following block of unnnecessary imports once
// StatesObjectFactory.ts is upgraded to Angular 8.
import { RuleObjectFactory } from 'domain/exploration/RuleObjectFactory.ts';
import { WrittenTranslationObjectFactory } from
  'domain/exploration/WrittenTranslationObjectFactory.ts';
// ^^^ This block is to be removed.

require('domain/exploration/StatesObjectFactory.ts');

require('domain/state/StateObjectFactory.ts');

describe('States object factory', function() {
  beforeEach(angular.mock.module('oppia'));
  beforeEach(angular.mock.module('oppia', function($provide) {
    $provide.value('RuleObjectFactory', new RuleObjectFactory());
    $provide.value(
      'WrittenTranslationObjectFactory',
      new WrittenTranslationObjectFactory());
  }));

  var oldValueForNewStateTemplate = null;

  describe('StatesObjectFactory', function() {
    var scope, sof, ssof, statesDict, statesWithAudioDict, vof;

    beforeEach(angular.mock.inject(function($injector) {
      ssof = $injector.get('StatesObjectFactory');
      sof = $injector.get('StateObjectFactory');
      vof = $injector.get('VoiceoverObjectFactory');

      oldValueForNewStateTemplate = constants.NEW_STATE_TEMPLATE;

      constants.NEW_STATE_TEMPLATE = {
        classifier_model_id: null,
        content: {
          content_id: 'content',
          html: ''
        },
        recorded_voiceovers: {
          voiceovers_mapping: {
            content: {},
            default_outcome: {}
          }
        },
        interaction: {
          answer_groups: [],
          confirmed_unclassified_answers: [],
          customization_args: {
            rows: {
              value: 1
            },
            placeholder: {
              value: 'Type your answer here.'
            }
          },
          default_outcome: {
            dest: '(untitled state)',
            feedback: {
              content_id: 'default_outcome',
              html: ''
            },
            param_changes: [],
            labelled_as_correct: false,
            refresher_exploration_id: null,
            missing_prerequisite_skill_id: null
          },
          hints: [],
          solution: null,
          id: 'TextInput'
        },
        param_changes: [],
        solicit_answer_details: false,
        written_translations: {
          translations_mapping: {
            content: {},
            default_outcome: {}
          }
        },
      };

      statesDict = {
        'first state': {
          content: {
            content_id: 'content',
            html: 'content'
          },
          recorded_voiceovers: {
            voiceovers_mapping: {
              content: {},
              default_outcome: {},
              feedback_1: {}
            }
          },
          interaction: {
            id: 'RuleTest',
            answer_groups: [{
              outcome: {
                dest: 'outcome 1',
                feedback: {
                  content_id: 'feedback_1',
                  html: ''
                },
                labelled_as_correct: false,
                param_changes: [],
                refresher_exploration_id: null
              },
              rule_specs: [{
                inputs: {
                  x: 10
                },
                rule_type: 'Equals'
              }],
            }],
            default_outcome: {
              dest: 'default',
              feedback: {
                content_id: 'default_outcome',
                html: ''
              },
              labelled_as_correct: false,
              param_changes: []
            },
            hints: [],
            solution: null
          },
          param_changes: [],
          solicit_answer_details: false,
          written_translations: {
            translations_mapping: {
              content: {},
              default_outcome: {},
              feedback_1: {}
            }
          },
        }
      };

      statesWithAudioDict = {
        'first state': {
          content: {
            content_id: 'content',
            html: 'content'
          },
          recorded_voiceovers: {
            voiceovers_mapping: {
              content: {
                en: {
                  filename: 'myfile1.mp3',
                  file_size_bytes: 0.5,
                  needs_update: false
                },
                'hi-en': {
                  filename: 'myfile3.mp3',
                  file_size_bytes: 0.8,
                  needs_update: false
                }
              },
              default_outcome: {
                he: {
                  filename: 'myfile10.mp3',
                  file_size_bytes: 0.5,
                  needs_update: false
                }
              },
              feedback_1: {
                zh: {
                  filename: 'myfile4.mp3',
                  file_size_bytes: 1.1,
                  needs_update: false
                }
              },
              hint_1: {
                es: {
                  filename: 'myfile5.mp3',
                  file_size_bytes: 0.7,
                  needs_update: false
                },
                zh: {
                  filename: 'myfile6.mp3',
                  file_size_bytes: 0.9,
                  needs_update: false
                },
                'hi-en': {
                  filename: 'myfile8.mp3',
                  file_size_bytes: 1.2,
                  needs_update: false
                }
              },
              hint_2: {
                cs: {
                  filename: 'myfile7.mp3',
                  file_size_bytes: 0.2,
                  needs_update: false
                }
              }
            }
          },
          interaction: {
            answer_groups: [{
              outcome: {
                dest: 'second state',
                feedback: {
                  content_id: 'feedback_1',
                  html: '<p>Good.</p>'
                },
                labelled_as_correct: false,
                param_changes: [],
                refresher_exploration_id: null
              },
              rule_specs: [{
                inputs: {
                  x: 20
                },
                rule_type: 'Equals'
              }]
            }],
            confirmed_unclassified_answers: [],
            customization_args: {},
            default_outcome: {
              dest: 'new state',
              feedback: {
                content_id: 'default_outcome',
                html: '<p>Feedback</p>'
              },
              labelled_as_correct: false,
              param_changes: []
            },
            hints: [{
              hint_content: {
                content_id: 'hint_1',
                html: '<p>Here is a hint.</p>'
              }
            }, {
              hint_content: {
                content_id: 'hint_2',
                html: '<p>Here is another hint.</p>'
              }
            }],
            id: 'TextInput'
          },
          param_changes: [],
          solicit_answer_details: false,
          written_translations: {
            translations_mapping: {
              content: {},
              default_outcome: {},
              feedback_1: {},
              hint_1: {},
              hint_2: {}
            }
          }
        },
        'second state': {
          content: {
            content_id: 'content',
            html: 'more content'
          },
          recorded_voiceovers: {
            voiceovers_mapping: {
              content: {
                'hi-en': {
                  filename: 'myfile2.mp3',
                  file_size_bytes: 0.8,
                  needs_update: false
                }
              },
              default_outcome: {},
              solution: {
                de: {
                  filename: 'myfile9.mp3',
                  file_size_bytes: 0.5,
                  needs_update: false
                }
              }
            }
          },
          interaction: {
            answer_groups: [],
            confirmed_unclassified_answers: [],
            customization_args: {},
            default_outcome: {
              dest: 'new state',
              feedback: {
                content_id: 'default_outcome',
                html: ''
              },
              labelled_as_correct: false,
              param_changes: []
            },
            hints: [],
            solution: {
              answer_is_exclusive: false,
              correct_answer: 'answer',
              explanation: {
                content_id: 'solution',
                html: '<p>This is an explanation.</p>'
              }
            },
            id: 'TextInput'
          },
          param_changes: [],
          solicit_answer_details: false,
          written_translations: {
            translations_mapping: {
              content: {},
              default_outcome: {}
            }
          }
        }
      };
    }));

    afterEach(inject(function() {
      constants.NEW_STATE_TEMPLATE = oldValueForNewStateTemplate;
    }));

    it('should create a new state given a state name', function() {
      var newStates = ssof.createFromBackendDict(statesDict);
      newStates.addState('new state');
      expect(newStates.getState('new state')).toEqual(
        sof.createFromBackendDict('new state', {
          classifier_model_id: null,
          content: {
            content_id: 'content',
            html: ''
          },
          recorded_voiceovers: {
            voiceovers_mapping: {
              content: {},
              default_outcome: {}
            }
          },
          interaction: {
            answer_groups: [],
            confirmed_unclassified_answers: [],
            customization_args: {
              rows: {
                value: 1
              },
              placeholder: {
                value: 'Type your answer here.'
              }
            },
            default_outcome: {
              dest: 'new state',
              feedback: {
                content_id: 'default_outcome',
                html: ''
              },
              param_changes: [],
              labelled_as_correct: false,
              refresher_exploration_id: null,
              missing_prerequisite_skill_id: null
            },
            hints: [],
            id: 'TextInput'
          },
          param_changes: [],
          solicit_answer_details: false,
          written_translations: {
            translations_mapping: {
              content: {},
              default_outcome: {}
            }
          },
        }));
    });

    it('should correctly get all audio language codes in states', function() {
      var statesWithAudio = ssof.createFromBackendDict(statesWithAudioDict);
      expect(statesWithAudio.getAllVoiceoverLanguageCodes())
        .toEqual(['en', 'hi-en', 'he', 'zh', 'es', 'cs', 'de']);
    });

    it('should correctly get all audio translations in states', function() {
      var statesWithAudio = ssof.createFromBackendDict(statesWithAudioDict);
      expect(statesWithAudio.getAllVoiceovers('hi-en'))
        .toEqual({
          'first state': [vof.createFromBackendDict({
            filename: 'myfile3.mp3',
            file_size_bytes: 0.8,
            needs_update: false
          }), vof.createFromBackendDict({
            filename: 'myfile8.mp3',
            file_size_bytes: 1.2,
            needs_update: false
          })],
          'second state': [vof.createFromBackendDict({
            filename: 'myfile2.mp3',
            file_size_bytes: 0.8,
            needs_update: false
          })]
        });
    });
  });
});
