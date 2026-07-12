"use client"

import ReactKatex from "@pkasila/react-katex";
import Link from "next/link";

function ExplorationOfInterpolation() {
	return (<>
		<p>
			In this section, we will explore the process of interpolation, and identify some common techniques deployed in interpolation tasks.
		</p>

		<h2>An introduction to interpolation</h2>
		<blockquote>
			Scientific computing is a discipline concerned with the development and study of numerical algorithms for solving mathematical problems that arise in various disciplines in science and engineering.
			<br />
			<span className="italic text-white/40 text-sm">
				- A First Course in Numerical Methods, Chen Greif and U. M. Ascher
			</span>
		</blockquote>

		<p>
			The problem of interpolation is state as: a series of data is given, and we are looking for the underlying function which generates the data.
			For those who have taken high school science, we may recall the process of analysis after experimentation, where the underlying physical laws are derivated from empirical data.
			This process is a precursor of the more general task of interpolation.
			Whereas in class, you may have had to guess simple functions to fit data, such as lines, parabolas, etc., interpolation tasks may require you to fit arbitrary function bases against arbitrarily complex data, many times with hard to guess forms.
		</p>

		<h2>Polynomial Interpolation</h2>
		<img src="https://mathworld.wolfram.com/images/eps-svg/LagrangeInterpolatingPoly_900.svg" alt="" className="mx-auto bg-white w-full mb-0" />
		<div className="text-white/40 text-sm mt-2">Source: <Link href="https://mathworld.wolfram.com/LagrangeInterpolatingPolynomial.html">https://mathworld.wolfram.com/LagrangeInterpolatingPolynomial.html</Link></div>

		<p>
			<ReactKatex>
				{`Pictured above is the method of Legrangian Interpolation. The Lagrange Interpolating Polynomial Provides an algorithm like process for creating these polynomials.
						Suppose we are given data $(x_i, f(x_i))_{i\\in[1,n]}$. Suppose $n=2$, then the interpolant is constructed
						$$
						P(x)=\\frac{x-x_2}{x_1-x_2}f(x_1)+\\frac{x-x_1}{x_2-x_1}f(x_2)
						$$
						We can see that if we plug in $x_1$ to the first and second term, that the coefficient of the first term is 1, and the coefficient of the second term is 0.
						Similarly, plugging in $x_2$ gives a 0 first term and 1 second term coefficient. In general
						$$
						P(x)=\\sum_{i\\in[1,n]}P_i(x)
						\\\\
						P_i(x)=f(x_i)\\prod_{j\\in[1,n]\\setminus i}\\frac{x-x_j}{x_i-x_j}
						$$
						Specifically, we can see that
						$$
						\\prod_{j\\in[1,n]\\setminus i}\\frac{x-x_j}{x_i-x_j}
						$$
						as a function where plugging in anything except $x_i$ returns 0, and plugging in $x_i$ returns 1.
						We can recover the polynomial of form
						$$
						f(x)=\\sum_{i\\in[0,n]}w_ix^i
						$$
						by expanding and combining all the terms of $P(x)$ to find our parameters.
						`}
			</ReactKatex>
		</p>

		<h2>Linear Regression</h2>
		<p>
			In the last example, we were obsessed with finding an exact fit of a polynomial through our data.
			Suppose we had the following data:
		</p>
		{/* TODO graph */}
		<p>
			It is clear that the underlying function we are looking for is not a polynomial, namely it is a line.
			However, there is no exact line which perfectly goes through all of the points.
			This is likely because the data is noisy, and error was introduced when measuring the data.
			In this case, we deploy regression techniques, specifically linear regression.
		</p>
		<p>
			<ReactKatex>
				{` To derive regression, we consider an optimization problem.
						Formally, suppose we are given points $(x_i, y_i)_{i\\in[1,n]}$, and suppose we define the following cost function
						$$
						J(w_1, w_0)=\\sum_{i\\in[1,n]}(f(x_i) - y_i)^2=\\sum_{i\\in[1,n]}((w_1x_i + w_0) - y_i)^2\\\\
						=\\left\\|\\begin{bmatrix}
						x_1&1\\\\
						x_2&1\\\\
						\\dots
						\\end{bmatrix}\\begin{bmatrix}w_1\\\\w_0\\end{bmatrix}-\\begin{bmatrix}y_1\\\\y_2\\\\\\dots\\end{bmatrix}\\right\\|_2\\\\
						J(\\vec w)=\\|X\\vec w - \\vec y\\|_2
						$$
						`}
			</ReactKatex>
		</p>

		<p>
			<ReactKatex>
				As one can expect, the goal of regression is to minimize the cost, namely
				$$\min_&#123;\vec w&#125; J(\vec w)$$
			</ReactKatex>
		</p>

		<p>We can consider applying optimization techniques on J, namely J may be optimized when</p>
		<ReactKatex>
			{`
					$$
					\\nabla J(\\vec w)=0\\\\
					\\nabla \\|X\\vec w - \\vec y\\|_2 = \\nabla(X\\vec w - \\vec y)^T(X\\vec w-\\vec y) = \\nabla (\\vec w^TX^TX\\vec w-2\\vec w^TX^T\\vec y+\\vec y^T\\vec y) = 0\\\\
					2X^TX\\vec w - 2X^T\\vec y = 0\\\\
					X^TX\\vec w = X^T\\vec y
					$$
					`}
		</ReactKatex>
		<p>
			<ReactKatex>
				Above are the so called "normal equations" for linear regression. We see that since $X$, $\vec y$ are known quantities, we can solve for $\vec w$.
				We also know that this solution is the global minimum since $J(\vec w)$ is a convex function (specifically a quadratic form).
			</ReactKatex>
		</p>

		<p>
			<ReactKatex>
				To summarize, if there exists $X$, $\vec w$ such that $f(x)=X\vec w$, then we can find the optimal $\vec w$ which minimizes the squared error between $f(x_i)$ and $y_i$ by solving the normal equations.
			</ReactKatex>
		</p>

		<h2>High Dimensional Linear Regression</h2>
		<p>
			<ReactKatex>
				{`
						Suppose instead of having $f: \\R\\to\\R$, $f$ was a linear function $\\R^n\\to\\R$ (perhaps $f(x,y,z)=w_xx+w_yy+w_zz+w_0$).
						This framework is still capable of handling this, in particular by making
						$$
						X=\\begin{bmatrix}x_1&y_1&z_1&1\\\\
						x_2&y_2&z_2&1\\\\
						&\\vdots
						\\end{bmatrix}, \\vec w=\\begin{bmatrix}w_x\\\\w_y\\\\w_z\\\\w_0\\end{bmatrix}
						$$
						We can verify that $f(\\vec x,\\vec y,\\vec z)=X\\vec w$ still, and the normal equations still find optimal $\\vec w$.
						`}
			</ReactKatex>
		</p>

		<h2>Polynomial Regression</h2>
		<p>
			<ReactKatex>
				{`
						Suppose instead of having linear $f$, $f$ was a polynomial function (perhaps $f(x)=w_3x^3+w_2x^2+w_1x+w_0$).
						This framework is still capable of handling this, in particular by making
						$$
						X=\\begin{bmatrix}x_1^3&x_1^2&x_1&1\\\\
						x_2^3&x_2^2&x_2&1\\\\
						&\\vdots
						\\end{bmatrix}, \\vec w=\\begin{bmatrix}w_3\\\\w_2\\\\w_1\\\\w_0\\end{bmatrix}
						$$
						We can verify that $f(\\vec x)=X\\vec w$ still, and the normal equations still find optimal $\\vec w$.
						`}
			</ReactKatex>
		</p>
		<p>
			<ReactKatex>
				Notice that this is still a linear problem as any polynomial is a linear combination of the function basis composed of powers of $x$.
			</ReactKatex>
		</p>

		<h2>Gereralized Regression and Iterative Descent/Optimization Methods</h2>
		<p>
			To summarize, in generalized regression we must
		</p>
		<ol>
			<li>Perform regression (rather than exact interpolation)</li>
			<li>Handle high dimensional data</li>
			<li>Guess arbitrary function (which cannot be eyeballed due to complexity and afformentioned high dimensionality)</li>
		</ol>

		<p>
			There are a lot of nice prorperties of linear regression which break down very quickly when generalizing.
			Firstly, we no longer are guarenteed a convex cost function, hence we cannot simply set the gradient to 0 to find the global minimum.
			We are also no longer necessarily given nicely weighted linear combinations of functions, hence we cannot simply construct the X matrix as before.
		</p>
	</>
	)
}

