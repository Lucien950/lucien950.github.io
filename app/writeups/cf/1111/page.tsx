'use client'
import WriteupTemplate from "../../WriteupTemplate";
import ReactKatex from "@pkasila/react-katex";
import FigC from "./1111c.svg"
import FigCDark from "./1111c_dark.svg"
import FigD from "./1111d.svg"
import FigDDark from "./1111d_dark.svg"
import FigE from "./1111e.svg"
import FigEDark from "./1111e_dark.svg"
import FigE2 from "./1111e2.svg"
import FigE2Dark from "./1111e2_dark.svg"
import ShikiHighlighter from "react-shiki";

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
  int t;
  cin >> t;
  while (t--) {
	uint32_t n, k, m;
	cin >> n >> k >> m;
	if (k > n) {
	  // otherwise, there is no contiguous subarray of length k
	  cout << "NO\n";
	  continue;
	}
	// k < n
	if (m < k) { // namely we need m/k>=1 aka m >= k
	  cout << "NO\n";
	  continue;
	}
	// m/k>=1

	cout << "YES\n";
	const uint32_t moverk = m / k;
	for (size_t i = 0; i < k - 1; i++) {
	  cout << moverk << ' ';
	}
	cout << (moverk + m % k) << ' ';
	for (size_t i = 0; i < n - k; i++) {
	  cout << "1 ";
	}
	cout << '\n';
  }
  cout << flush;
}`
const C = String.raw`int main() {
  static vector<bool> a, b;
  constexpr size_t MAX_N = 2e5;
  a.reserve(MAX_N);
  b.reserve(MAX_N);

  int t;
  cin >> t;
  while (t--) {
	size_t n;
	cin >> n;
	a.resize(n);
	b.resize(n);
	for (size_t i = 0; i < n; i++) {
	  int c;
	  cin >> c;
	  a[i] = c == 1;
	}
	for (size_t i = 0; i < n; i++) {
	  int c;
	  cin >> c;
	  b[i] = c == 1;
	}

	uint32_t one_zero_flips = 0;
	bool has_zero_one_flips = false, has_zero_zeros = false, has_one_one = false;
	for (size_t i = 0; i < n; i++) {
	  one_zero_flips += a[i] and not b[i];
	  has_zero_one_flips |= not a[i] and b[i];
	  has_zero_zeros |= not a[i] and not b[i];
	  has_one_one |= a[i] and b[i];
	}

	if (one_zero_flips == 0) {                // no 1->0s
	  if (has_zero_one_flips) {               // namely it's only 0->1 flips
		if (has_zero_zeros and has_one_one) { // has 0 -> 0
		  cout << "2\n";
		  continue;
		}
		// note that 1->1s do nothing as they get converted to 0->1s
		cout << "-1\n";
		continue;
	  }
	  // there are no flips to do
	  cout << "0\n";
	} else if (one_zero_flips % 2 == 1) {
	  // note we can merge the 0->1 flips into this flip
	  cout << "1\n";
	} else {
	  // note we can merge the 0->1 flips into the first flip
	  cout << "2\n";
	}
  }
}`
const D = String.raw`bool works(const uint32_t n, const span<uint32_t> a, const span<uint32_t> a_sorted) {
  const size_t k = 1 << n;
  // check if the frequency of elements in chunks of k are the same
  vector<uint32_t> a_buf;
  a_buf.reserve(k);

  for (size_t i = 0; i < a.size(); i += 2 * k) {
	a_buf.clear();
	const size_t count = min(2 * k, a.size() - i);

	ranges::copy(a.subspan(i, count), back_inserter(a_buf));
	ranges::sort(a_buf);

	if (!ranges::equal(a_buf, a_sorted.subspan(i, count))) {
	  return false;
	}
  }
  return true;
}

