// Copyright 2019 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Factory for creating new frontend instances of
 * WrittenTranslation domain objects.
 */

import { downgradeInjectable } from '@angular/upgrade/static';
import { Injectable } from '@angular/core';

export class WrittenTranslation {
  html: string;
  needsUpdate: boolean;
  constructor(html: string, needsUpdate: boolean) {
    this.html = html;
    this.needsUpdate = needsUpdate;
  }
  getHtml() {
    return this.html;
  }
  setHtml(html: string) {
    this.html = html;
  }
  markAsNeedingUpdate() {
    this.needsUpdate = true;
  }
  toggleNeedsUpdateAttribute() {
    this.needsUpdate = !this.needsUpdate;
  }
  toBackendDict() {
    return {
      html: this.html,
      needs_update: this.needsUpdate
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class WrittenTranslationObjectFactory {
  createNew(html: string) {
    return new WrittenTranslation(html, false);
  }
  createFromBackendDict(translationBackendDict: any) {
    return new WrittenTranslation(
      translationBackendDict.html,
      translationBackendDict.needs_update);
  }
}

var oppia = require('AppInit.ts').module;

oppia.factory(
  'WrittenTranslationObjectFactory',
  downgradeInjectable(WrittenTranslationObjectFactory));
