// Copyright 2018 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview A data service that stores the exploration language code.
 */

require(
  'pages/exploration-editor-page/services/exploration-property.service.ts');

var oppia = require('AppInit.ts').module;

oppia.factory('ExplorationLanguageCodeService', [
  'ExplorationPropertyService', function(ExplorationPropertyService) {
    var child = Object.create(ExplorationPropertyService);
    child.propertyName = 'language_code';
    child.getAllLanguageCodes = function() {
      return constants.ALL_LANGUAGE_CODES;
    };
    child.getCurrentLanguageDescription = function() {
      for (var i = 0; i < constants.ALL_LANGUAGE_CODES.length; i++) {
        if (constants.ALL_LANGUAGE_CODES[i].code === child.displayed) {
          return constants.ALL_LANGUAGE_CODES[i].description;
        }
      }
    };
    child._isValid = function(value) {
      return constants.ALL_LANGUAGE_CODES.some(function(elt) {
        return elt.code === value;
      });
    };
    return child;
  }
]);