int main() {
  int t;
  constexpr size_t MAX_N = 1e6;
  static array<uint32_t, MAX_N> a_buf;
  static array<uint32_t, MAX_N> a_sorted_buf;
  cin >> t;
  while (t--) {
	uint32_t n, q;
	cin >> n >> q;
	const span a(a_buf.data(), n);
	const span a_sorted(a_sorted_buf.data(), n);
	assert(q == 0);

	for (size_t i = 0; i < n; i++) {
	  cin >> a[i];
	}
	for (size_t i = 0; i < q; i++) {
	  // we'll do this in d2.cpp
	}

	ranges::copy(a, a_sorted.begin());
	ranges::sort(a_sorted);

	if (ranges::equal(a, a_sorted)) {
	  cout << 0 << '\n';
	  continue;
	}

	// figure out if a is k-sortable (with k = 1<<n)
	int32_t l = 0, r = 20;
	while (l < r) {
	  // do something with mid
	  if (const uint32_t mid = (l + r) / 2; works(mid, a, a_sorted)) {
		// works :)
		r = mid;
	  } else {
		// doesn't work :(
		l = mid + 1;
	  }
	}
	cout << (1 << l) << '\n';
  }
  cout << flush;
}`
const D2 = String.raw`template <auto f, typename T>
concept segtree_fcn = requires(const T& a, const T& b, const uint32_t l) {
  { f(a, b, l) } -> std::same_as<T>;
};

template <typename T, auto f>
  requires segtree_fcn<f, T> && default_initializable<T>
struct Tree {
  vector<T> s;
  size_t n; // number of leaves
  uint32_t max_level;
  explicit Tree(const size_t n, const T def = {}) : s(2 * n, def), n(n), max_level(32 - __builtin_clz(n - 1)) {}
  void update(size_t pos, const T val) {
	s[pos += n] = val;
	uint32_t l = 1; // start at 2^1 = 2
	for (; pos >>= 1; l++)
	  s[pos] = f(s[pos << 1], s[pos << 1 | 1], 1 << l);
  }

  [[nodiscard]] T query(size_t b, size_t e) const { // query [ b , e)
	T ra = {}, rb = {};
	b += n;
	e += n;
	uint32_t l = 0;
	for (; b < e; b >>= 1, e >>= 1, l++) {
	  if (b & 0b1) // if the last digit of b is a 1
		ra = f(ra, s[b++], 1 << l);
	  if (e & 0b1) // if the last digit of e is a 1
		rb = f(s[--e], rb, 1 << l);
	}
	// maybe l+1?
	return f(ra, rb, 1 << l);
  }
  [[nodiscard]] const T& root() const { return s[1]; }
};

struct node {
  uint32_t min = numeric_limits<uint32_t>::max();
  uint32_t max = 0;
  uint32_t k = 0;
  node(const uint32_t _max, const uint32_t _min) : min(_min), max(_max) {}
  node(const uint32_t max, const uint32_t min, const uint32_t k) : min(min), max(max), k(k) {};
  node() = default;
};
node fcn(const node& a, const node& b, const uint32_t len) {
  uint32_t new_k = max(a.k, b.k);
  if (a.max > b.min) {
	new_k = max(new_k, len / 2);
  }
  return {max(a.max, b.max), min(a.min, b.min), new_k};
}
int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int t;
  cin >> t;
  while (t--) {
	uint32_t n, q;
	cin >> n >> q;
	uint32_t N = 1; // N = min {k|2^k >= n}
	while (N < n)
	  N *= 2;

	Tree<node, fcn> segtree(N, {numeric_limits<uint32_t>::max(), numeric_limits<uint32_t>::max(), 0});
	for (size_t i = 0; i < n; i++) {
	  uint32_t a;
	  cin >> a;
	  segtree.update(i, {a, a});
	}
	cout << segtree.root().k << '\n';
	for (size_t i = 0; i < q; i++) {
	  uint32_t index, reset_value;
	  cin >> index >> reset_value;
	  segtree.update(index, {reset_value, reset_value});
	  cout << segtree.root().k << '\n';
	}
  }
  cout << flush;
}`
const E = String.raw`#include <iostream>
using namespace std;

