import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-20 relative overflow-hidden">
            <div className="absolute inset-0 jaali-overlay opacity-5 pointer-events-none"></div>

            <div className="max-w-[1400px] m-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-serif font-bold text-white tracking-tight">Visit India</span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed">
                            Explore the timeless heritage and vibrant culture of the Indian subcontinent. Your journey towards the soul of Bharat starts here.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all">
                                <FaFacebookF size={18} />
                            </a>
                            <a href="https://www.instagram.com/visitindiahome/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all">
                                <FaInstagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all">
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all">
                                <FaYoutube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="text-white font-serif mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
                            <li><Link href="/explore" className="hover:text-amber-500 transition-colors">Explore India</Link></li>
                            <li><Link href="/blog" className="hover:text-amber-500 transition-colors">Travel Blog</Link></li>
                            <li><Link href="/about" className="hover:text-amber-500 transition-colors">About India</Link></li>
                            <li><Link href="/travel-tips" className="hover:text-amber-500 transition-colors">Travel Tips</Link></li>
                            <li><Link href="/best-time-to-visit" className="hover:text-amber-500 transition-colors">Best Time to Visit</Link></li>
                            <li><Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Exploration Column */}
                    <div>
                        <h4 className="text-white font-serif mb-6">Experience</h4>
                        <ul className="space-y-4">
                            <li><Link href="/explore" className="hover:text-amber-500 transition-colors">All States</Link></li>
                            <li><Link href="/explore/temples" className="hover:text-amber-500 transition-colors">Ancient Temples</Link></li>
                            <li><Link href="/explore/forts" className="hover:text-amber-500 transition-colors">Historic Forts</Link></li>
                            <li><Link href="/explore/nature" className="hover:text-amber-500 transition-colors">Natural Wonders</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="text-white font-serif mb-6">Newsletter</h4>
                        <p className="text-slate-400 mb-4 text-sm">Subscribe to receive travel tips and inspiration from India.</p>
                        <div className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                            />
                            <button className="btn-accent !py-3 !text-sm">Subscribe</button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-slate-500 text-sm">
                        Copyright &copy; {new Date().getFullYear()} Visit India. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-slate-500">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
