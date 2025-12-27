import React from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  return (
    <div className='max-w-[1400px] m-auto px-6 md:px-12 py-20 min-h-[80vh] flex items-center'>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Contact Info / Side Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-4 block">Get in Touch</span>
          <h2 className="mb-8 font-serif">Have Questions? <br />We are Here to Help.</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-10">
            Whether you are planning a spiritual retreat in Rishikesh or a heritage tour through the forts of Rajasthan, our experts are ready to assist you in crafting the perfect journey.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 shrink-0">
                {/* Email Icon */}
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h4 className="text-slate-900 font-bold text-sm">Email Us</h4>
                <p className="text-slate-500">namaste@visitindia.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-slate-100/50 rounded-[40px] -z-10 jaali-overlay opacity-20"></div>
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-slate-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
                  <input className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-slate-900 focus:outline-none focus:border-amber-500 transition-colors" type="text" placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <input className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-slate-900 focus:outline-none focus:border-amber-500 transition-colors" type="email" placeholder="email@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                <input className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-slate-900 focus:outline-none focus:border-amber-500 transition-colors" type="text" placeholder="How can we help?" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                <textarea className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-slate-900 focus:outline-none focus:border-amber-500 transition-colors" rows="5" placeholder="Tell us more about your travel plans..."></textarea>
              </div>

              <button className="btn-primary w-full !py-5 text-lg">Send Message</button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact