import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type Plan = {
    name: string;
    monthlyPrice: number;
    quarterlyPrice: number;
    annualPrice: number;
    description: string;
    features: string[];
    buttonText: string;
    highlight: boolean;
};

const plans: Plan[] = [
	{
		name: 'Basic',
		monthlyPrice: 49,
		quarterlyPrice: 119,
		annualPrice: 299,
		description: 'Ideal for individuals or small event organizers',
		features: [
			'Access to admin panel where event organisers can easily manage their events listed on platform',
			'Upto 100 Registrations per Event',
			'Basic ticket listing options.',
			'Default Templates for Tickets and Events',
			'Email support.',
		],
		buttonText: 'Get started',
		highlight: false,
	},
	{
		name: 'Premium',
		monthlyPrice: 499,
		quarterlyPrice: 1199,
		annualPrice: 2999,
		description: 'Perfect for growing event organizers',
		features: [
			'Access to admin panel',
			'Upto 350 Registrations per Event',
			'Email support.',
			'Access to personalized emails',
			'Certificate generation',
			'Default Templates',
			'Event Attendance Management',
		],
		buttonText: 'Get Started',
		highlight: true,
	},
	{
		name: 'Custom',
		monthlyPrice: 999,
		quarterlyPrice: 2399,
		annualPrice: 5999,
		description: 'Designed for large-scale event management',
		features: [
			'Access to admin panel',
			'Upto 3000 Registrations',
			'Access to personalized emails',
			'Certificate generation',
			'24/7 customer support (Phone and Email)',
			'Customizable event pages, certificates and tickets.',
			'Advanced reporting and analytics.',
			'Event Attendance Management.',
			'Event Page Templates',
		],
		buttonText: 'Contact team',
		highlight: false,
	},
];

const billingCycles = [
	{ key: 'monthly', label: 'Monthly' },
	{ key: 'quarterly', label: 'Quarterly' },
	{ key: 'annual', label: 'Annual' },
];

