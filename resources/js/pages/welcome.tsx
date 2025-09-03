import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import ClientsCarousel from "@/components/home/ClientsCarousel";
import CTASection from "@/components/home/CTASection";
import EquipmentSection from "@/components/home/EquipmentSection";
import HeroCarousel from "@/components/home/HeroCarousel";
import ProjectsSection from "@/components/home/ProjectsSection";
import ServicesCarousel from "@/components/home/ServicesCarousel";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WebLayout from "@/layouts/WebLayout";
import type { PageProps } from "@/types";

const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

export default function Welcome({
	hero,
	services,
	projects,
	testimonies,
	clients,
	equipments,
}: PageProps) {
	return (
		<WebLayout>
			<Head title="Home - O.K. Isokariari Nigeria Limited">
				<meta
					name="description"
					content="O.K. Isokariari Nigeria Limited is a leading construction and engineering company in Nigeria, delivering high-quality projects for over 50 years."
				/>
				<meta
					name="keywords"
					content="construction, engineering, Nigeria, infrastructure, civil engineering, building, projects"
				/>
				<meta
					property="og:title"
					content="O.K. Isokariari Nigeria Limited - Engineering Excellence"
				/>
				<meta
					property="og:description"
					content="A leading EPC company with over 50 years of engineering excellence in civil engineering and building projects."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:image" content="/images/og-image.jpg" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@yourtwitterhandle" />
				<meta name="twitter:image" content="/images/twitter-image.jpg" />
				<link rel="canonical" href="https://www.okisokariari.com" />
			</Head>
			<div>
				<HeroCarousel hero={hero} />

				<StatsSection hero={hero} />

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					variants={sectionVariants}
				>
					<ServicesCarousel services={services} />
				</motion.div>

				<ProjectsSection projects={projects} />

				<EquipmentSection equipments={equipments} />

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					variants={sectionVariants}
				>
					<TestimonialsSection testimonies={testimonies} />
				</motion.div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					variants={sectionVariants}
				>
					<ClientsCarousel clients={clients} />
				</motion.div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					variants={sectionVariants}
				>
					<CTASection />
				</motion.div>
			</div>
		</WebLayout>
	);
}
