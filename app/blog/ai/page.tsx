"use client"

import ReactKatex from "@pkasila/react-katex";
import Link from "next/link";

export default function AI() {
	return (
		<main className="mt-20">
			<article className="prose dark:prose-invert	mx-auto">
				<h1>[INCOMPLETE] Thoughts on AI</h1>
				<p>[Someday], 2026</p>

				<p>
					One of the main issues with modern AI discourse, specifically with those unfamiliar with the mechanisms of AI,
					is the mystical thinking surrounding its implementation. In this article, I would like to give a generalized description of said mechanisms,
					specifically in the language of interpolation. Using this description, I hope that we can more precisely discuss the powers, potential applications
					and limitations of AI systems.
				</p>

				<h2>The fundemental problem of AI</h2>
				<p>
					I consider the fundemental problem of AI to be formulated as follows:
					For any underlying task that an AI can be designed to work on, it can be modelled functionally.
					Specifically, we can analyze any task as some input output map.
					For example
				</p>
				<ul>
					<li>Image Classification: input image, output class</li>
					<li>Text Based Generative AI: input prompt text, output repsonse text, or perhaps input previous text in window, output next text in window (depending on the architecture)</li>
					<li></li>
				</ul>
				<p>The fundemental problem, henceforth, is to find the underlying function describing the process</p>

				<h2>Solving the Fundemental Problem</h2>
				<p>
					Generally, to design an AI system/architecture, the designer makes a guess at the parameterized function governing the process. For example, I can look at the below data,
				</p>
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQusMqpXVfbclyBKlRMzia5lMZc5TYgK4x-NA&s" alt="" className="mx-auto" />
				<p>
					<ReactKatex>
						and perhaps, I will guess that the underlying function to predict this data may be
						$$
						f(x)=w_4x^4+w_3x^3+w_2x^2+w_1x+w_0
						$$
						where $\&#123;w_i\&#125;_&#123;i\in[0,4]&#125;$ are unknown parameters.
						In AI terminology, we must "train" the AI to find the "parameters", or "weights", of the model.
					</ReactKatex>
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

				<p>
					In this section, we will explore the process of interpolation, and identify some common techniques deployed in interpolation tasks.
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

				<h2>Extrapolation</h2>
				<p>

				</p>
			</article>
		</main>
	);
}