int main() {
  int t;
  cin >> t;
  while (t--) {
	uint64_t n, k;
	cin >> n >> k;
	const uint64_t lb_k = 2 * (n - 1);
	if (const uint64_t ub_k = n * (n - 1) / 2 + n / 2; k % 2 != 0 or k < lb_k or k > ub_k) {
	  cout << -1 << endl;
	  continue;
	}
	cout << 1 << ' ' << 2 << '\n';
	if (k == 2) {
	  continue;
	}
	cout << 1 << ' ' << 3 << '\n';
	// append to 2 and 3 as required to eliminate excesses
	// if excess goes to 0, connect everything else to 1 directly
	uint64_t excess = k - lb_k;
	for (uint64_t i = 4; i <= n; i++) {
	  if (excess == 0) {
		cout << 1 << ' ' << i << '\n';
		continue;
	  }
	  const uint64_t max_excess_kill = (i / 2 * 2) - 2; // for odds, the amount to kill is the same as the previous even
	  const uint64_t exceed_kill = min(excess, max_excess_kill);
	  excess -= exceed_kill;
	  cout << (exceed_kill + (i % 2 == 1)) << ' ' << i << '\n';
	}
  }
  cout << flush;
}`
const F = String.raw`constexpr uint32_t MOD = 998'244'353; // 2 bits away from 32-bit integer overflow
constexpr uint32_t MOD2 = 1'000'000'007;
const uint32_t MOD3 = 1'000'000'009;

template <integral T, T mod> class modder {
  static_assert(mod > 0, "mod must be positive");
  static_assert(MOD * 2 < numeric_limits<T>::max()); // this makes sure that addition (and sub?) doesn't overflow

public:
  T val;

  modder operator+(const modder& b) const { return {this->val + b.val}; }
  modder operator-(const modder& b) const { return {this->val - b.val + mod}; }
  modder operator*(const modder& b) const {
	const __uint128_t out =
	    static_cast<__uint128_t>(val) * static_cast<__uint128_t>(b.val) % static_cast<__uint128_t>(mod);
	static_assert(sizeof(out) == 16, "out must be 128 bits");
	return {static_cast<T>(out)};
  }
  modder& operator+=(const modder& b) {
	val = (val + b.val) % mod;
	return *this;
  }

  bool operator==(const modder&) const = default;

  modder() = default;
  // ReSharper disable once CppNonExplicitConvertingConstructor
  constexpr modder(const T a) { val = (a + mod) % mod; }
};

template <typename ExpectedT, typename CheckType> struct is_instance_of_A : std::false_type {};
template <typename T, T S> struct is_instance_of_A<T, modder<T, S>> : std::true_type {};
template <typename CheckType, typename ExpectedT>
concept FromModder = is_instance_of_A<ExpectedT, CheckType>::value;
// you have 3 modders because idk man
template <typename T, FromModder<T> m1, FromModder<T> m2, FromModder<T> m3> class hasher {
  constexpr hasher(const m1 h1, const m2 h2, const m3 h3) : h1(h1), h2(h2), h3(h3) {}

public:
  m1 h1{};
  m2 h2{};
  m3 h3{};
  hasher operator+(const hasher& b) const { return {h1 + b.h1, h2 + b.h2, h3 + b.h3}; }
  hasher operator-(const hasher& b) const { return {h1 - b.h1, h2 - b.h2, h3 - b.h3}; }
  hasher operator*(const hasher& b) const { return {h1 * b.h1, h2 * b.h2, h3 * b.h3}; }
  hasher& operator+=(const hasher& b) {
	h1 += b.h1;
	h2 += b.h2;
	h3 += b.h3;
	return *this;
  }
  hasher() = default;
  explicit constexpr hasher(T x) : h1(x), h2(x), h3(x) {}

  bool operator==(const hasher&) const = default;
  hasher& operator=(const hasher& other) = default;
};
using problemhash = hasher<uint64_t, modder<uint64_t, MOD>, modder<uint64_t, MOD2>, modder<uint64_t, MOD3>>;
template <> struct std::hash<problemhash> {
  std::size_t operator()(const problemhash& p) const noexcept {
	// Combine the three hash values using a bitwise shift and XOR to minimize collisions
	return static_cast<std::size_t>(p.h1.val) ^ (static_cast<std::size_t>(p.h2.val) << 1) ^
	       static_cast<std::size_t>(p.h3.val) << 2;
  }
}; // namespace std

static constexpr problemhash zero{0};

