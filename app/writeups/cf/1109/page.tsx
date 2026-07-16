'use client'

import ShikiHighlighter from "react-shiki";
import WriteupTemplate from "../../WriteupTemplate";
import FFig1 from "./1109f1.svg";
import FFig1Dark from "./1109f1_dark.svg";
import FFig2 from "./1109f2.svg";
import FFig2Dark from "./1109f2_dark.svg";
import ReactKatex from "@pkasila/react-katex";

const A = String.raw`int main() {
  int t;
  cin >> t;
  while (t--) {
	int n;
	cin >> n;
	string s;
	cin >> s;
	int streak = 0;
	int max_s = 0;
	for (int i = 0; i < n; i++) {
	  switch (s[i]) {
	  case '*':
		max_s = max(max_s, streak);
		streak = 0;
		break;
	  case '#':
		streak += 1;
		break;
	  default:;
	  }
	}
	max_s = max(max_s, streak);
	cout << (max_s + 1) / 2 << endl;
  }
}`
const B = String.raw`int main() {
  static constexpr size_t MAX_N = 2e5;
  static array<uint32_t, MAX_N> a_buf{};
  int t;
  cin >> t;
  while (t--) {
	size_t n;
	cin >> n;
	span a(a_buf.data(), n);
	for (size_t i = 0; i < n; i++) {
	  cin >> a[i];
	}

	uint64_t extra_books = 0;
	bool works = true;
	for (size_t i = 0; i < n; i++) {
	  if (a[i] + extra_books >= i + 1) {
		extra_books += a[i] - (i + 1);
	  } else {
		works = false;
	  }
	}
	cout << (works ? "YES" : "NO") << endl;
  }
}`
const C = String.raw`int main() {
  static constexpr size_t MAX_N = 2e5;
  static array<uint32_t, MAX_N> a_buf{};
  int t;
  cin >> t;
  while (t--) {
	int n, x, y;
	cin >> n >> x >> y;
	for (int i = 0; i < n; i++) {
	  cin >> a_buf[i];
	  --a_buf[i];
	}
	DSU<uint32_t> d(n);
	for (int i = 0; i < n; i++) {
	  if (i + x < n)
		d.unite(i, i + x);
	  if (i + y < n)
		d.unite(i, i + y);
	}
	bool ok = true;
	for (int i = 0; i < n; i++) {
	  if (d.find(i) != d.find(a_buf[i])) {
		ok = false;
		break;
	  }
	}
	cout << (ok ? "YES" : "NO") << '\n';
  }
  return 0;
}
`
const D = String.raw`static int64_t solve(const span<int32_t> a, const span<uint32_t> b) {
  int64_t out = 0;
  // out += abs(sum(a[0: b[0]]));
  {
	int64_t sum = 0;
	for (size_t j = 0; j <= b[0]; j++) {
	  sum += a[j];
	}
	out += abs(sum);
  }
  for (size_t i = 0; i < b.size() - 1; i++) {
	// out += abs(sum(a[b[i]: b[i + 1]]));
	int64_t sum = 0;
	for (size_t j = b[i] + 1; j <= b[i + 1]; j++) {
	  sum += a[j];
	}
	out += abs(sum);
  }
  {
	// out += sum(a[b[m-1]: n]);
	for (size_t j = b[b.size() - 1] + 1; j < a.size(); j++) {
	  out += a[j];
	}
  }
  return out;
}

int main() {
  static constexpr size_t MAX_N = 2e5;
  static array<int32_t, MAX_N> a_buf;
  static array<uint32_t, MAX_N> b_buf;
  int t;
  cin >> t;
  while (t--) {
	size_t n, m;
	cin >> n >> m;
	for (size_t i = 0; i < n; ++i) {
	  cin >> a_buf[i];
	}
	for (size_t i = 0; i < m; ++i) {
	  cin >> b_buf[i];
	  b_buf[i]--;
	}
	const span a(a_buf.data(), n);
	const span b(b_buf.data(), m);
	ranges::sort(b);
	cout << solve(a, b) << "\n";
  }
  cout << flush;
}`
const E = String.raw`template <integral T> static constexpr T ceildiv(T a, T b) { return (a + b - 1) / b; }

int main() {
  static constexpr size_t MAX_N = 2e5;
  static array<uint32_t, MAX_N> violations_buf{};

  int t;
  cin >> t;
  while (t--) {
	size_t n, q;
	cin >> n >> q;
	// precompute the amount of violations in a range
	// violations[i] gives number of violations from [0:i)
	violations_buf[0] = violations_buf[1] = 0;
	char last, at;
	cin >> last;
	for (size_t i = 1; i < n; i++) {
	  cin >> at;
	  violations_buf[i + 1] = violations_buf[i] + (last == at);
	  last = at;
	}

	for (size_t i = 0; i < q; i++) {
	  size_t l, r, k;
	  cin >> l >> r >> k;
	  const bool ok = ceildiv(violations_buf[r] - violations_buf[l], 2u) <= k;
	  cout << (ok ? "YES" : "NO") << endl;
	}
  }
}`
const F = String.raw`struct m {
  size_t min;
  size_t max;
};
optional<m> dfs(const size_t at, const vector<vector<size_t>>& children, const vector<size_t>& values) {
  vector<m> child_values{};
  for (const size_t c : children[at]) {
	const optional<m> x = dfs(c, children, values);
	if (not x) {
	  return nullopt;
	}
	child_values.push_back(x.value());
  }

  if (child_values.empty()) {
	assert(values[at] != 0);
	return m{values[at], values[at]};
  }
  assert(values[at] == 0);

  const size_t n = child_values.size();
  const size_t o =
      min_element(child_values.begin(), child_values.end(), [](const m& a, const m& b) { return a.min < b.min; }) -
      child_values.begin();
  for (size_t i = 0; i < n - 1; i++) {
	if (child_values[(i + o) % n].max > child_values[(i + o + 1) % n].min) { // order violation
	  return nullopt;
	}
  }

  return m{child_values[o].min, child_values[(o - 1 + n) % n].max};
}

int main() {
  int t;
  cin >> t;
  while (t--) {
	size_t n;
	cin >> n;
	vector<vector<size_t>> children;
	children.resize(n + 1);
	vector<size_t> values(n + 1);
	for (size_t i = 2; i <= n; i++) {
	  size_t parent;
	  cin >> parent;
	  children[parent].push_back(i);
	}
	for (size_t i = 1; i <= n; i++) {
	  cin >> values[i];
	}
	// root at 1 always :)
	cout << (dfs(1, children, values).has_value() ? "YES" : "NO") << endl;
  }
}`
const G = String.raw`// fenwick tree is omitted for brevity. just get ai to generate a template max fenwick tree lmao
int main() {
  static constexpr size_t MAX_N = 2e5;
  int t;
  cin >> t;
  static array<uint32_t, MAX_N> a_buf{};
  while (t--) {
	size_t n;
	cin >> n;
	span a(a_buf.data(), n);
	for (size_t i = 0; i < n; i++) {
	  cin >> a[i];
	}
	fenwick<uint32_t> dp(n); // query allowed based on j
	                         // index this can be popped, and value
	struct k {
	  size_t leave_index;
	  size_t original_loc;
	  uint32_t value;
	  auto operator<=>(const k& other) const { return leave_index <=> other.leave_index; };
	};
	priority_queue<k, vector<k>, greater<>> pq; // allowed based on i
	for (size_t i = 0; i < n; i++) {
	  // feed pq into dp
	  while (not pq.empty() and pq.top().leave_index <= i) {
		dp.update(pq.top().original_loc + 1, pq.top().value);
		pq.pop();
	  }
	  // solve current
	  const uint32_t v = a[i] + dp.query(i - a[i]);
	  pq.emplace(i + a[i] + 1, i, v);
	}

	uint32_t out = 0;
	while (not pq.empty()) {
	  out = std::max(out, pq.top().value);
	  pq.pop();
	}
	out = max(out, dp.query(n));
	cout << out << '\n';
  }
  cout << flush;
}`

