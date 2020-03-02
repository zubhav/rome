/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Path} from '@romejs/js-compiler';
import {AnyNode, arrayExpression} from '@romejs/js-ast';

export default {
  name: 'noSparseArrays',
  enter(path: Path): AnyNode {
    let {node} = path;
    node = arrayExpression.assert(node);

    const hasEmptyIndex = node.elements.indexOf(undefined) > -1;

    if (node.type === 'ArrayExpression' && hasEmptyIndex) {
      path.context.addNodeDiagnostic(node, {
        category: 'lint/noSparseArrays',
        message:
          'Unexpected usage of comma in middle of array.',
      });
    }
    return node;
  },
};
