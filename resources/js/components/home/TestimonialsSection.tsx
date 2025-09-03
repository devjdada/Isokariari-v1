import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Testimony } from "@/types/Testimony";

const cardWidth = 360;
const gap = 24;
const visibleCount = 3;

const TestimonialsSection = ({ testimonies }: { testimonies: Testimony[] }) => {
	const containerRef = useRef(null);
	const controls = useAnimation();
	const [position, setPosition] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	const intervalRef = useRef(null);

	const extended = [...testimonies, ...testimonies.slice(0, visibleCount)];
	const singleItemWidth = cardWidth + gap;
	const totalWidth = extended.length * singleItemWidth;
	const totalOriginalItems = testimonies.length;

	// Autoplay
	useEffect(() => {
		if (testimonies.length === 0) return;

		if (intervalRef.current) clearInterval(intervalRef.current);

		if (!isPaused) {
			intervalRef.current = setInterval(() => {
				setPosition((prev) => prev - 2);
			}, 20);
		}

		return () => clearInterval(intervalRef.current);
	}, [testimonies, isPaused]);

	// Animate position
	useEffect(() => {
		if (testimonies.length > 0) {
			controls.start({ x: position });

			if (Math.abs(position) >= testimonies.length * singleItemWidth) {
				setTimeout(() => {
					controls.set({ x: 0 });
					setPosition(0);
				}, 0);
			}
		}
	}, [position, testimonies, controls, singleItemWidth]);

	const handleDragEnd = (event, info) => {
		const offset = info.offset.x;
		if (Math.abs(offset) > 50) {
			// Only trigger if swipe is big enough
			const direction = offset > 0 ? 1 : -1;
			setPosition((prev) => {
				const next = prev + direction * (cardWidth + gap);
				return next > 0 ? 0 : next;
			});
		}
	};

	const activeIndex =
		Math.abs(Math.round(position / (cardWidth + gap))) % totalOriginalItems;

	return (
		<section className="py-16 bg-gradient-to-l from-blue-800 to-blue-900 text-white overflow-hidden relative">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						What Our Clients Say
					</h2>
					<p className="text-white/80 max-w-2xl mx-auto">
						We take pride in our reputation for excellence and the satisfaction
						of our clients.
					</p>
				</div>

				<div
					className="overflow-hidden w-full max-w-[1150px] mx-auto relative"
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
				>
					<motion.div
						ref={containerRef}
						className="flex gap-6 cursor-grab active:cursor-grabbing"
						animate={controls}
						transition={{ ease: "linear", duration: 0.2 }}
						drag="x"
						dragConstraints={{
							left: -totalWidth + singleItemWidth * visibleCount,
							right: 0,
						}}
						onDragEnd={handleDragEnd}
						style={{
							width: `${totalWidth}px`,
						}}
					>
						{extended.map((testimonial, i) => (
							<motion.div
								key={testimonial.name + "-" + i}
								className={cn(
									"flex flex-col bg-white/10 backdrop-blur-sm p-6 rounded-lg w-[360px] shrink-0 text-left transition-transform duration-500",
								)}
							>
								<div className="text-2xl font-serif text-white/30 mb-4">"</div>
								<p className="text-white/90 mb-2 italic">
									{testimonial.content}
								</p>
								<div className="mt-auto flex gap-5">
									{testimonial.image && (
										<img
											src={testimonial.image}
											alt=""
											className="h-9 w-9 rounded-full object-cover"
										/>
									)}
									<div>
										<p className="font-semibold">{testimonial.name}</p>
										<p className="text-white/80 text-sm">
											{testimonial.position}, {testimonial.company}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>

				{/* Pagination Dots */}
				{testimonies.length > 0 && (
					<div className="flex justify-center gap-2 mt-8">
						{testimonies.map((_, i) => (
							<div
								key={i}
								className={cn(
									"w-3 h-3 rounded-full bg-white/40 transition-all",
									i === activeIndex ? "bg-white w-5" : "",
								)}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default TestimonialsSection;
