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
 * @fileoverview Constants for story viewer domain.
 */

angular.module('oppia').constant(
  'STORY_DATA_URL_TEMPLATE', '/story_data_handler/<story_id>');

angular.module('oppia').constant(
  'STORY_NODE_COMPLETION_URL_TEMPLATE',
  '/story_node_completion_handler/<story_id>/<node_id>');
