"use client"

import ReactKatex from "@pkasila/react-katex";

export default function MPC() {
	return (
		<main className="mt-20 mb-10">
			<article className="prose dark:prose-invert	mx-auto">
				<h1>An Intuiative Formulation of Model Predictive Controls</h1>
				<p>Feb 3, 2026</p>

				<p>The problem of MPC can be boiled down to the following formulation</p>

				<ReactKatex>
					{`$$\\min_{\\vec u} \\left(\\sum_{t\\in[1,n]}j(\\vec u_t, \\vec x_t) = J(\\mathcal U, \\mathcal X)\\right)\\\\
					\\vec x_{t+1} = f(\\vec x_t, \\vec u_t)\\\\
					\\vec x\\in [\\vec x_{min}, \\vec x_{max}]\\\\
					\\vec u\\in [\\vec u_{min}, \\vec u_{max}]\\\\
					x_0\\text{ given (current sensor values)}
					$$
					`}
				</ReactKatex>

				<p>Where</p>
				<ul>
					<li>x is the state</li>
					<li>u is the action</li>
					<li>J is the cost function</li>
					<li>f is the system dynamics (the model in question), namely given the current state and some action, what is the state at the next timestep</li>
				</ul>

				<p>
					<ReactKatex>
						{`Note that I am currently abusing notation quite significantly. In particular, we imagine $\\mathcal U$ and $\\mathcal X$ to be the joined vectors of actions and states over the entire prediction horizon, i.e.
						$$
						\\mathcal U = \\{\\vec u_1, \\vec u_2, \\ldots, \\vec u_n\\}\\\\
						\\mathcal X = \\{\\vec x_1, \\vec x_2, \\ldots, \\vec x_n\\}
						$$
						`}
					</ReactKatex>
				</p>

				<p>
					As a (not so arbitrary) example, we can imagine x could be the state of a car, u is the torque commands provided by the driver, f is the car dynamics, and J is some cost function that penalizes deviation from a desired trajectory.
				</p>

				<h2>Simplifying the formulation</h2>
				<p>
					<ReactKatex>
						{`We can observe pretty easily that
						$$
						x_1=f(x_0,u_0)\\\\
						x_2=f(x_1,u_1)=f(f(x_0,u_0),u_1)\\\\
						\\vdots
						$$	
						Specifically, we can find that $\\mathcal X$ is entirely determined by $x_0$ and $\\mathcal U$. Thus, we can simplify $\\mathcal X$ to be a function of $x_0$ and $\\mathcal U$, i.e.
						$$
						\\mathcal X_f(x_0, \\mathcal U) = \\{x_0, f(x_0, u_0), \\dots f(f(x_0, u_0), u_1) \\}
						$$
						Then, we can write the cost as
						$$
						\\hat J(\\mathcal U) = J(\\mathcal U, \\mathcal X_f(x_0, \\mathcal U))
						$$
						and thus reduce the problem to an optimization over just $\\mathcal U$.
						`}
					</ReactKatex>
				</p>
			</article>
		</main>
	);
}