template <typename T> class Grid : public vector<vector<T>> {
public:
  void resize(const size_t n, const size_t m) {
	vector<vector<T>>::resize(n);
	for (auto& row : *this) {
	  row.resize(m);
	}
  }
};

template <typename T> class RandomGrid : public Grid<T> {
public:
  void resize(const size_t n, const size_t m) {
	const size_t old_n = Grid<T>::size(), old_m = old_n > 0 ? Grid<T>::at(0).size() : 0;
	Grid<T>::resize(n, m);
	random_device rd;
	mt19937_64 gen(rd());
	// fill with random values
	constexpr uint64_t MM = 2000000000;

	if (old_m < m) {
	  for (size_t i = 0; i < min(n, old_n); i++) {
		for (size_t j = old_m; j < m; ++j) {
		  uint64_t rand_val = gen() % MM + 1;
		  Grid<T>::at(i).at(j) = rand_val;
		}
	  }
	}
	if (old_n < n) {
	  for (size_t i = old_n; i < n; ++i) {
		for (size_t j = 0; j < m; j++) {
		  uint64_t rand_val = gen() % MM + 1;
		  Grid<T>::at(i).at(j) = rand_val;
		}
	  }
	}
  }
};

int main() {
  int t;
  cin >> t;
  Grid<bool> grid{};
  Grid<problemhash> dp1, dp2;
  RandomGrid<uint64_t> h, v;

  static array<uint32_t, 1000010> pw2{};
  pw2[0] = 1;
  for (int i = 1; i < 1000010; i++)
	pw2[i] = pw2[i - 1] * 2 % MOD;

  while (t--) {
	size_t n, m;
	cin >> n >> m;
	grid.resize(n, m);
	dp1.resize(n, m);
	dp2.resize(n, m);
	h.resize(n, m);
	v.resize(n, m);

	for (size_t i = 0; i < n; i++) {
	  for (size_t j = 0; j < m; j++) {
		char c;
		cin >> c;
		grid[i][j] = c == '1';
	  }
	}

	for (size_t i = 0; i < n; i++) {
	  ranges::fill(dp1[i], zero);
	  ranges::fill(dp2[i], zero);
	}
	dp1[0][0] = dp2[n - 1][m - 1] = problemhash{1};

	// forward pass on dp1
	for (size_t i = 0; i < n; i++) {
	  for (size_t j = 0; j < m; j++) {
		if (not grid[i][j])
		  continue;
		if (i > 0)
		  dp1[i][j] += dp1[i - 1][j] * problemhash{v[i - 1][j]};
		if (j > 0)
		  dp1[i][j] += dp1[i][j - 1] * problemhash{h[i][j - 1]};
	  }
	}
	// backwards pass on dp2
	for (int64_t i = static_cast<int64_t>(n) - 1; i >= 0; i--) {
	  for (int64_t j = static_cast<int64_t>(m) - 1; j >= 0; j--) {
		if (not grid[i][j])
		  continue;
		if (i < static_cast<int64_t>(n) - 1)
		  dp2[i][j] += dp2[i + 1][j] * problemhash{v[i][j]};
		if (j < static_cast<int64_t>(m) - 1)
		  dp2[i][j] += dp2[i][j + 1] * problemhash{h[i][j]};
	  }
	}

	// because you need to sub 1 from this :((((
	unordered_map<problemhash, int64_t> path_counts;
	for (size_t i = 0; i < n; i++) {
	  for (size_t j = 0; j < m; j++) {
		path_counts[dp1[i][j] * dp2[i][j]]++;
	  }
	}

	modder<int64_t, MOD> out{0};
	for (const int64_t& count : path_counts | views::values) {
	  out += pw2[count] - 1ll;
	}
	cout << out.val << endl;
  }
}`

export default function Round1111() {
	return (
		<WriteupTemplate title="Codeforces Round #1111" tags={[]} href="https://codeforces.com/contest/2247" href_name="Codeforces Round #1111">
			<article className="prose dark:prose-invert mx-auto">
				<p>I did this contest live. I am still not that great at div 2, I only solved by to D easy. Post contest I will try D hard, E and F</p>
				<h2>A</h2>
				<p>
					<ReactKatex>
						Given a list of numbers, you will have some starting sum, call it $s$.
						For each operation, one of two things happens. If one is $-1$, and one is $1$, then the sum is unchanged.
						If both are $-1$, then the sum increases by $4$, and if both are $1$, then the sum decreases by $4$ after the flip.
						Hence, we can think about the problem as moving the sum up and down by $4$ each time, and we want to know if we can reach $0$.
					</ReactKatex>
				</p>
				<p>
					It is important to remember that to move by $4$ or $-4$, we must have a pair of adjacent $-1$ or $1$ respectively.
					Thus, we keep track of how many pairs of these we have to compute whether or not we can get to $0$.
				</p>
				<h2>B</h2>
				<p>
					<ReactKatex>
						{`
							The problem asks us to make a list of numbers (all of which have to be $>1$) such that the smallest subarray sum (which sums to $m$) is of length $k$.
							The list I came up with was a list of $k-1$ $\\lfloor\\frac{m}{k}\\rfloor$'s, and then a single $\\lfloor\\frac{m}{k}\\rfloor + m\\% k$ at the end.
							The rest of the numbers in the list is $1$.
							The sum indeed is correct. Furthermore, since all the numbers are too small, the smallest subarray sum is indeed of length $k$.
						`}
					</ReactKatex>
				</p>
				<h2>C</h2>
				<p>
					There are four cases for each digit: either we start with a 0, and go to either 0 or 1, or we start with a 1 and go to either 0 or 1.
					The interesting cases are 0 to 1 and 1 to 0.
				</p>
				<p>
					<ReactKatex>
						For 1 to 0, as long as you have an odd number of such flips to complete, you can just do it in one move.
						If there is an even number $n$ of such flips to complete, you can complete it in two moves with one move flipping $n-1$ digits and another move flipping $1$.
					</ReactKatex>
				</p>
				<p>
					For 0 to 1, you can piggyback as many as you want as long as there is a 1 to 0 flip happening.
					Suppose there exist no 1 to 0 flips. There is still a way to kill arbitrary amounts of 0 to 1s.
					This can happen as long as you have at least one 0 to 0 and 1 to 1.
				</p>
				<FigC className="block dark:hidden w-full" viewBox="0 0 700.874 141.357" />
				<FigCDark className="hidden dark:block w-full" viewBox="0 0 700.874 141.357" />

				<h2>D Easy</h2>
				<p>
					<ReactKatex>
						The problem asks what is the smallest k such that a list is k-sortable.
						To be k-sortable, a list must be able to be sorted by only swapping indicies $i$, $j$ such that $i\oplus j \le k$.
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						{`
						The first observation is that $k$ must be of form $1<<n$.
						For contradiction suppose that $k=1<<n | m$ with $0<m<(1<<n)$.
						We claim that $k_0=1<<n$ works iff $k$ works.
						Suppose $k$ works. For swap $s=i\\oplus j\\le k_0<k$, clearly both $k_0, k$ can do the job.	
					`}
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
						Consider swap $k_0<s\\le k$. Specifically we know that $s=k_0| m_0$ with $0<m_0<(1<<n)=k_0$.
						Let $i_0 = i\\&\\sim k_0$ and $j_0=j\\&\\sim k_0$. (note this is possible because we assume that the list is $k$-sortable, namely $i\\oplus j=s\\le k$).
					`}</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
						First, we swap $i, i_0$ and $j, j_0$.	
						This is valid since $i\\oplus i_0=i\\& k_0\\le k_0$
						and $j\\oplus j_0=j\\&k_0\\le k_0$.	
					`}</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
						Then we swap $i_0$ and $j_0$.
						This is valid beacuse $i_0\\oplus j_0 = (i\\&\\sim k_0)\\oplus (j\\&\\sim k_0) = (i\\oplus j)\\&\\sim k_0=s\\&\\sim k_0=m_0\\le k_0$.
					`}
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						Then, making swap $i, i_0$ and $j, j_0$ gives the same total effect as swapping $i, j$.
						This move can be visualized using the diagram below.
					</ReactKatex>
				</p>
				<FigD className="block dark:hidden w-full" viewBox="0 0 912.075 220.971" />
				<FigDDark className="hidden dark:block w-full" viewBox="0 0 912.075 220.971" />
				<p>
					<ReactKatex>
						{`Note that in case 1, $s<k_0$ and case 2, $s\\ge k_0$.`}
					</ReactKatex>
				</p>

				<p>
					<ReactKatex>{`
					In general, we can prove that if $\\lfloor\\frac{i}{2k_0}\\rfloor = \\lfloor\\frac{j}{2k_0}\\rfloor=d$, then $i$ and $j$ can be swapped.
					Specifically, let $i=d(2k)+r_i$ and $j=d(2k)+r_j$ with $0\\le r_i, r_j<2k$.

					Let $r_{i,0}=r_i\\%k$ and $r_{j,0}=r_j\\%k$. Let $i_0=d(2k)+r_{i,0}$ and $j_0=d(2k)+r_{j,0}$.
					We claim that the same motion can be done to swap $i,j$, namely swapping $i, i_0$ and $j, j_0$, then swapping $i_0, j_0$, then swapping $i, i_0$ and $j, j_0$.

					Recall that $k=1<<n$, hence $2k=1<<(n+1)$.
					`}</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
						First, we prove that we can swap $i, i_0$ (or $j, j_0$ if you swap all $i$ in proof with $j$, including subscripts).
						$$
						\\begin{aligned}
						i\\oplus i_0
						= (d(2k_0)+r_i) \\oplus (d(2k_0)+r_{i,0})
						\\\\
						= (d<<(n+1)+r_i) \\oplus (d<<(n+1)+r_{i,0})
						\\\\
						= (d<<(n+1)|r_i) \\oplus (d<<(n+1)|r_{i,0})
						\\\\
						= \\sim (d <<(n+1))\\& (r_i \\oplus r_{i,0})\\le r_i \\oplus r_{i,0}
						\\end{aligned}
						$$
						We can observe that this value is either equal to $0$ or $k$, both of which are $\\le k$.
					`}</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
						Next, we prove that we can swap $i_0, j_0$.
						$$
						\\begin{aligned}
						i_0\\oplus j_0 = (d(2k_0)+r_{i,0}) \\oplus (d(2k_0)+r_{j,0})
						\\\\
						= (d<<(n+1)+r_{i,0}) \\oplus (d<<(n+1)+r_{j,0})
						\\\\
						= (d<<(n+1)|r_{i,0}) \\oplus (d<<(n+1)|r_{j,0})
						\\\\
						= \\sim (d <<(n+1))\\& (r_{i,0} \\oplus r_{j,0})\\le r_{i,0} \\oplus r_{j,0}\\le k
						\\end{aligned}
						$$
						as both values are mod $k$.
					`}</ReactKatex>
				</p>
				<p>
					The proof is if and only if, but i'm too lazy to prove the inverse.
					The key is that you would have two seperate ds, which would not cancel out nicely (as above), hence leaving a residual larger than k.
				</p>
				<p>
					<ReactKatex>
						More intuiatively, the result above shows that within each $2k$ block, arbitrary swaps can be conducted.
						However, you can swap outside of your $2k$ block, but only with the same $2k$ block.
						Hence, if each $2k$ block can be sorted, then the entire list can be sorted.
					</ReactKatex>
				</p>
				<p>To find the minimum k, binary search can be employed. This is because k-sortability is monotonic on k.</p>
				<h2>D Hard</h2>
				<p>
					The main idea is aleady exploited in D easy.
					The main challenge is to figure out how to do the queries.
					This problem has the perfect structure for segment tree, in particular due to the nature of the relationship between k and spans of length powers of 2.
				</p>
				<p>
					The transition per level is as follows:
					If the left and right children have (value not index) ranges which are non intersecting and sorted, then the min k between each is used.
					Notice that if through the entire traversal the ranges are non-intersecting and sorted, it means that the entire list is sorted, hence k=0 is appropriate.
					If the ranges are intersecting or unsorted, then we pick k based on the level we are at.
					In particular, we consider the index range spanned by the left and right children, and choose k to be half of that range, namely 2k = length of range.
					This mirrors thte fact that any range of length 2k can be sorted with k-sortability.
				</p>
				<h2>E</h2>
				<p>
					<ReactKatex>{`
						We can determine upper and lower bounds on the value of $k$ for a tree of order $n$.
						The lower bound is given by the "star" tree, where each node is connected to the root.
						This gives a lower bound of $2(n-1)$, as each outside node ($n-1$ of them) introduces $2$ steps.
						The upper bound is given by the "line" tree, where each node is connected to the next.
						In particular the line tree has the odd nodes increasing to the center, then the even ones decreasing from the center.
						This gives an upper bound of $\\frac{n(n-1)}{2} + \\lfloor\\frac{n}{2}\\rfloor$.
					`}</ReactKatex>
				</p>
				<FigE className="block dark:hidden w-full" viewBox="0 0 500.759 187.111" />
				<FigEDark className="hidden dark:block w-full" viewBox="0 0 500.759 187.111" />
				<p>
					<ReactKatex>
						The claim is that for every $k$ that needs to be made above $2(n-1)$ (all the way up to the upper bound), there is some set of mutations on the tree which makes it achievable.
						We notice that any tour of the graph must be of even length, hence $k$ must be even, and the mutations work in steps of 2.
						The constructive is as follows: by moving some node "down" the subtree (even or odd depending on the value of the node), we can increase the value of $k$ by $2$.
					</ReactKatex>
				</p>
				<FigE2 className="block dark:hidden w-full" viewBox="0 0 552.225 158.348" />
				<FigE2Dark className="hidden dark:block w-full" viewBox="0 0 552.225 158.348" />
				<p>
					<ReactKatex>
						We greedily kill as much excess $k$ as possible by moving the lower nodes first, then the higher nodes down the tree.
					</ReactKatex>
				</p>
				<h2>F</h2>
				<p>
					<ReactKatex>
						We say that $u$ and $v$ are in some good $S$ $\iff$the set of paths going through $u$ and $v$ (namely $P_u, P_v$) is the same $P_u=P_v$.
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
					The inverse is very easy. If $P_u=P_v$, then $\\{u, v\\}$ is a good set.
					`}</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						Let $u, v$ be in some good $S$. To show that $P_u=P_v$, we need to show that $p\in P_u \iff p\in P_v$.
						$$p\in P_u \iff u\in p\iff S\subseteq p\iff v\in p\iff p\in P_v$$
						The first equivalence is by definition of $P_u$, the second equivalence is by definition of a good set.
						It is mirrored on the other side.
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
						We can exploit the transitivity of the good set relation to find all good sets.
						In particular, if $u, v$ are in some good set, and $v, w$ are in some good set, then $u, v, w$ can all be in the same good set.
						This is because $P_u=P_v=P_w$.
						Suppose we partition the entire set of nodes into maximal good sets, namely $S_1, S_2, \\ldots, S_k$.
						We claim the solution to the entire problem is
						$$
						\\sum_{i = 1}^{k} 2^{|S_i|}-1\\pmod{998244353}
						$$
						This is because for each maximal good set, we can choose any nonempty subset of it to be a good set.
					`}
					</ReactKatex>
				</p>
				<p>
					Hence, if we have some mechanism to hash the set of all paths which go through a node, we can use that to find all maximal good sets.
					Note that to evaluate the gigantic powers of 2 mod 998244353, we must use a precomputed array.
					As always it is important to remember your mod rules.
				</p>
			</article>
			<div className="container mx-auto">
				<h2 className="font-semibold text-2xl">A</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{A}
				</ShikiHighlighter>
				<h2 className="font-semibold text-2xl mt-2">B</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{B}
				</ShikiHighlighter>
				<h2 className="font-semibold text-2xl mt-2">C</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{C}
				</ShikiHighlighter>
				<h2 className="font-semibold text-2xl mt-2">D</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{D}
				</ShikiHighlighter>
				<h2 className="font-semibold text-2xl mt-2">D2</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{D2}
				</ShikiHighlighter>
				<h2 className="font-semibold text-2xl mt-2">E</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{E}
				</ShikiHighlighter>
				<h2 className="font-semibold text-2xl mt-2">F</h2>
				<ShikiHighlighter language="cpp" theme="one-dark-pro">
					{F}
				</ShikiHighlighter>
			</div>
		</WriteupTemplate>
	)
}