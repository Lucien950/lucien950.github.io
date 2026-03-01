"use client";
import ReactKatex from "@pkasila/react-katex";
import WriteupTemplate from "../../WriteupTemplate";
import ShikiHighlighter from "react-shiki";

const A = String.raw`int main() {
  int t;
  cin >> t;
  while (t--) {
	int n, m, d;
	cin >> n >> m >> d;
	const int tower_height = d / m + 1;
	cout << ceildiv(n, tower_height) << endl;
  }
}`

const B = String.raw`int main() {
  int t;
  cin >> t;
  while (t--) {
	string x;
	cin >> x;
	array<int, 10> freq{};
	int fx = 0;
	for (size_t i = 0; i < x.size(); i++) {
	  const int v = x[i] - '0';
	  freq[v - (i == 0)] += 1;
	  fx += v;
	}

	int out = 0;
	while (fx >= 10) {
	  for (int i = 9; i >= 0; i--) {
		if (freq[i] > 0) {
		  fx -= i;
		  freq[i] -= 1;
		  out += 1;
		  break;
		}
	  }
	}
	cout << out << "\n";
  }
  cout << flush;
}`

const C = String.raw`bool solvable_with(const bitset<64> s_bits, const bitset<64> m_bits, const uint64_t n) {
  array<uint64_t, 64> freq{};
  freq.fill(n);
  int at = 63;
  for (int i = 63; i >= 0; --i) { // bits from the right
	if (not s_bits.test(i))
	  continue;
	// we need to kill a bit at the ith position
	uint64_t left = 1ull << static_cast<uint64_t>(i);
	while (left > 0 and at >= 0) {
	  const uint64_t at_val = 1ull << at;
	  if (at_val > left or freq[at] == 0 or not m_bits.test(at)) {
		at -= 1;
		continue;
	  }
	  const uint64_t have = min(freq[at], left / at_val);
	  freq[at] -= have;
	  left -= have * at_val;
	}
	if (left > 0 or at < 0)
	  return false;
  }
  return true;
}

int main() {
  int t;
  cin >> t;
  while (t--) {
	uint64_t s, m;
	cin >> s >> m;

	// actually i don't think this is necessary?
	if ((s & -s) < (m & -m)) { // unkillable bit
	  cout << -1 << endl;
	  continue;
	}

	uint64_t l = 1, r = s;
	const bitset<64> s_bits(s), m_bits(m);
	while (l < r) {
	  if (const uint64_t mid = l + (r - l) / 2; solvable_with(s_bits, m_bits, mid)) {
		r = mid;
	  } else {
		l = mid + 1;
	  }
	}

	cout << l << '\n';
  }
  cout << flush;
}`

const D = String.raw`static array<int, 1000000> a_buf{}, b_buf{};

bool solve(const span<int> a, const span<int> b) {
  static array<int, 2000001> sieve{};

  const int max_b = *ranges::max_element(b);
  fill_n(sieve.begin(), max_b + 1, 0); // largest query into sieve is max_b

  const set a_set(a.begin(), a.end());
  const int unique_as = static_cast<int>(a_set.size());

  for (const int aa : a_set) {
	for (int j = aa; j <= max_b; j += aa) {
	  sieve[j] += 1;
	}
  }
  // Single pass over b instead of three separate accumulates
  size_t x_1 = 0, x_3 = 0;
  for (const int bb : b) {
	const int s = sieve[bb];
	x_1 += s == 0;
	x_3 += s == unique_as;
  }

  if (x_3 != x_1) {
	return x_3 > x_1;
  }
  // otherwise, check edge
  const size_t x_2 = b.size() - x_1 - x_3;
  return x_2 % 2 == 1; // alice wins if x_2 is odd
}

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(nullptr);

  int t;
  cin >> t;
  while (t--) {
	size_t n, m;
	cin >> n >> m;

	for (size_t i = 0; i < n; i++) {
	  cin >> a_buf[i];
	}
	for (size_t i = 0; i < m; i++) {
	  cin >> b_buf[i];
	}
	cout << (solve({a_buf.data(), n}, {b_buf.data(), m}) ? "Alice" : "Bob") << '\n';
  }
}`

