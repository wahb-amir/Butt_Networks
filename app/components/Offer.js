import React from 'react'
import Link from 'next/link';

const Offer = () => {
  return (
    <>
      <section className='Offer mt-5'>
        <div className='text-center'>
        <h1 className='font-extrabold text-[40px]'>Have a Project?</h1>
        <p className='font-bold mt-2 text-[18px] text-gray-700'>Lets collaborate to bring your next digital product to life.</p>
        <Link href="/Contact">
                <button className="button mt-3 px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 
                text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
              type="button">Get in Touch</button>
        </Link>
        </div>
      </section>
    </>
  )
}

export default Offer
