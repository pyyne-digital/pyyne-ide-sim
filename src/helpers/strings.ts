declare global {
  interface String {
    /**
     * Returns a search-friendly version of the string.
     */
    normalized: () => string;

    /**
     * Returns true if callee contains search, ignoring case and accents.
     */
    matches: (search: string) => boolean;
  }
}

String.prototype.normalized = function normalized() {
  return this.normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

String.prototype.matches = function matches(search) {
  return this.normalized().includes(search.normalized());
};

export {};
