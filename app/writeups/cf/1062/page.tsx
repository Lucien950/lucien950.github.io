'use client';

import Link from "next/link";
import WriteupTemplate from "../../WriteupTemplate";
import ReactKatex from "@pkasila/react-katex";
import ShikiHighlighter from "react-shiki";

const A = String.raw`int main() {
  int t;
  cin >> t;
  while (t--) {
	uint32_t a, b, c, d;
	cin >> a >> b >> c >> d;
	const bool ok = a == b && b == c && c == d;
	cout << (ok ? "YES\n" : "NO\n");
  }
  cout << flush;
}`
const B = String.raw`int main() {
  int q;
  cin >> q;
  while (q--) {
	int n;
	cin >> n;
	string s, t;
	cin >> s >> t;
	array<size_t, 26> freq_s{}, freq_t{};
	for (const char c : s) {
	  freq_s[c - 'a'] += 1;
	}
	for (const char c : t) {
	  freq_t[c - 'a'] += 1;
	}
	cout << (std::equal(freq_s.begin(), freq_s.end(), freq_t.begin()) ? "YES" : "NO") << endl;
  }
}`
const C = String.raw`int main() {
  int t;
  cin >> t;
  while (t--) {
	int n;
	cin >> n;

	bool has_even = false, has_odd = false;
	for (int i = 0; i < n; i++) {
	  cin >> a[i];
	  has_even |= (a[i] % 2 == 0);
	  has_odd |= (a[i] % 2 == 1);
	}
	if (has_even && has_odd) {
	  // sort it normal mode lmao
	  std::sort(a.begin(), a.begin() + n);
	} else {
	  // nothing you can do
	}

	// print a
	for (int i = 0; i < n; i++) {
	  cout << a[i] << " ";
	}
	cout << "\n";
  }
  cout << flush;
}`
const D = String.raw`static array<uint32_t, 16> first_16_primes{{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53}};

int main() {
  int t;
  cin >> t;

  map<uint64_t, uint32_t> prime_counts;
  for (const uint32_t x : first_16_primes) {
	prime_counts[x] = 0;
  }

  while (t--) {
	uint32_t n;
	cin >> n;
	for (uint32_t i = 0; i < n; i++) {
	  cin >> a[i];
	}
	// reset the prime counts
	for (auto& v : prime_counts | views::values) {
	  v = 0;
	}

	// inshallah this loop is nsqrtn
	for (uint32_t i = 0; i < n; i++) {
	  // prime factorize a[i]
	  for (const uint32_t j : first_16_primes) {
		if (a[i] % j == 0) {
		  prime_counts[j]++;
		}
	  }
	}
	for (const auto [p, count] : prime_counts) {
	  if (count < n) {
		cout << p << endl;
		break;
	  }
	}
  }
}`
const E = String.raw`static constexpr size_t MAX_N = 2e5;

// o(n)
static bool works(const int32_t gap, const span<int32_t> a, const int32_t x, const uint32_t finding) {
  uint32_t found = 0;
  // gap from 0 to a[0]
  found += max(0, a[0] - (gap - 1));
  if (found >= finding) {
	return true;
  }
  for (uint32_t i = 0; i < a.size() - 1; i++) {
	found += max(0, a[i + 1] - a[i] - 2 * gap + 1);
	if (found >= finding) {
	  return true;
	}
  }
  // gap from a[n-1] to x
  found += max(0, x - (a[a.size() - 1] + (gap - 1)));
  if (found >= finding) {
	return true;
  }
  return false;
}

int main() {
  static array<int32_t, MAX_N> a_buf;
  int t;
  cin >> t;
  while (t--) {
	int32_t n, x;
	uint32_t k;
	cin >> n >> k >> x;
	for (int32_t i = 0; i < n; i++) {
	  cin >> a_buf[i];
	}
	span a(a_buf.data(), n);
	ranges::sort(a);

	// nlog(n) total
	int32_t l = 0, r = x + 1;
	while (l < r) {
	  if (const int32_t mid = (l + r) / 2; works(mid, a, x, k)) {
		l = mid + 1;
	  } else {
		r = mid;
	  }
	}
	// l == the maximum distance away you can put a teleporter
	assert(l == r);
	assert(works(l - 1, a, x, k));
	assert(not works(l, a, x, k));

	const int32_t ans = l - 1;

	uint32_t placed = 0;
	if (ans == 0) {
	  for (uint32_t i = 0; i < k; i++) {
		cout << i << ' ';
	  }
	  placed = k;
	  goto done;
	}

	// gap from 0 to a[0]
	for (int32_t i = 0; i <= a[0] - ans; i++) {
	  cout << i << ' ';
	  placed++;
	  if (placed >= k)
		goto done;
	}
	for (int32_t i = 0; i < n - 1; i++) {
	  for (int32_t j = a[i] + ans; j <= a[i + 1] - ans; j++) {
		cout << j << ' ';
		placed++;
		if (placed >= k)
		  goto done;
	  }
	}
	// gap from a[n-1] to x
	for (int32_t i = a[n - 1] + ans; i <= x; i++) {
	  cout << i << ' ';
	  placed++;
	  if (placed >= k)
		goto done;
	}
  done:
	assert(placed == k);
	cout << '\n';
  }
  cout << flush;
}`
const F = String.raw`// returns how many children this guy has
uint32_t dfs(const uint32_t at, vector<bool>& explored, const unordered_map<uint32_t, vector<uint32_t>>& adj,
             const uint32_t n, const uint32_t k, uint64_t& out) {
  vector<uint32_t> c{};
  explored[at] = true;
  for (const uint32_t child : adj.at(at)) {
	if (explored[child])
	  continue;
	c.push_back(dfs(child, explored, adj, n, k, out));
  }
  const uint32_t sum_c = accumulate(c.begin(), c.end(), 0u);
  // pushing back to represent the other nodes in the tree
  // (this is another child branch)
  c.push_back(n - 1 - sum_c);

  // suppose the root is down one of these other branches?
  // in particular, we want to find |{i for ci in c if n - 1 - c_i >= k}| which is equal to  |{i for ci in c if n - 1 -
  // k >= c_i}| then add this number to out
  for (const uint32_t ci : c) {
	out += (n - k >= ci) * ci;
  }
  // suppose this node is the root, in particular we are looking for a combination of this node plus a bunch of children
  out += n >= k;
  return sum_c + 1;
}

int main() {
  int t;
  cin >> t;
  while (t--) {
	uint32_t n, k;
	cin >> n >> k;
	unordered_map<uint32_t, vector<uint32_t>> adj{};
	vector explored(n + 1, false);
	for (uint32_t i = 0; i < n - 1; i++) {
	  uint32_t u, v;
	  cin >> u >> v;
	  adj[u].push_back(v);
	  adj[v].push_back(u);
	}

	// arbitrarily, let us traverse starting at 1
	uint64_t out = 0;
	(void)dfs(1, explored, adj, n, k, out);
	cout << out << '\n';
  }
  cout << flush;
}

`
const G = String.raw`int main() {
  static array<uint32_t, 8000> a;
  static array<uint32_t, 8000> c;
  static array<uint64_t, 8001> dp;
  // n^2 = 8e3^2 = 6e7 < 1e9 by 1.5 orders of magnitude (LMAOOOOO)

  int t;
  cin >> t;
  while (t--) {
	uint32_t n;
	cin >> n;
	for (uint32_t i = 0; i < n; i++) {
	  cin >> a[i];
	}
	for (uint32_t i = 0; i < n; i++) {
	  cin >> c[i];
	}
	std::ranges::fill_n(dp.begin(), n + 1, 0);
	// let dp[i] be the max saved cost from keeping a nondecreasing sequence from [0,i)
	for (uint32_t i = 1; i <= n; i++) {
	  for (uint32_t j = 0; j < i; j++) {
		if (j == 0 or a[j - 1] <= a[i - 1]) {
		  const uint64_t candidate_savings = dp[j] + c[i - 1];
		  dp[i] = max(dp[i], candidate_savings);
		}
	  }
	}
	const uint64_t sum_c = std::accumulate(c.begin(), c.begin() + n, 0ull);
	const uint64_t max_savings = *max_element(dp.begin(), dp.begin() + n + 1);
	cout << sum_c - max_savings << '\n';
  }
  cout << flush;
}`

