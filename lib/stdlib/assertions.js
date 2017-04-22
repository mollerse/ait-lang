export function assertAggr(word, aggr) {
  if (!Array.isArray(aggr)) {
    throw new Error(`${word} requires aggregate. Was passed ${aggr}.`);
  }
}

export function assertQuotation(word, quotation) {
  if (!Array.isArray(quotation)) {
    throw new Error(`${word} requires quotation. Was passed ${quotation}.`);
  }
}

export function assertNonEmptyAggr(word, aggr) {
  if (aggr.length < 1) {
    throw new Error(`${word} requires non-empty aggregate.`);
  }
}

export function assertAggrHasIndex(word, aggr, index) {
  if (!(index in aggr)) {
    throw new Error(
      `Index out of bounds. Tried accessing ${index} on ${aggr} with ${word}.`
    );
  }
}

export function assertMinOrEqualLength(word, aggr1, aggr2) {
  if(aggr1.length > aggr2) {
    throw new Error(
      `Index out of bounds. Cannot do ${word} with a smaller aggregate as second argument.`
    );
  }
}
