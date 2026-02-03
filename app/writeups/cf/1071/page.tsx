"use client";

import ReactKatex from "@pkasila/react-katex";
import WriteupTemplate from "../../WriteupTemplate";
import ShikiHighlighter from "react-shiki";

const B = String.raw`constexpr size_t MAX_N = 2e5;
static array<int, MAX_N> a;

int main() {
  int t;
  cin >> t;
  while (t--) {
	size_t n;
	cin >> n;
	for (size_t i = 0; i < n; ++i) cin >> a[i];

	int64_t sum = 0;
	for (size_t i = 0; i < n - 1; ++i) sum += abs(a[i + 1] - a[i]); 

	int64_t max_d = max(abs(a[1] - a[0]), abs(a[n - 1] - a[n - 2]));
	for (size_t i = 1; i < n - 1; ++i) {
	  const int64_t new_points = abs(a[i + 1] - a[i - 1]);
	  const int64_t old_points = abs(a[i + 1] - a[i]) + abs(a[i] - a[i - 1]);
	  max_d = max(max_d, old_points - new_points);
	}
	cout << sum - max_d << endl;
  }
}`

const C = String.raw`int main() {
  int t;
  cin >> t;
  while (t--) {
	size_t n;
	cin >> n;
	for (size_t i = 0; i < n; i++) cin >> a[i];
	sort(a.begin(), next(a.begin(), n));
	cout << max(a[0], a[1] - a[0]) << endl;
  }
}`

const D = String.raw`int main() {
  int t;
  cin >> t;
  while (t--) {
	int32_t n;
	cin >> n;
	for (int32_t i = 0; i <= n; i++) {
	  const uint64_t base = (1ull << (n-i)) - 1; // namely n-i 1s in a row
	  for (uint64_t j = 0; j < 1ull << max(i-1, 0); j++)
		cout << (base | j << (n - i + 1)) << " ";
	}
	cout << "\n";
  }
  cout << flush;
}`

export default function Round1071() {
	return (
		<WriteupTemplate title="Codeforces Round #1071" tags={[]} href="https://codeforces.com/contest/2179" href_name="Codeforces Round #1071">
			<article className="prose dark:prose-invert mx-auto">
				<h2>Problem A</h2>
				<p>
					The problem reduces to finding the longest string such that
				</p>
				<ol>
					<li><ReactKatex>there are only $k$ characters in the string</ReactKatex></li>
					<li><ReactKatex>every $x$ characters are different</ReactKatex></li>
				</ol>
				<p>
					<ReactKatex>
						The answer is $$kx+1$$
					</ReactKatex>
				</p>
				<h2>Problem B</h2>
				<p>
					Suppose that you don't skip any floors. The distance you need to travel is
					<ReactKatex>
						{`$$S = \\sum_{i = 1}^{n} |a_i - a_{i-1}|$$`}
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						To figure out which floor to skip, we consider skipping each floor in the sequence, in particular to skip floor $i$, the points is augmented by
						$$|a_&#123;i + 1&#125; - a_i| + |a_i - a_&#123;i - 1&#125;| - |a_&#123;i + 1 &#125; - a_&#123;i - 1&#125;|$$
					</ReactKatex>
				</p>
				<img src="/writeups/1071_b.png" alt="" className="mx-auto" />
				<p>
					<ReactKatex>
						Note that this works for all $i$ in $[1, n-1]$. For the edge cases where $i = 0$ or $i = n$,
						the augmented points are simply $|a_1 - a_0|$ and $|a_n - a_&#123;n - 1&#125;|$ respectively.
						Note that it is only important to store the best net difference because we can apply the difference at the end.
					</ReactKatex>
				</p>
				<h2>Problem C</h2>
				<p>
					Two observations help simplify the problem:
				</p>
				<ol>
					<li> <ReactKatex> We can immediately lower bound $k$ by $\min_ia_i$ as choosing $k_0=\min_i a_i$ is possible if we choose $x_i=a_i$, namely $a_i\%a_i=0$</ReactKatex> </li>
					<li> <ReactKatex> $\forall x, m$, $x&lt;m \implies x\pmod m\equiv x$.  </ReactKatex> </li>
				</ol>
				<p>
					<ReactKatex>
						Suppose we choose some $k\gt k_0$. Let $a_j=\min_i a_i$. Then $a_j \% x_j = a_j$ as
						$$x_j \ge k \gt k_0 = a_j$$
						Namely, we see that it must be true then that
						$$a_i\equiv a_j\pmod&#123;x_i&#125;\iff k\le x_i\big|a_i-a_j$$
						Note that the biggest $x_i$ which divides $|a_i-a_j|$ is $|a_i-a_j|$ itself. Hence, it is clear that
						$$k=\min_i x_i=\min_i |a_i-a_j|$$
						Without loss of generality, let us sort $a$. Namely, this makes $j=0$. The closest number to $a_0$ is $a_1$. Hence,
						$$k=\min_i |a_i-a_0|=a_1-a_0$$
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						Hence, the final answer must be the best of the two strategies, namely
						$$
						k=\max(a_0, a_1 - a_0)
						$$
					</ReactKatex>
				</p>

				<h2>Problem D</h2>
				<p>
					Problem D is a typical bitwise manipulation question.
					The order of the numbers we want to generate looks as follow:
				</p>

				<div className="text-center font-bold text-2xl font-mono">
					(i=0) <br />
					1111111...<br />
					<div className="border border-white/20 w-full" />
					(i=1) <br />
					<span className="text-green-300">0</span>111111...<br />
					<div className="border border-white/20 w-full" />
					(i=2) <br />
					<span className="text-green-300">00</span>11111...<br />
					<span className="text-green-300">10</span>11111...<br />
					<div className="border border-white/20 w-full" />
					(i=3) <br />
					<span className="text-green-300"><span className="underline">00</span>0</span>1111...<br />
					<span className="text-green-300"><span className="underline">01</span>0</span>1111...<br />
					<span className="text-green-300"><span className="underline">10</span>0</span>1111...<br />
					<span className="text-green-300"><span className="underline">11</span>0</span>1111...<br />
					...
				</div>

				<p>
					This solution minimizes the number of bit positions whereby there exists a 0 in any row, while preserving a lexographical sorting.
					We systematically sacrifice the leftmost bits, and iterate thorugh all the permutations which require the sacrifice but have not appeared.
				</p>

				<p>
					<ReactKatex>
						Notice that the rightmost $n-i$ bits are always 1s, the $i$th bit is a 0, and the leftmost $i-1$ bits iterate through the ordered sequence $[0,(1&lt;&lt;(i-1)) - 1)$ (see underlined).
						Hence, in the solution, we generate $n-i$ 1s, and then shift $i$ into position.
					</ReactKatex>
				</p>
			</article>

			<div className="container mx-auto">
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
			</div>
		</WriteupTemplate>
	);
}