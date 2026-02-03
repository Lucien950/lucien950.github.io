"use client";

import ShikiHighlighter from "react-shiki";
import WriteupTemplate from "../../WriteupTemplate";
import ReactKatex from "@pkasila/react-katex";

const SOLN = `MOD = int(1e9+7)

class Solution:
    def numOfWays(self, n: int) -> int:
        # adj[i] gives all tings you can go from i
        adj: list[list[int]] = [
            [4, 5, 7, 8, 9],
            [4, 6, 7, 8],
            [4, 5, 8, 9, 11],
            [5, 9, 10, 11],
            [0, 1, 2, 10, 11],
            [0, 2, 3, 10],
            [1, 8, 9, 11],
            [0, 1, 9, 10, 11],
            [0, 1, 2, 6],
            [0, 2, 3, 6, 7],
            [3, 4, 5, 7],
            [2, 3, 4, 6, 7],
        ]

        dp = [1 for _ in range(12)]

        for i in range(n-1):
            next_dp = [0 for _ in range(12)]
            for pre in range(12):
                for post in adj[pre]:
                    next_dp[post] = (next_dp[post] + dp[pre]) % MOD
            dp = next_dp
        return sum(dp) % MOD`;

export default function page() {
	return (
		<WriteupTemplate title="Number of Ways to Paint N x 3 Grid" tags={["DP"]} href="https://leetcode.com/problems/number-of-ways-to-paint-n-3-grid/description/" href_name="LeetCode 1411">
			<article className="prose dark:prose-invert mx-auto">
				<p>
					This problem can be modelled as a graph traversal problem.
					Each of the 12 valid colorings of a single row can be represented as a node in a graph.
					There exists a directed edge from node A to node B if coloring B can be placed on top of coloring A.
					Specifically, the states are numbered in the order they were provided in the example.
					I then wrote a script to generate the adjacency list. (omitted)
				</p>
				<p>
					<ReactKatex>
						We can then use dynamic programming to count the number of ways to reach each node after n steps.
						In particular, $dp[i][j]$ represents the number of ways to reach node $j$ after $i$ steps.
						We can then transition from $dp[i][j]$ to $dp[i+1][k]$ for each neighbor $k$ of $j$.
						The base case is $dp[0][j] = 1$ for all $j$, as there is one way to start at each node.
						In the code below, an optimization is made to only store the previous row of the dp table, as only that is needed to compute the next row.
					</ReactKatex>
				</p>
			</article>
			<ShikiHighlighter language="python" theme="one-dark-pro" showLineNumbers startingLineNumber={1} className="mx-auto mt-6 container">
				{SOLN}
			</ShikiHighlighter>
		</WriteupTemplate>
	);
}