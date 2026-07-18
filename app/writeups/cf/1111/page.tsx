'use client'
import WriteupTemplate from "../../WriteupTemplate";
import ReactKatex from "@pkasila/react-katex";
import FigC from "./1111c.svg"
import FigCDark from "./1111c_dark.svg"
import FigD from "./1111d.svg"
import FigDDark from "./1111d_dark.svg"
import ShikiHighlighter from "react-shiki";

const A = String.raw``
const B = String.raw``
const C = String.raw``
const D = String.raw``
const E = String.raw``
const F = String.raw``

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
						i\\oplus i_0
						= (d(2k_0)+r_i) \\oplus (d(2k_0)+r_{i,0})
						\\\\
						= (d<<(n+1)+r_i) \\oplus (d<<(n+1)+r_{i,0})
						\\\\
						= (d<<(n+1)|r_i) \\oplus (d<<(n+1)|r_{i,0})
						\\\\
						= \\sim (d <<(n+1))\\& (r_i \\oplus r_{i,0})\\le r_i \\oplus r_{i,0}
						$$
						We can observe that this value is either equal to $0$ or $k$, both of which are $\\le k$.
					`}</ReactKatex>
				</p>
				<p>
					<ReactKatex>{`
						Next, we prove that we can swap $i_0, j_0$.
						$$
						i_0\\oplus j_0 = (d(2k_0)+r_{i,0}) \\oplus (d(2k_0)+r_{j,0})
						\\\\
						= (d<<(n+1)+r_{i,0}) \\oplus (d<<(n+1)+r_{j,0})
						\\\\
						= (d<<(n+1)|r_{i,0}) \\oplus (d<<(n+1)|r_{j,0})
						\\\\
						= \\sim (d <<(n+1))\\& (r_{i,0} \\oplus r_{j,0})\\le r_{i,0} \\oplus r_{j,0}\\le k
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
					</ReactKatex>
				</p>
				<p>To find the minimum k, binary search can be employed. This is because k-sortability is monotonic on k.</p>
				<h2>D Hard</h2>
				<h2>E</h2>
				<h2>F</h2>
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