export default function AI() {
	return (
		<main className="mt-20">
			<article className="prose dark:prose-invert	mx-auto">
				<h1>[INCOMPLETE] Thoughts on AI</h1>
				<p>[Someday], 2026</p>

				<p>
					One of the main issues with modern AI discourse, specifically with those unfamiliar with the mechanisms of AI, is the mystical thinking surrounding its operation and implementation.
					In this article, I would like to offer my personal mental model of said mechanisms, which I hope will be useful towards the pursuit of understanding AI.
					In particular, my understanding of AI systems is rooted in the language of <b>interpolation</b>.
					Using this description, I hope that we can more precisely discuss the powers, potential applications and limitations of AI systems.
				</p>

				<h2>The fundemental problem formulation</h2>
				<p>
					I consider the fundemental problem of AI to be formulated as follows:
					For any underlying task that an AI can be designed to work on, it can be modelled functionally.
					Specifically, we can analyze any task as some numerical input output system.
					For example
				</p>
				<ul>
					<li>Image Classification: input image (matrix of pixel intensities), output class</li>
					<li>Text Based Generative AI: input prompt text (tokenized to numbers), output response text, or perhaps input previous text in window, output next text in window (depending on the architecture)</li>
					<li>Reinforcement Learning: input state (vector of features), output action</li>
					<li>...etc...</li>
				</ul>
				<p>
					The fundemental problem, hence, is to find the underlying function which describe the optimal mapping from inputs to outputs.
					In particular, the information by which gives the machine learning algorithm correctness is data, rather than some logical insight from the programmer (as in classical computing).
					I think this formulation is particularly useful because it provides insight into a few key aspects of AI systems, for example
				</p>

				<ul>
					<li>What does training mean, and why does it need so much data?</li>
					<li>What are model weights and why are they critical to the operation of the model? Why are weights not transferrable?</li>
					<li>Intuiatively, why is AI such a computationally intensive process, both in training and inference?</li>
					<li>What is the upper bound of performance from machine learning based algorithms?</li>
				</ul>

				<p>These themes will be central to the exploration in the following sections.</p>

				<h2>Solving the Fundemental Problem</h2>
				<p>
					Generally, to design an AI system/architecture, the designer (possibly impliclty) simply makes a guess at the parameterized function governing the process.
				</p>

				<p>
					For example, I can look at the below data, (ignore the line, just look at the dots)
				</p>
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQusMqpXVfbclyBKlRMzia5lMZc5TYgK4x-NA&s" alt="" className="mx-auto" />
				<p>
					<ReactKatex>{`
						A good guess would be that the underlying function (represented by the line in the above image) to fit this data may be
						$$
						f_{\\vec w}(x)=w_4x^4+w_3x^3+w_2x^2+w_1x+w_0
						$$
						where $\\vec w=\\{w_i\\}_{i\\in[0,4]}$ are unknown parameters.
						In AI terminology, we must "train" the AI to find the "parameters", or "weights", of the model.
					`}
					</ReactKatex>
				</p>

				<p>To train the AI model, we must solve an optimization problem to find the best parameters. In partiuclar, we solve</p>
				<ReactKatex>{`
					$$\\min_{\\vec w}e(f_{\\vec w}(\\vec x), \\vec y)$$
					where $\\vec x, \\vec y$ is the labelled data inputs/outputs respectively, and $\\vec w$ are the parameters of the function $f$, and $e$ is some error metric (for example, mean squared error).
					The error metric is very important as it dictates not only what is considered "the function matching the data's outputs", but also how easy the optimization problem is to solve (outside of scope of this article).
				`}
				</ReactKatex>

				<p>
					An obvious observation is that not all parameterized functions will work.
					In the example above, a linear function would not be able to fit the data, and hence would not be a good guess.
					We can mathematically describe what it means for a parameterized function to be a "good guess" for a certain set of data:
					if the function can <b>arbitrarily</b> fit the data, then it is a good guess, in particular
				</p>
				<ReactKatex>{`
				$$\\forall\\epsilon,\\exists\\vec w, \\text{such that } e(f_{\\vec w}(\\vec x), \\vec y) < \\epsilon$$
				Since error functions are generally defined to be non-negative, this guarentees that $f_{\\vec w}$ can be made to fit the data arbitrarily well.
				`}</ReactKatex>

				<p>
					We can extend on this idea by considering if a parameterized function can fit any data, namely
				</p>
				<ReactKatex>{`
				$$\\forall\\vec x, \\vec y, \\forall\\epsilon,\\exists\\vec w, \\text{such that } e(f_{\\vec w}(\\vec x), \\vec y) < \\epsilon$$
				`}</ReactKatex>

				<p>
					By conducting this extension, we can see that the parameterized function is not only a good guess for a specific set of data, but also a good guess for any data.
					This process is important because it is not necessarily possible to be able to visualize and guess a more efficient (with respect to number of model weights, hence complexity of function) function.
				</p>

				<h2>AI in the context of existing computational models and algorithms</h2>
				<p>
					One of the most, I believe, important questions I have had to ask regarding AI systems is the following: What differentiates a "AI" computation from other types of computations?
					In particular, as someone who has spent some time developing "classical" algorithms, I believe that these algorithms are also artificial systems which demonstrate intelligence (AI?).
					Something to note is that it is possible to develop AI systems which solve these "classical problems".
					However, instead of having the specifying the developer specify the computational operations comprising the algorithm, the AI system learns the function through examples, and attempts to fit to it.
				</p>
				<p>
					This, however, is clearly an absurd construction. It is obvious that nobody is seeking to develop AI to solve problems solvable with classical algorithms in the vast majority of cases.
					This is because of the computational resources required to run AI systems.
					Just as classical algorithms can act as a way of more compactly representing the same computation conducted by AI systems, AIs can be seen as a compact representation of the KNN inference machine.
				</p>
				<p>
					Ultimatetly, I argue that machine learning can offer perfect performance, given infinite compute and data and perfect perception.
					In particular, this implementation would not even need to be particularly clever: by looking up your state obtained from your perfect perception in your infinite dataset, an example can be found which will offer the correct solution.
					This mirrors a principle in classical computation, where if you have a verifier for a given problem (namely given an input and solution it tells you if the solution is correct or not), it is possible to brute force all permutations of outputs and verify.
					Hence, I consider the nontriviality of developing machine learning algorithms to be in the same vein as developing classical algorithms: how do you find the correct answer with not only limitations in computational resources, but also in data and perception.
				</p>

				<h2>The Fundemental Bottleneck: Computation Resources</h2>
				<p>
					The theme of compactness or compression as being equivalent to intelligence is not a new idea.
				</p>

				<h2>Extrapolation and Human Level Intelligence</h2>
				<p>
					I believe that in order for an AI system to achieve human level intelligence, it must be able to extrapolate, which I claim is the same process as what people commonly describe as "creativity".
				</p>

				<h2>How does human intelligence achieve extrapolation?</h2>
				<p>random bullshit in brain theory</p>

				<h2>Trivializing AI research</h2>
				<p>
					The reason I wrote this article is because I believe that .
					However, in the pursuit of simplifying AI to be understandable, I hope not to leave an impression of trivialization upon this field of research.
					Firstly, even if superhuman, or even human level performance is not achievable by AI systems, it is still extremely non-trivial to develop computation systems made possible through AI.
					There are still significant uses for systems whose behaviours are not represented through computer operations but rather through the learned patterns and representations (in interpolation tasks).
					I am personally of the belief that superhuman AI performance is possible: in particular if hardware is developed unconstrained by the limitations of human biology, it is entirely possible to support the sufficient computation required for super human level intelligence.
				</p>
				<p></p>
			</article>
		</main>
	);
}