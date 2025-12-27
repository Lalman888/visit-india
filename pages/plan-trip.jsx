import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import SEOHead from '../components/SEO/SEOHead';
import { BreadcrumbSchema } from '../components/SEO/StructuredData';

// Step Components
const StepIndicator = ({ currentStep, totalSteps }) => (
    <div className="flex items-center justify-center space-x-2 mb-12">
        {[...Array(totalSteps)].map((_, index) => (
            <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${index < currentStep
                        ? 'bg-amber-500 text-slate-900'
                        : index === currentStep
                            ? 'bg-amber-500 text-slate-900 scale-110'
                            : 'bg-slate-700 text-slate-400'
                    }`}>
                    {index < currentStep ? '✓' : index + 1}
                </div>
                {index < totalSteps - 1 && (
                    <div className={`w-12 h-1 mx-2 rounded transition-all duration-300 ${index < currentStep ? 'bg-amber-500' : 'bg-slate-700'
                        }`} />
                )}
            </div>
        ))}
    </div>
);

// Step 1: Destination Selection
const DestinationStep = ({ states, selectedDestinations, setSelectedDestinations, builder }) => {
    const [search, setSearch] = useState('');

    const filteredStates = states?.filter(state =>
        state.title?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const toggleDestination = (stateId) => {
        setSelectedDestinations(prev =>
            prev.includes(stateId)
                ? prev.filter(id => id !== stateId)
                : [...prev, stateId]
        );
    };

    return (
        <div>
            <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-4">
                Where do you want to go?
            </h2>
            <p className="text-slate-400 text-center mb-8">
                Select one or more destinations for your trip
            </p>

            <div className="max-w-md mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Search destinations..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredStates.map((state) => (
                    <motion.div
                        key={state._id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleDestination(state._id)}
                        className={`relative cursor-pointer rounded-2xl overflow-hidden h-32 transition-all duration-300 ${selectedDestinations.includes(state._id)
                                ? 'ring-4 ring-amber-500'
                                : 'ring-1 ring-slate-700'
                            }`}
                    >
                        <Image
                            src={builder?.image(state.mainImage).url() || '/Home/Taj_mahal.avif'}
                            alt={state.title}
                            layout="fill"
                            objectFit="cover"
                            className="brightness-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-center px-2">{state.title}</span>
                        </div>
                        {selectedDestinations.includes(state._id) && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                <span className="text-slate-900 text-sm">✓</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {selectedDestinations.length > 0 && (
                <p className="text-amber-500 text-center mt-6 font-medium">
                    {selectedDestinations.length} destination{selectedDestinations.length > 1 ? 's' : ''} selected
                </p>
            )}
        </div>
    );
};

// Step 2: Travel Dates
const DatesStep = ({ startDate, setStartDate, endDate, setEndDate }) => {
    const today = new Date().toISOString().split('T')[0];

    const calculateDuration = () => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            return diff > 0 ? diff : 0;
        }
        return 0;
    };

    const duration = calculateDuration();

    return (
        <div className="max-w-lg mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-4">
                When are you traveling?
            </h2>
            <p className="text-slate-400 text-center mb-8">
                Select your travel dates
            </p>

            <div className="space-y-6">
                <div>
                    <label className="block text-slate-400 text-sm font-medium mb-2">Start Date</label>
                    <input
                        type="date"
                        min={today}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-slate-400 text-sm font-medium mb-2">End Date</label>
                    <input
                        type="date"
                        min={startDate || today}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                </div>
            </div>

            {duration > 0 && (
                <div className="mt-8 p-6 bg-slate-800 rounded-2xl text-center">
                    <p className="text-amber-500 text-4xl font-bold mb-2">{duration}</p>
                    <p className="text-slate-400">day{duration > 1 ? 's' : ''} trip</p>
                </div>
            )}

            <div className="mt-8 p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                <p className="text-amber-500 text-sm text-center">
                    💡 Best time to visit most of India: October to March
                </p>
            </div>
        </div>
    );
};

// Step 3: Interests
const InterestsStep = ({ selectedInterests, setSelectedInterests }) => {
    const interests = [
        { id: 'culture', label: 'Culture & History', icon: '🏛️' },
        { id: 'nature', label: 'Nature & Wildlife', icon: '🌿' },
        { id: 'adventure', label: 'Adventure', icon: '🏔️' },
        { id: 'spirituality', label: 'Spirituality', icon: '🕉️' },
        { id: 'food', label: 'Food & Culinary', icon: '🍛' },
        { id: 'beaches', label: 'Beaches', icon: '🏖️' },
        { id: 'architecture', label: 'Architecture', icon: '🏰' },
        { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    ];

    const toggleInterest = (id) => {
        setSelectedInterests(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-4">
                What interests you?
            </h2>
            <p className="text-slate-400 text-center mb-8">
                Select your travel interests to personalize your itinerary
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {interests.map((interest) => (
                    <motion.button
                        key={interest.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleInterest(interest.id)}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 ${selectedInterests.includes(interest.id)
                                ? 'bg-amber-500/20 border-amber-500 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                            }`}
                    >
                        <span className="text-3xl block mb-2">{interest.icon}</span>
                        <span className="text-sm font-medium">{interest.label}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

// Step 4: Budget & Preferences
const BudgetStep = ({ budget, setBudget, travelStyle, setTravelStyle }) => {
    const budgetOptions = [
        { id: 'budget', label: 'Budget', price: '₹2,000 - ₹5,000/day', icon: '💰' },
        { id: 'mid', label: 'Mid-Range', price: '₹5,000 - ₹15,000/day', icon: '💎' },
        { id: 'luxury', label: 'Luxury', price: '₹15,000+/day', icon: '👑' },
    ];

    const styleOptions = [
        { id: 'solo', label: 'Solo', icon: '🧳' },
        { id: 'couple', label: 'Couple', icon: '💑' },
        { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
        { id: 'group', label: 'Group', icon: '👥' },
    ];

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-4">
                Budget & Travel Style
            </h2>
            <p className="text-slate-400 text-center mb-8">
                Help us recommend the perfect experience for you
            </p>

            <div className="mb-10">
                <h3 className="text-white font-medium mb-4">Budget Range</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {budgetOptions.map((option) => (
                        <motion.button
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setBudget(option.id)}
                            className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${budget === option.id
                                    ? 'bg-amber-500/20 border-amber-500'
                                    : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                                }`}
                        >
                            <span className="text-2xl block mb-2">{option.icon}</span>
                            <span className="text-white font-bold block">{option.label}</span>
                            <span className="text-slate-400 text-sm">{option.price}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-white font-medium mb-4">Travel Style</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {styleOptions.map((option) => (
                        <motion.button
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setTravelStyle(option.id)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${travelStyle === option.id
                                    ? 'bg-amber-500/20 border-amber-500'
                                    : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                                }`}
                        >
                            <span className="text-2xl block mb-1">{option.icon}</span>
                            <span className="text-white text-sm font-medium">{option.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Step 5: Summary
const SummaryStep = ({ tripData, states }) => {
    const { selectedDestinations, startDate, endDate, selectedInterests, budget, travelStyle } = tripData;

    const destinationNames = selectedDestinations.map(id =>
        states?.find(s => s._id === id)?.title || 'Unknown'
    );

    const interestLabels = {
        culture: 'Culture & History',
        nature: 'Nature & Wildlife',
        adventure: 'Adventure',
        spirituality: 'Spirituality',
        food: 'Food & Culinary',
        beaches: 'Beaches',
        architecture: 'Architecture',
        shopping: 'Shopping',
    };

    const budgetLabels = {
        budget: 'Budget',
        mid: 'Mid-Range',
        luxury: 'Luxury',
    };

    const styleLabels = {
        solo: 'Solo Traveler',
        couple: 'Couple',
        family: 'Family',
        group: 'Group',
    };

    const calculateDuration = () => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        }
        return 0;
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-4">
                Your Trip Summary
            </h2>
            <p className="text-slate-400 text-center mb-8">
                Review your personalized India itinerary
            </p>

            <div className="bg-slate-800 rounded-3xl p-8 space-y-6">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl shrink-0">📍</div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Destinations</p>
                        <p className="text-white font-bold">{destinationNames.join(', ') || 'Not selected'}</p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl shrink-0">📅</div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Travel Dates</p>
                        <p className="text-white font-bold">
                            {startDate && endDate
                                ? `${new Date(startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - ${new Date(endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} (${calculateDuration()} days)`
                                : 'Not selected'
                            }
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl shrink-0">💡</div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Interests</p>
                        <p className="text-white font-bold">
                            {selectedInterests.map(i => interestLabels[i]).join(', ') || 'Not selected'}
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl shrink-0">💰</div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Budget & Style</p>
                        <p className="text-white font-bold">
                            {budgetLabels[budget] || 'Not selected'} • {styleLabels[travelStyle] || 'Not selected'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-6 bg-amber-500/10 rounded-2xl border border-amber-500/30 text-center">
                <p className="text-amber-500 font-medium mb-2">🎉 Your trip is ready!</p>
                <p className="text-slate-400 text-sm">
                    Contact us to get a detailed day-by-day itinerary and booking assistance.
                </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-center">
                    Get Detailed Itinerary
                </Link>
                <button
                    onClick={() => window.print()}
                    className="btn-secondary text-center"
                >
                    Save Trip
                </button>
            </div>
        </div>
    );
};

// Main Component
const PlanTrip = ({ states }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [budget, setBudget] = useState('');
    const [travelStyle, setTravelStyle] = useState('');

    const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: "2021-03-25",
        useCdn: false,
    });
    const builder = imageUrlBuilder(client);

    const totalSteps = 5;

    const tripData = {
        selectedDestinations,
        startDate,
        endDate,
        selectedInterests,
        budget,
        travelStyle,
    };

    // Save to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('tripPlan', JSON.stringify(tripData));
        }
    }, [tripData]);

    // Load from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('tripPlan');
            if (saved) {
                const data = JSON.parse(saved);
                setSelectedDestinations(data.selectedDestinations || []);
                setStartDate(data.startDate || '');
                setEndDate(data.endDate || '');
                setSelectedInterests(data.selectedInterests || []);
                setBudget(data.budget || '');
                setTravelStyle(data.travelStyle || '');
            }
        }
    }, []);

    const canProceed = () => {
        switch (currentStep) {
            case 0: return selectedDestinations.length > 0;
            case 1: return startDate && endDate;
            case 2: return selectedInterests.length > 0;
            case 3: return budget && travelStyle;
            case 4: return true;
            default: return false;
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <DestinationStep
                        states={states}
                        selectedDestinations={selectedDestinations}
                        setSelectedDestinations={setSelectedDestinations}
                        builder={builder}
                    />
                );
            case 1:
                return (
                    <DatesStep
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                );
            case 2:
                return (
                    <InterestsStep
                        selectedInterests={selectedInterests}
                        setSelectedInterests={setSelectedInterests}
                    />
                );
            case 3:
                return (
                    <BudgetStep
                        budget={budget}
                        setBudget={setBudget}
                        travelStyle={travelStyle}
                        setTravelStyle={setTravelStyle}
                    />
                );
            case 4:
                return (
                    <SummaryStep tripData={tripData} states={states} />
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-slate-900 min-h-screen py-24">
            <SEOHead
                title="Plan Your Trip to India - Custom Itinerary Builder"
                description="Create your personalized India travel itinerary. Select destinations, dates, interests, and budget to get a custom trip plan."
                canonical="/plan-trip"
            />
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Plan Your Trip" }
            ]} />

            <div className="absolute inset-0 jaali-overlay opacity-5 pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-4 block">
                        Trip Planner
                    </span>
                    <h1 className="text-white text-4xl md:text-5xl mb-4">Plan Your India Adventure</h1>
                </motion.div>

                <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-[500px]"
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>

                {currentStep < 4 && (
                    <div className="flex justify-between mt-12">
                        <button
                            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                            disabled={currentStep === 0}
                            className={`px-8 py-3 rounded-xl font-medium transition-all ${currentStep === 0
                                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                    : 'bg-slate-700 text-white hover:bg-slate-600'
                                }`}
                        >
                            Back
                        </button>
                        <button
                            onClick={() => setCurrentStep(prev => Math.min(totalSteps - 1, prev + 1))}
                            disabled={!canProceed()}
                            className={`px-8 py-3 rounded-xl font-bold transition-all ${canProceed()
                                    ? 'bg-amber-500 text-slate-900 hover:bg-amber-400'
                                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                }`}
                        >
                            {currentStep === 3 ? 'View Summary' : 'Next'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlanTrip;

export async function getServerSideProps() {
    const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: "2021-03-25",
        useCdn: false,
    });

    const states = await client.fetch(`*[_type == "states"]{ _id, title, slug, mainImage }`);

    return {
        props: {
            states,
        },
    };
}
