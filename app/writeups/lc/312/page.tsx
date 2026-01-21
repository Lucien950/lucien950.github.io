"use client";
import ReactKatex from "@pkasila/react-katex";
import ShikiHighlighter from "react-shiki";
import LinkIcon from "~/components/LinkIcon";


const SOLN = String.raw`class Solution:
	def maxCoins(self, nums: List[int]) -> int:
		n = len(nums)
		def nums_at(i: int) -> int:
			if 0 <= i < n: return nums[i]
			return 1
		
		dp = [[0 for _ in range(n)] for _ in range(n)]

		# fill trivial cases
		for i in range(n):
			dp[i][i] = nums_at(i-1) * nums_at(i) * nums_at(i+1)
		
		# traverse dp
		for x in range(1, n): # namely x in [1, n)
			for y in range(n-x): # namely y in [0, n-x)
				i,j = y, x+y
				dp[i][j] = max([
					(dp[i][k-1] if k-1 >= i else 0) + nums_at(i-1)*nums_at(k)*nums_at(j+1) + (dp[k+1][j] if k+1 <= j else 0)
					for k in range(i, j + 1)
				])
		return dp[0][n-1]`;

export default function LC312() {
	return (
		<div>
			<div
				className="w-full mb-14"
				style={{ background: "linear-gradient(115deg,#3c7161 7%, #243e38 40%, rgba(28, 28, 30, 1) 66%)" }}
			>
				<div className="max-w-[65ch] mx-auto pt-14 pb-8">
					<h1 className="font-medium text-6xl mb-6">Burst Balloons</h1>
					<div className="flex flex-row items-center gap-x-4">
						<LinkIcon href="https://leetcode.com/problems/burst-balloons/" name="LeetCode 312" />
						<span className="inline-block rounded-full px-3 py-2 bg-white/20 text-sm border border-white">DP</span>
					</div>
				</div>
			</div>
			<article className="prose dark:prose-invert mx-auto">

				<p>
					<ReactKatex>
						Initially, I considered the problem in the forward direction.
						In particular, I considered if you popped an arbitrary balloon $i$, you now have two subproblems,
						namely the subproblem from $[1,i-1]$ and $[i+1, n]$ gives the solution to $x_i$.
					</ReactKatex>
				</p>
				<img src="/writeups/312_first_approach.png" alt="" />
				<p>
					This approach fails as the subproblems are not independent.
					For example while solving the [1,1] subproblem, we don&apos;t know how many balloons remain in the [3,5] subproblem.
					This is a problem as depending on which balloons are popped in the [3,5] subproblem, the score achieved by popping the single balloon in the [1,1] subproblem is different.
				</p>
				<p>
					Generally when this happens, we should consider solving the problem backwards.
					The mental image in my head is trying to put a thread into a needle, vs pulling the thread out of the needle.
					In this case, we start the problem by going to the end of the problem, where all the balloons are popped.

					We then consider unpopping, or reviving each balloon.
					Instead of reversing the score, we still add to the score as each balloon is revived.
				</p>
				<img src="/writeups/312_second_approach.png" alt="" />
				<p>
					<ReactKatex>
						Notice how now, the [1,1] subproblem and the [3,5] subproblem are truely independent, as we know that balloon 2 exists.
						This way, when we revive the 1 balloon, we know that the score must be $1 * n_0 * n_1$ (switched to 0 indexing again 🙂),
						regardless of what happens in the [3,5] subproblem.
					</ReactKatex>
				</p>

				<h2>Implementation Details</h2>
				<p>
					<ReactKatex>
						We let $dp[i][j]$ to be the solution to the subproblem given all balloons $[0,i-1]$ and $[j+1,n)$ (namely $[0,n) \setminus [i,j]$) are already revived.
						In particular, we actually don&apos;t care if all of $[0,i-1)$ and $(j+1,n)$ are revived, as long as $i-1$ and $j+1$ are revived,
						the score only depends on the immediate neighbors of the range being revived.
					</ReactKatex>&nbsp;
					I only force <b>ALL</b> the balloons to be revived because it is easier to think about the problem this way.
					I mention this because it is important to realize that we aren&apos;t only considering subproblems with contiguous outside ranges,
					and that&apos;s where most of the sparse cases are hiding.
				</p>
				<p>
					<ReactKatex>
						I wrote a helper function nums_at(i) to return the score of the balloon at index $i$, or $1$ if $i$ is out of bounds.
						This makes it less annoying to write the code as otherwise I would need to put ternary conditions everywhere. Note that $n_i=nums\_at(i)$.
					</ReactKatex>
				</p>
				<p>
					<ReactKatex>
						The trivial DP cases are $dp[i][i]$, where only one balloon needs to be revived.
						In this case, you revive the balloon and the score is the product of its score and its immediate neighbours&apos; score.
						This corresponds to the code on lines 11, 12.
					</ReactKatex>
				</p>
				<p>
					The DP transition is
					<ReactKatex>
						{`$$dp[i][j] = \\max_{k \\in [i,j]} \\left( dp[i][k-1] + n_{i-1}n_kn_{j+1} + dp[k+1][j] \\right)$$`}
					</ReactKatex>
					<ReactKatex>
						Namely, we visualize this as reviving the balloon at $k$, and solving the two independent subproblems, namely $[i,k-1]$ and $[k+1,j]$.
						This corresponds to lines 18 to 21 in the code.
					</ReactKatex>
				</p>
				<img src="/writeups/312_trans.png" alt="" />
				<p>
					Finally, we consider how to traverse the DP table. From the structure of the transitions are visualized below.
				</p>
				<img src="/writeups/312_dp_fill.png" alt="" />
				<p>
					In particular, it is clear that we should fill from the diagonal up to the top right corner. In particular, we consider the following parameterization:
				</p>
				<img src="/writeups/312_param.png" alt="" />
				<p>
					<ReactKatex>
						{
							`Namely, we have first iterate from $x\in [1, n)$, then iterate $y\in [0, n-x)$ and choose $(i,j)=(y,x+y)$.
							For those confortable with linear algebra,
							$$
								\\begin{bmatrix}
								i\\\\j
								\\end{bmatrix} = \\begin{bmatrix}
								0 & 1\\\\
								1 & 1
								\\end{bmatrix} \\begin{bmatrix}
								x\\\\y
								\\end{bmatrix}
							$$
							Namely, we construct a basis of vectors $\\vec x_1=(0, 1)$ and $\\vec x_2=(1, 1)$.
							The implementation follows this logic.`
						}
					</ReactKatex>
				</p>
			</article>
			<ShikiHighlighter language="python" theme="one-dark-pro" showLineNumbers startingLineNumber={1} className="mx-auto mt-6 container">
				{SOLN}
			</ShikiHighlighter>
		</div>
	);
}