export default function Edu187() {
	return (
		<WriteupTemplate title="Codeforces Educational #187" tags={[]} href="https://codeforces.com/contest/2203" href_name="Codeforces Educational #187">
			<article className="prose dark:prose-invert mx-auto">
				<h1>A</h1>
				<p>
					The question asks how to stack towers such that each block carries on top of it blocks with sum of at most the durability of that block.
					In particular, the blocks all have the same weight and durability.
					Hence, the limiting factor for how many blocks can be stacked is the bottom block, namely it can carry
					<ReactKatex>
						$$\lfloor d/m\rfloor$$
					</ReactKatex>
					blocks for a maximum of
					<ReactKatex>
						$$\lfloor d/m\rfloor+1$$
					</ReactKatex>
					blocks per tower. Ceil-Divide the total number of blocks by that and get the minimum number of towers required.
				</p>

				<h1>B</h1>
				<p>
					<ReactKatex>
						{`
						A number is beautiful iff $F(F(x))=F(x)$ where $F(x)$ is the sum of digits of $x$.
						In particular, we claim that $F(x)=x\\iff x\\in[0,9]$.
						The reverse direction is trivial.
						For the forward direction, consider the contrapositive, namely $x\\not\\in[0,9]\\implies F(x)\\ne x$.
						Specifically, consider arbitrary $x=x_nx_{n-1}\\dotsx_0$ with $x_n\\ne 0$ and $n\\ge 1$.
						We claim that
						$$\\sum_{i=0}^n x_i\\ne x=\\sum_{i=0}^n10^ix_i$$
						This is because this requires $x_i(10^i-1)=0$ for all $i$, which is impossible since $x_n\\ne 0$ and $10^n-1\\ne 0$.
						`}
					</ReactKatex>
				</p>
				<p>
					<ReactKatex> Hence from above, we know $x$ is beautiful $\iff F(x)\in[0,9]$.</ReactKatex>
				</p>
				<p>
					To reduce the sum of the digits to under 9, we greedily reduce the sum of the digits by removing the largest ones first.
					We remove the digits until there are no more left.
				</p>
				<p>
					Remember the edge case that the leading digit cannot be less than 1.
					Hence, we register the leading digit as one less in the frequency table, namely treating it as if we could remove n-1 from the sum.
				</p>
				<h1>C</h1>
				<p>
					<ReactKatex>
						We can solve this problem with binary search.
						Namely, we can find $n$ as whether a sequence of $a_i$ of length $n$ can meet the conditions is monotonic.
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						{`
						Consider a particular $n$. We will try to kill all of the bits of $s$ seperatly.
						In particular, for a given set bit of $s$, namely $s_i$ (set bit at position $i$), we find some $m_j$ such that $i\\ge j\\ge 0$.
						Namely, we need $2^{j-i}$ copies of $m_j$.
						In the beginning, we say there are $n$ copies of $m_j$ to use for each $j$ (in particular each $a_i$ can have up to all $m_j$ bits set).
						We subtract as described above, and if and only if there is always enough $m_j$s to subtract then there is a solution.
						`}
					</ReactKatex>
				</p>
				<h1>D</h1>
				<p>
					<ReactKatex>
						We solve this problem with an approach similar to a prime number sieve.
						We keep $sieve[i]$ such that $sieve[i]$ gives the number of unique elements of $a$ which divide $i$.
						This can be constructed by iterating through all elements of $a$ (namely $a_i$), then incrementing $sieve[a_i], sieve[2a_i], \dots$.
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						We can consider three types of elements, elements which are divisible by all $a$, elements which are divisible by some $a$, and all of the elements.
						We let $x_3$ be the elements in the first set, $x_2$ be the elements in the second set but not in the first set (divisible by some $a$ but not all $a$), and $x_1$ which are the rest (namely divisible by no $a$).

						Alice can kill a number if there is some element of $a$ which divides it.
						Namely, Alice can kill the elements in $x_2,x_3$.
						Bob can kill a number if NOT all elements of $a$ can divide it.
						Namely, Bob can kill the elements in $x_1,x_2$.
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						Suppose there were only elements in $x_2$. We claim that the first grabber wins $\iff |x_2|\equiv1\pmod 2$.
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						If $|x_3|=|x_1|$, then the winner of $x_2$ grabbing (described above) can force a win by forcing a win condition on $x_2$, and copying the opponent on $x_1,x_3$.

						If $|x_3|&gt;|x_1|$ or $|x_3|&lt;|x_1|$, then the greater of $x_3$ and $x_1$ can force a win by using their extra number to force the other player to be the disadvantaged grabber in $x_2$.
					</ReactKatex>
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
			</div>
		</WriteupTemplate>
	);
}