export default function PlansScreen() {
	const [billingCycle, setBillingCycle] = useState('monthly');
	const router = useRouter();

	const getPrice = (plan: Plan) => {
		if (billingCycle === 'annual') {
			return (
				<>
					<Text style={styles.originalPrice}>
						₹{plan.monthlyPrice * 12 + 11}
					</Text>
					<Text style={styles.discountedPrice}> ₹{plan.annualPrice}</Text>
					<Text style={styles.pricePer}> per year</Text>
				</>
			);
		}
		if (billingCycle === 'quarterly') {
			return (
				<>
					<Text style={styles.originalPrice}>
						₹{plan.monthlyPrice * 3 + 2}
					</Text>
					<Text style={styles.discountedPrice}> ₹{plan.quarterlyPrice}</Text>
					<Text style={styles.pricePer}> for 3 Months</Text>
				</>
			);
		}
		return (
			<>
				<Text style={styles.discountedPrice}>₹{plan.monthlyPrice}</Text>
				<Text style={styles.pricePer}> per month</Text>
			</>
		);
	};

	const getDiscountLabel = () => {
		if (billingCycle === 'annual') return '50% Discount';
		if (billingCycle === 'quarterly') return '20% Discount';
		return null;
	};

	const handlePlanPress = (plan: Plan) => {
		router.push({
			pathname: '/organiser-info',
			params: {
				planName: plan.name,
				billingCycle: billingCycle,
			},
		});
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.heading}>
				Flexible plans for{' '}
				<Text style={{ fontStyle: 'italic' }}>every event</Text>
			</Text>
			<Text style={styles.subheading}>
				Affordable and transparent pricing for individual organizers, event
				planners, and businesses.
			</Text>

			{/* Billing Cycle Toggle */}
			<View style={styles.toggleSwitch}>
				{billingCycles.map((cycle) => (
					<Pressable
						key={cycle.key}
						style={[
							styles.toggleButton,
							billingCycle === cycle.key && styles.activeToggleButton,
						]}
						onPress={() => setBillingCycle(cycle.key)}
					>
						<Text
							style={[
								styles.toggleButtonText,
								billingCycle === cycle.key && styles.activeToggleButtonText,
							]}
						>
							{cycle.label}
						</Text>
					</Pressable>
				))}
			</View>

			{/* Plan Cards */}
			{plans.map((plan, idx) => (
				<View
					key={plan.name}
					style={[
						styles.planCard,
						plan.highlight && styles.highlightedCard,
					]}
				>
					{/* Discount Label */}
					{getDiscountLabel() && (
						<View style={styles.discountLabel}>
							<Text style={styles.discountLabelText}>
								{getDiscountLabel()}
							</Text>
						</View>
					)}

					<Text style={styles.planTitle}>{plan.name}</Text>
					<Text style={styles.planSubtitle}>{plan.description}</Text>
					<View style={styles.priceRow}>{getPrice(plan)}</View>
					<Pressable
						style={[
							styles.button,
							plan.highlight
								? styles.highlightedButton
								: styles.defaultButton,
						]}
						onPress={() => handlePlanPress(plan)}
					>
						<Text style={styles.buttonText}>{plan.buttonText}</Text>
					</Pressable>
					<View style={styles.features}>
						{plan.features.map((feature, i) => (
							<View key={i} style={styles.featureRow}>
								<Text style={styles.checkMark}>✓</Text>
								<Text style={styles.feature}>{feature}</Text>
							</View>
						))}
					</View>
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#fff',
		paddingBottom: 40,
	},
	heading: {
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 10,
		color: '#333',
	},
	subheading: {
		fontSize: 14,
		color: '#555',
		marginBottom: 20,
	},
	toggleSwitch: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 20,
		gap: 10,
	},
	toggleButton: {
		paddingVertical: 8,
		paddingHorizontal: 18,
		borderRadius: 20,
		backgroundColor: '#eee',
		marginHorizontal: 5,
	},
	activeToggleButton: {
		backgroundColor: '#FF6000',
	},
	toggleButtonText: {
		color: '#333',
		fontWeight: '600',
		fontSize: 14,
	},
	activeToggleButtonText: {
		color: '#fff',
	},
	planCard: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 10,
		padding: 16,
		marginBottom: 20,
		backgroundColor: '#fafafa',
		position: 'relative',
	},
	highlightedCard: {
		borderColor: '#FF6000',
		backgroundColor: '#fff7f1',
		shadowColor: '#FF6000',
		shadowOpacity: 0.12,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 3,
	},
	discountLabel: {
		position: 'absolute',
		top: 12,
		right: 12,
		backgroundColor: '#FF6000',
		borderRadius: 6,
		paddingHorizontal: 8,
		paddingVertical: 2,
		zIndex: 2,
	},
	discountLabelText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 12,
	},
	planTitle: {
		fontSize: 20,
		fontWeight: '700',
		marginBottom: 4,
		color: '#222',
	},
	planSubtitle: {
		fontSize: 14,
		color: '#666',
		marginBottom: 10,
	},
	priceRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		flexWrap: 'wrap',
	},
	originalPrice: {
		fontSize: 16,
		color: '#888',
		textDecorationLine: 'line-through',
		marginRight: 8,
	},
	discountedPrice: {
		fontSize: 18,
		fontWeight: '600',
		color: '#FF6000',
	},
	pricePer: {
		fontSize: 13,
		color: '#444',
		marginLeft: 4,
	},
	button: {
		paddingVertical: 10,
		borderRadius: 8,
		marginBottom: 12,
		alignItems: 'center',
	},
	highlightedButton: {
		backgroundColor: '#FF6000',
	},
	defaultButton: {
		backgroundColor: '#333',
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 14,
	},
	features: {
		paddingLeft: 10,
		marginTop: 4,
	},
	featureRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginVertical: 2,
	},
	checkMark: {
		color: '#FF6000',
		fontWeight: 'bold',
		marginRight: 6,
		fontSize: 14,
		marginTop: 2,
	},
	feature: {
		fontSize: 13,
		marginVertical: 2,
		color: '#444',
	},
});

type RootStackParamList = {
    'organiser-info': { planName: string; billingCycle: string };
    // ...other routes
};