export default function Round1062() {
	return (
		<WriteupTemplate title="Codeforces Round #1062" tags={[]} href="https://codeforces.com/contest/2167" href_name="Codeforces Round #1062">
			<article className="prose dark:prose-invert mx-auto">
				<p>1062 is a div 4 contest, so it was a bit easier. the hardest problems were about 1600</p>
				<h2>Problem A</h2>
				<p>Simply checking a=b and b=c and c=d is sufficient (transitivity of equivalence relationships)</p>
				<h2>Problem B</h2>
				<p>
					We need to check if a string is a permutation of another string. This can be achieved by checking that the frequency of each character is the same in both strings.
					Since strings only comprise of 26 characters, we can use a simple array of size 26 to count the frequency of each character in both strings and compare them.
				</p>
				<h2>Problem C</h2>
				<p>
					The key to this problem is that the only way there can be no movement is if all are even or all odd.
				</p>
				<p>
					Suppose WLOG (with respect to the parity of the majority of elements) that all are even, and there exists some element which is odd. (in particular not all even)
					Suppose we want to swap arbitrary even elements at positions a, b, with the odd element at c, with a != b != c.
					Then we can swap a and c, then b and c, then a and c again, which is equivalent to swapping a and b
				</p>
				<p>
					Thus, the answer is the sorted list if there are both odds and evens, otherwise don't touch the list
				</p>
				<h2>Problem D</h2>
				<p>
					<ReactKatex>{`
						We know that $gcd(a,b)=1\\iff a, b$ are coprime. The problem can be stated as
						$$\\min_x \\exists a_i\\in A, gcd(x, a_i)=1$$
						Let $F(x)$ map $x$ to a set of it's prime factors. The problem can be rephrased through set theory as
						$$\\min_x \\exists a_i\\in A, F(x) \\cap F(a_i) = \\emptyset$$
					`}
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						It is relatively obvious that the $x$ that we are looking for is prime.
						If $x$ was not prime, then it would have a prime factor $p$ such that $p \in F(x)$.
						Then, if $p \in F(a_i)$ for some $a_i$, then $F(x) \cap F(a_i) \neq \emptyset$, and if $p \notin F(a_i)$ for some $a_i$,
						then we can replace $x$ with $p$ and get a smaller number that satisfies the condition.
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
						This problem can be solved by recognizing the the answer has to be one of the first 16 primes.
						We first observe that $a_i\\le10^{18}$. Suppose for contradiction that the first 16 primes all fail the condition, namely
						$$\\forall x\\in \\{p_1, p_2, \\ldots, p_{16}\\}, \\forall a_i\\in A, F(x) \\cap F(a_i) \\ne \\emptyset$$
						In particular, we know that $F(x)=x$, hence
						$$\\forall x\\in \\{p_1, p_2, \\ldots, p_{16}\\}, \\forall a_i\\in A, x\\in F(a_i)$$
						This is clearly a contradiction, since the product of the first 16 primes is $32589158477190044730>10^{18}$,
						and thus $\\exists a_i$ such that $F(a_i)$ does not contain one of the first 16 primes.
					`}
					</ReactKatex>
				</p>
				<p>
					The threshold for the number of primes required was checked using the primordial numbers (found <Link href="https://oeis.org/A002110" target="_blank">here</Link>).
				</p>
				<p>
					Hence, we can check for the presence of each of the first 16 primes in the prime factorization of each number in the list, and return the smallest prime that is not present in any of the numbers.
					This is O(n).
				</p>
				<h2>Problem E</h2>
				<p>
					<ReactKatex>{`
						Binary search can be used to find the shortest time taken for the friend to get to a teleporter.
						For this to be true, it must be shown that the maximum number of teleporters placed is monotonic with respect to the time.
						In particular, by reducing the shortest time taken for a friend to get to a teleporter, the maximum number of teleporters that can be placed can be increased.
						This is intuiatively true because by reducing the time, you can place more teleporters closer to the friends, and thus more teleporters can be placed.
					`}</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						Hence, binary search can be used to find the shortest time for which the number of teleporters placed is at least $k$.
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
						It is possible in $O(n)$ time to determine if $t$ is a possible solution.
						We check each gap between friends, and place teleporters at least $t$ away from the endpoints of the gap.
						In particular, for a gap between friends at $a_i$ and $a_{i+1}$, we can place $max(0, (a_{i+1}-t) - (a_i+t) + 1)$ teleporters in the gap.
						We can then check if the total number of teleporters placed is at least $k$.
					`}</ReactKatex>
				</p>
				<p>
					One note is that it is also important to check the edge cases where the first and last friends are at the edges of the line, and we can place teleporters before the first friend and after the last friend.
				</p>
				<p>
					The final step is to reconstruct the solution. The reconstruction follows the same logic as the check, and we can place the teleporters greedily.
				</p>
				<h2>Problem F</h2>
				<p>
					I think the best way to have an intuiative understanding of the solution to this problem is to ensure you have an intuiative understanding of LCA.
					In particular, the most important property to know is that,
					<ReactKatex>{`
						given $K$ is a set of nodes, and $n$ is a node, then
						$$LCA(K) = n \\iff \\lnot (\\exists n_0\\text{ which is a child of }n, \\forall k\\in K, k\\text{ is a ancestor of } n_0)$$
					`}
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						Specifically, we are asking for the elements of $K$ to be in at least two different subtrees of $n$.
						Both directions are relatively easy to prove.
						The forward direction is true because if all elements of $K$ are in the same subtree of $n$, then the LCA of $K$ is in that subtree, and thus cannot be $n$.
						The reverse direction is true because if there exists a child $n_0$ of $n$ such that all elements of $K$ are in the subtree of $n_0$, then the LCA of $K$ is in the subtree of $n_0$, and thus cannot be $n$.
					</ReactKatex>
				</p>
				<p>
					Using a DFS, we can keep track of how many children are in each subtree of a given node
					The final "subtree" is the subtree containing the parent of the node (trees are reversible in this way, we can think of it as a rerooting).
					The number of nodes in this final "subtree" is determinable by the number of nodes in the tree minus the number of nodes in the subtrees of the node.
				</p>
				<p>
					<ReactKatex>
						{`
						Consider the contribution of a single node $n$ to the final result.
						We can consider rerooting this tree at some node $n_1$ in some subtree $S$ of $n$.
						By rerooting at $n_1$, the subtree $S$ cannot supply nodes towards $K$, as they would be ancestors (and not descendants) of $n$.
						However, all other subtrees area still in contention. Hence, as long as the other subtrees (at least two of them) provide enough nodes (at least $k$), then the LCA of $K$ is still $n$.
						Note that if the above works for $n_1$, then it works for all nodes in $S$.
						In particular, this means that node $n$ is in all $S_{n_i}\\forall n_i\\in S$, which contributes 1 to $|S_{n_i}|\\forall n_i\\in S$, which contributes $|S|$ to the final answer.
						`}
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						As a minor edge case, we also need to consider if the tree is rooted at $n$.
						In this case, the subtree containing the parent of $n$ does not exist, and thus we need to check if there are at least two subtrees of $n$ which have at least $k$ nodes.
					</ReactKatex>
				</p>

				<p>
					Hence, the final algorithm is as follows:
				</p>
				<ol>
					<li>Run a DFS to find the size of each subtree, including the "subtree" containing the parent</li>
					<li> For each node, remove each subtree, and check if within the remaining subtrees if there are at least two subtrees which combined have at least k nodes. </li>
					<li>If so, add the size of the removed subtree to the final answer</li>
					<li>Remember to also consider the edge case where the tree is rooted at the node in question</li>
				</ol>

				<h2>Problem G</h2>
				<p>
					<ReactKatex>
						{`
							Problem G is a typical DP problem.
							The first important observation is that
							$$\\sum_{replaced} c_i = \\sum c_i - \\sum_{kept} c_i$$
						`}
					</ReactKatex>
				</p>
				<p>
					Hence, instead of minimimzing the cost of the items which are replaced, we can maximize the cost of the items which are kept.
				</p>
				<p>
					The second important observation is that the kept elements must form a increasing subsequence.
					Hence, we can use a DP to find the maximum cost of an increasing subsequence.
					This number can then be subtracted from the total cost to find the minimum cost of the replaced elements.
				</p>
			</article>

			<div className="container mx-auto">
				<h2 className="font-semibold text-2xl">A</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{A}
				</ShikiHighlighter>
				<br />
				<h2 className="font-semibold text-2xl">B</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{B}
				</ShikiHighlighter>
				<br />
				<h2 className="font-semibold text-2xl">C</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{C}
				</ShikiHighlighter>
				<br />
				<h2 className="font-semibold text-2xl">D</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{D}
				</ShikiHighlighter>
				<br />
				<h2 className="font-semibold text-2xl">E</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{E}
				</ShikiHighlighter>
				<br />
				<h2 className="font-semibold text-2xl">F</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{F}
				</ShikiHighlighter>
				<br />
				<h2 className="font-semibold text-2xl">G</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{G}
				</ShikiHighlighter>
			</div>
		</WriteupTemplate>
	);
}