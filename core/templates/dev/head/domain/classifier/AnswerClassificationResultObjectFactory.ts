// Copyright 2017 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Factory for creating new frontend instances of answer
 *     Classification Result domain objects.
 */

import { downgradeInjectable } from '@angular/upgrade/static';
import { Injectable } from '@angular/core';

export class AnswerClassificationResult {
  outcome: any;
  answerGroupIndex: number;
  ruleIndex: number;
  classificationCategorization: string;

  constructor(
      outcome: any, answerGroupIndex: number, ruleIndex: number,
      classificationCategorization: string) {
    this.outcome = outcome;
    this.answerGroupIndex = answerGroupIndex;
    this.ruleIndex = ruleIndex;
    this.classificationCategorization = classificationCategorization;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnswerClassificationResultObjectFactory {
  createNew(
      outcome: any, answerGroupIndex: number, ruleIndex: number,
      classificationCategorization: string) {
    return new AnswerClassificationResult(
      outcome, answerGroupIndex, ruleIndex, classificationCategorization);
  }
}

var oppia = require('AppInit.ts').module;

oppia.factory(
  'AnswerClassificationResultObjectFactory',
  downgradeInjectable(AnswerClassificationResultObjectFactory));
