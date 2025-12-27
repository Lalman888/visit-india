import React from 'react';
import { motion } from 'framer-motion';

/**
 * Displays "Did You Know" fact cards with interesting information
 */
const DidYouKnow = ({ facts }) => {
    if (!facts || facts.length === 0) return null;

    return (
        <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
            <h3 className="text-lg font-serif text-amber-800 mb-6 flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Did You Know?
            </h3>
            <div className="space-y-4">
                {facts.map((fact, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                    >
                        <span className="text-amber-500 font-bold">•</span>
                        <p className="text-amber-900 text-sm leading-relaxed">{fact}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DidYouKnow;
