const isOverlapping = (val1, val2, spacing) => {
  return Math.abs(val1 - val2) < spacing;
};

export const getIdealSpacing = (arr, spacing) => {
  /*
  accepts unordered array of numbers, returns array (in original order)
  with guaranteed spacing value apart.
  used to position potentially overlapping values (like svg icons) on plots.

*/

  // MANUALLY HANDLE SORTING ISSUES FOR ARRAY WITH DUPLICATES (MULTIPLY DUPLICATES BY SLIGHT AMOUNT)
  let single_array = [];
  let duplicate_array = [];
  let no_duplicate_array = [...arr];
  arr.forEach((e, i) => {
    if (!single_array.includes(e)) {
      single_array.push(e);
    } else {
      duplicate_array.push([i, e]);
    }
  });

  duplicate_array.forEach((e, i) => {
    no_duplicate_array[e[0]] = e[1] * 1.0000000001 + i / 10;
  });

  arr = no_duplicate_array;

  // SORT ARRAY, GET MIN / MAX VALUES, ESTABLISH INCREMENT VALUE AND LOG ORIGINAL POSITIONS

  let arr_sorted = [...arr].sort((a, b) => a - b);
  let spaced_arr_sorted = [...arr_sorted];

  let min_array_val = Math.min(...arr_sorted);
  let max_array_val = Math.max(...arr_sorted);
  let increment_value = (max_array_val - min_array_val) * 0.05;

  let original_position_array = [];
  let idx_obj_array = [...arr].map((e, i) => {
    return {
      pos: i,
      val: e,
    };
  });

  // LOOP THROUGH EACH SORTED VALUE
  spaced_arr_sorted.forEach((e, i) => {
    let current_val = e;

    let prev_val = spaced_arr_sorted[i - 1];
    if (!prev_val) {
      prev_val = 0;
    }
    let next_val = [...spaced_arr_sorted][i + 1];
    if (next_val < current_val) {
      next_val = current_val;
    }
    let overlap_next = isOverlapping(current_val, next_val, spacing);
    let overlap_prev = isOverlapping(prev_val, next_val, spacing);
    let is_overlap = overlap_next || overlap_prev;

    // ITERATE TO REMOVE SPATIAL OVERLAP
    while (is_overlap) {
      let current_val_decrement_test = current_val - increment_value;
      let overlaps_previous_decrement_test = isOverlapping(
        prev_val,
        current_val_decrement_test,
        spacing
      );

      if (!overlaps_previous_decrement_test) {
        current_val = current_val - increment_value;
      } else {
        next_val = next_val + increment_value;
      }

      overlap_next = isOverlapping(current_val, next_val, spacing);

      overlap_prev = isOverlapping(prev_val, current_val, spacing);
      is_overlap = overlap_next || overlap_prev;
    }

    // MODIFY ACTUAL LIST
    spaced_arr_sorted[i] = current_val;
    if (i + 1 < spaced_arr_sorted.length) {
      spaced_arr_sorted[i + 1] = next_val;
    }

    let original_position = {
      ...idx_obj_array.filter((d) => d.val === arr_sorted[i])[0],
    };

    original_position["new_val"] = current_val;
    original_position_array.push(original_position);
  });

  // REASSEMBLE NEWLY-SPACED ARRAY
  let spaced_arr_reordered = [];
  spaced_arr_sorted.forEach((e, i) => {
    let pos = original_position_array.filter((d) => d.pos === i)[0].new_val;
    spaced_arr_reordered.push(pos);
  });

  return spaced_arr_reordered;
};
