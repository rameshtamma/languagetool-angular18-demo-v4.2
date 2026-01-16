export type DiffToken = { kind: 'same' | 'add' | 'del'; text: string };

function tokenize(s: string): string[] {
  // Word + whitespace tokens; keeps spacing stable for display
  return s.match(/\S+|\s+/g) ?? [];
}

export function diffTokens(a: string, b: string): { left: DiffToken[]; right: DiffToken[] } {
  const A = tokenize(a);
  const B = tokenize(b);

  // LCS DP (word-level). Great for demo-sized text.
  const dp: number[][] = Array.from({ length: A.length + 1 }, () => Array(B.length + 1).fill(0));
  for (let i = A.length - 1; i >= 0; i--) {
    for (let j = B.length - 1; j >= 0; j--) {
      dp[i][j] = A[i] === B[j] ? 1 + dp[i + 1][j + 1] : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const left: DiffToken[] = [];
  const right: DiffToken[] = [];
  let i = 0, j = 0;

  while (i < A.length && j < B.length) {
    if (A[i] === B[j]) {
      left.push({ kind: 'same', text: A[i] });
      right.push({ kind: 'same', text: B[j] });
      i++; j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      left.push({ kind: 'del', text: A[i] });
      i++;
    } else {
      right.push({ kind: 'add', text: B[j] });
      j++;
    }
  }

  while (i < A.length) left.push({ kind: 'del', text: A[i++] });
  while (j < B.length) right.push({ kind: 'add', text: B[j++] });

  return { left, right };
}
