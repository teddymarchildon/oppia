// Copyright 2016 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Unit tests for the SVM prediction functions.
 */

// TODO(YashJipkate): Remove the following block of unnnecessary imports once
// SVMPredictionService.ts is upgraded to Angular 8.
import { PredictionResultObjectFactory } from
  'domain/classifier/PredictionResultObjectFactory.ts';
// ^^^ This block is to be removed.

describe('SVM prediction functions', function() {
  beforeEach(angular.mock.module('oppia'));
  beforeEach(angular.mock.module('oppia', function($provide) {
    $provide.value(
      'PredictionResultObjectFactory', new PredictionResultObjectFactory());
  }));

  describe('Test SVM prediction functions', function() {
    var service;
    beforeEach(angular.mock.inject(function($injector) {
      service = $injector.get('SVMPredictionService');
    }));

    it('should calculate correct kernel values', function() {
      var kernelParams = {
        kernel: 'rbf',
        coef0: 0.0,
        degree: 3,
        gamma: 0.5
      };

      var supportVectors = [[0, 0], [1, 1]];
      var input = [1, 0];
      var kvalues = service.kernel(kernelParams, supportVectors, input);
      var expectedKvalues = [0.6065306597126334, 0.6065306597126334];
      expect(kvalues.length).toEqual(2);
      expect(kvalues).toEqual(expectedKvalues);
    });

    it('should give correct labels and confidence estimations', function() {
      // This is classifier data of a pretrained SVM classifier trained
      // on a synthetic dataset created for the purpose of testing SVM
      // prediction service. The classes in the classifier data are equivalent
      // to two non-default answer groups of the training data of some
      // exploration.
      var svmData = {
        classes: [0, 1],
        kernel_params: {
          kernel: 'rbf', coef0: 0.0, degree: 3, gamma: 0.5},
        intercept: [0.04554340162799716],
        n_support: [80, 66],
        probA: [-4.76812258346006],
        support_vectors: [
          [5.0, 0.0], [4.0, -2.0], [3.0, -4.0], [-5.0, 0.0], [4.0, -2.0],
          [0.0, 0.0], [2.0, -1.0], [3.0, 4.0], [-4.0, -2.0], [-3.0, 4.0],
          [-5.0, 0.0], [-4.0, -2.0], [0.0, -5.0], [-1.0, 1.0], [-1.0, -1.0],
          [-1.0, 0.0], [4.0, -2.0], [-2.0, -4.0], [-5.0, 0.0], [4.0, -3.0],
          [5.0, 0.0], [3.0, -4.0], [-5.0, 0.0], [5.0, 0.0], [0.0, -5.0],
          [-4.0, 3.0], [4.0, 1.0], [-1.0, 4.0], [4.0, 2.0], [1.0, 4.0],
          [4.0, 3.0], [-1.0, 4.0], [5.0, 0.0], [0.0, -1.0], [2.0, 0.0],
          [-4.0, -3.0], [-2.0, -4.0], [4.0, 3.0], [-4.0, -1.0], [0.0, 5.0],
          [4.0, 3.0], [-2.0, -1.0], [3.0, -4.0], [5.0, 0.0], [4.0, 1.0],
          [5.0, 0.0], [0.0, -2.0], [2.0, 1.0], [0.0, -5.0], [1.0, -4.0],
          [0.0, 2.0], [-4.0, 3.0], [-2.0, 0.0], [4.0, 3.0], [-3.0, 4.0],
          [-1.0, -2.0], [1.0, -2.0], [1.0, -4.0], [1.0, -1.0], [1.0, 2.0],
          [-4.0, 1.0], [-3.0, 4.0], [-3.0, -4.0], [3.0, -4.0], [-1.0, 2.0],
          [3.0, 4.0], [-4.0, 1.0], [-1.0, -4.0], [1.0, 1.0], [-4.0, 3.0],
          [0.0, 5.0], [2.0, 4.0], [-2.0, 1.0], [0.0, -5.0], [-3.0, -4.0],
          [-4.0, 3.0], [1.0, 4.0], [-4.0, -3.0], [0.0, -5.0], [-3.0, 4.0],
          [1.0, 5.0], [5.0, 1.0], [1.0, -5.0], [1.0, 5.0], [1.0, 5.0],
          [-5.0, 1.0], [-4.0, -4.0], [-1.0, -5.0], [-1.0, -5.0], [4.0, 4.0],
          [-5.0, 1.0], [1.0, -5.0], [-5.0, 3.0], [1.0, -5.0], [-5.0, 3.0],
          [5.0, 1.0], [4.0, -4.0], [-4.0, 4.0], [-3.0, 5.0], [5.0, 1.0],
          [-5.0, 1.0], [-4.0, -4.0], [-4.0, 4.0], [1.0, -5.0], [-1.0, 5.0],
          [4.0, -4.0], [4.0, -4.0], [5.0, -3.0], [-1.0, 5.0], [5.0, -1.0],
          [5.0, -1.0], [4.0, 4.0], [-4.0, 4.0], [-4.0, -4.0], [-2.0, 5.0],
          [1.0, -5.0], [5.0, 1.0], [4.0, 4.0], [4.0, 4.0], [-5.0, 1.0],
          [-1.0, 5.0], [3.0, 5.0], [5.0, -1.0], [-5.0, -1.0], [5.0, 1.0],
          [3.0, 5.0], [5.0, 1.0], [3.0, -5.0], [-5.0, -2.0], [5.0, 3.0],
          [5.0, -1.0], [-5.0, -3.0], [-5.0, -1.0], [3.0, -5.0], [-5.0, 1.0],
          [5.0, 3.0], [-3.0, -5.0], [-4.0, 4.0], [5.0, -1.0], [2.0, 5.0],
          [-1.0, 5.0], [-5.0, -5.0], [-3.0, 5.0], [-5.0, -2.0], [-2.0, -5.0],
          [-2.0, -5.0]],
        probB: [-0.26830931608536374],
        dual_coef: [[
          1.0, 0.17963792804729697, 0.403550660516519, 1.0, 1.0,
          0.2174320339900639, 0.32237125746964795, 1.0, 0.23406746659599886,
          0.13107690381219206, 1.0, 1.0, 0.20357365261524915,
          0.3806808376092491, 0.07231536087203701, 0.052444785344018065,
          0.9373454934508193, 0.2887075426898694, 1.0, 1.0, 1.0, 1.0, 1.0,
          1.0, 1.0, 0.09794130691741577, 0.9371448493098987,
          0.8020377139435809, 0.10523314152848777, 0.7208368125926214,
          0.2745796264317118, 1.0, 1.0, 0.1341948623940462,
          0.184427006132661, 1.0, 1.0, 1.0, 0.23220617815321498, 1.0, 1.0,
          0.34100990964941563, 1.0, 1.0, 1.0, 1.0, 0.19085781720747444,
          0.10622693983611159, 1.0, 0.9733190570902237, 0.07976440321906088,
          1.0, 0.18011727003205402, 1.0, 1.0, 0.32629540304776156,
          0.10535962914306607, 1.0, 0.23429959940904435, 0.2026193359451537,
          1.0, 1.0, 1.0, 1.0, 0.20070585346407077, 1.0, 0.999293299134111,
          0.1464060764902667, 0.3890080385472037, 1.0, 1.0,
          0.2940723495632226, 0.10157585440791363, 1.0, 1.0, 1.0, 1.0, 1.0,
          1.0, 0.9896220351629882, -1.0, -0.3138343321080787,
          -0.5646722753216991, -1.0, -1.0, -0.5049737412040376, -1.0, -1.0,
          -1.0, -0.3604481739923152, -1.0, -1.0, -0.3764883860788214, -1.0,
          -1.0, -1.0, -0.9796036195304532, -0.7935513623790754,
          -0.4880899543555701, -1.0, -1.0, -1.0, -1.0, -1.0,
          -0.06955956862215716, -1.0, -1.0, -0.9943549382257916, -1.0,
          -0.9093105655834473, -1.0, -1.0, -1.0, -0.959538326485444,
          -0.09018015160096478, -1.0, -1.0, -1.0, -0.9834004233163612, -1.0,
          -1.0, -0.025769464156420306, -1.0, -1.0, -1.0,
          -0.9975520403673716, -0.9930682257463449, -0.6822294518807557,
          -0.19520832795700704, -0.9197741907209602, -1.0,
          -0.8410687469551232, -1.0, -1.0, -0.9737667349019845,
          -0.5740153082819723, -0.8386505512671123, -0.9559546083928095,
          -0.9333906130210027, -0.1858803184178766, -1.0,
          -0.046523686102560795, -1.0, -0.9984458385556095,
          -0.3443622757534568, -0.8786920904831582]]
      };

      var testx = [
        [-2., -1.], [5., -2.], [-1., -2.], [2., -5.], [-4., 5.],
        [-1., 5.], [-2., 0.], [-1., 5.], [-1., 2.]];
      var predictions = [0, 1, 0, 1, 1, 1, 0, 1, 0];
      var probs = [
        0.9934976, 0.99677775, 0.99349075, 0.99999448, 0.99999958,
        0.98901676, 0.99349654, 0.98901676, 0.99351481];

      for (var i = 0; i < testx.length; i++) {
        var predictionResult = service.predict(svmData, testx[i]);
        expect(predictionResult.predictionLabel).toEqual(predictions[i]);
        expect(
          Math.abs(predictionResult.predictionConfidence - probs[i])
        ).toBeLessThan(1e-3);
      }
    });
  });
});