export default function Round1109() {
	return (
		<WriteupTemplate title="Codeforces Round #1109" tags={[]} href="https://codeforces.com/contest/2244" href_name="Codeforces Round #1109">
			<article className="prose dark:prose-invert mx-auto">
				<p>very dp heavy contest, i think there was something of a theme running there under dp as well.</p>
				<h2>Problem A</h2>
				<p>
					We can think of each line segment as an independent problem.
					In particular, if a line segment has length l, then it takes ceil(l/2) operations to clear.
					Hence, max_i(ceil(li/2)) is the answer.
				</p>
				<h2>Problem B</h2>
				<p>
					The greediest strategy is to try to conform the list to 1, 2, 3, 4, ....
					In particular, any books which are extra to this pattern can be bumped to later stacks.
					As long as there are sufficient books to form the pattern, the answer is yes, otherwise no.
				</p>
				<h2>Problem C</h2>
				<p>
					We can form a partition over the elements over the array based on which are reachable from each other.
					We know that this forms a partition because reachability forms an equivalent class, in particular
				</p>
				<ul>
					<li>Reflexive: any element is reachable from itself</li>
					<li>Symmetric: if element A is reachable from element B, then element B is reachable from element A (by using the same jumps)</li>
					<li>Transitive: if element A is reachable from element B, and element B is reachable from element C, then element A is reachable from element C</li>
				</ul>
				<p>Hence, we perform disjoint set unions to join each element at index i, with elements at index i + x and i + y. (this also joins elements j to elements j - x and j-y)</p>
				<h2>Problem D</h2>
				<p>
					This problem requires bashing a few sums, so bear with me.
				</p>
				<p>
					<ReactKatex>{`
						Suppose there was a post with impact value $b_1$. The total productivity is
						$$\\sum_{0\\le i<n} a_i $$
						However, by taking the post with impact value $b_1$, the total productivity is
						$$
						\\sum_{0\\le i\\le b_1} -a_i + \\sum_{b_1< i<n} a_i
						=-\\sum_{0\\le i\\le b_1} a_i + \\sum_{b_1< i<n} a_i
						$$
						This shows that the negative sign carries to the outside of the sum (linearity of mult by -1).
					`}</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
						Now, let's suppose we also want to take post $b_2$ with $b_1 < b_2$. The total productivity is
						$$
						+\\sum_{0\\le i\\le b_1} a_i - \\sum_{b_1< i\\le b_2} a_i + \\sum_{b_2< i<n} a_i
						$$
						We can visualize this as the range $[0,b_1]$ getting double flipped.
						In general, we can imagine partitioning $[0, n)$ into ranges $[0,b_1], (b_1, b_2], (b_2, b_3], ..., (b_{m-1}, b_m], (b_m, n)$.
						These ranges can be arbitrarily flipped through taking some motivational posts.
					`}</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
					The best strategy is to take the posts which makes each of the ranges maximal.
					In particular, the sum of the range can either be
					$$\\sum_{i=b_i}^{b_{i+1}} a_i, -\\sum_{i=b_i}^{b_{i+1}} a_i$$
					for which
					$$\\max\\left\\{\\sum_{i=b_i}^{b_{i+1}} a_i, -\\sum_{i=b_i}^{b_{i+1}} a_i\\right\\} = \\left|\\sum_{i=b_i}^{b_{i+1}} a_i\\right|$$
					A key insight is that we actually don't need to determine which posts to take, we can simply reason about the impact of taking the optimal set of posts.
					Also note that the last range is always as is.
					`}</ReactKatex>
				</p>
				<h2>Problem E</h2>
				<p>
					This problem builds on many of the ideas in Problem D.
				</p>
				<p>
					In order for the final string to be alternating,
				</p>
				<p>
					<ReactKatex>{`
						A key insight is that flipping a given range does not affect the alternating nature of that range.
						Hence, a flip of a range is only used to modify the alternating nature of the ranges immediately adjacent (before and after) to it.
						Note that each range flip can be used to modify two seperate locations where the string is not alternating.
						It can also be used to modify a single location by flipping a range from 1 to the location.
						Hence, we can use a prefix sum array to keep track of for each range (between the given $l, r$) how many non-alternating locations exist ($x$), then using $\\lceil \\frac{x}{2} \\rceil$ flips to fix the non-alternating locations.
					`}</ReactKatex>
				</p>
				<h2>Problem F</h2>
				<p>
					The key to solving this problem is effectively visualizing the rotation operation.
				</p>
				<FFig1 className="block dark:hidden w-full" viewBox="0 0 692.573 217.714" />
				<FFig1Dark className="hidden dark:block w-full" viewBox="0 0 692.573 217.714" />
				<FFig2 className="block dark:hidden w-full" viewBox="0 0 1223.43 380.571" />
				<FFig2Dark className="hidden dark:block w-full" viewBox="0 0 1223.43 380.571" />
				<p>Note that</p>
				<ul>
					<li>Relative order is preserved in rotation</li>
					<li>Rotating parents do not affect the relative order of their children</li>
				</ul>
				<p>
					Hence, the only way to have a valid ordering is if
				</p>
				<ul>
					<li>The children of a node can be made to be ordered</li>
					<li>The ranges of the higher nodes are disjoint and ordered (specifically if one node has, for example, children 1, 4 and the other has children 2, 5 this is not sortable)</li>
				</ul>
				<p>
					Hence, a simple DFS, while keeping track of the ranges of the children, is sufficient to solve this problem.
				</p>
				<h2>Problem G</h2>
				<p>
					<ReactKatex>{`
						This is a DP problem, with dp transition as
						$$dp[i] = \\left(\\max_{j < i - a[i]\\text{ and }j + a[j] < i} dp[j]\\right) + a[i]$$
						In particular, $dp[i]$ is the maximum number of books which can be collected if we take index $i$ (and end there).
						This might at first look like an $O(n^2)$ dp. Two mechanisms allow this to be $O(n)$.
					`}
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
						First, we need some mechanism to query 
						$$max_{0 \\leq j < i - a[i]} dp[j]$$
						This is achiveable with a max fenwick tree.
					`}
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
						Next, we need some mechanism to introduce values into the fenwick tree when they are allowed to be queried.
						Specifically, this is to achieve the $j+a[j]<i$ part of the max constraints.
						We need to introduce $dp[i]$ into the fenwick tree at index $i + a[i] + 1$. This is achiveable with a priority queue.
						While traversing through the array, we can pop from the priority queue all elements which are allowed to be queried, and introduce them into the fenwick tree.
					`}
					</ReactKatex>
				</p>
				{/* <p>
					To solve this problem, to mechanisms are required.
					One to give the best result which is takable. 
					One to populate results into the fenwick trees when they are takable.
				</p> */}
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
	)
}